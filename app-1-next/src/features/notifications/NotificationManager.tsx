import { useAuth } from '@/features/auth/AuthProvider';
import { getToken } from 'firebase/messaging';
import { messaging } from '@/features/notifications/services/firebase/firebase';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { supabase } from '/shared/utils/utils/supabaseClient';

const NotificationManager = () => {
  const { session } = useAuth();

  const handleRequestPermission = async () => {
    console.log('Requesting permission...');
    if (!messaging) {
      alert('Firebase Messaging não está disponível neste ambiente (não seguro).');
      console.warn('Firebase Messaging is not available in this environment (not secure).');
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');

        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          type: 'module',
          scope: '/'
        });
        console.log('Service worker registered.');

        const currentToken = await getToken(messaging, {
          vapidKey: 'BH6H4n_KEzA3NxX4VfeWp2l_OE1hVQfQnKJFVG2bwrYb0C0EtyKfiOIwwYvwBjYK2lZ7yuRSPNfVJ-CsYmriprw', // Hardcoded VAPID key
          serviceWorkerRegistration: registration,
        });

        if (currentToken) {
          console.log('FCM Registration Token:', currentToken);

          if (session?.user) {
            console.log('Saving token to database for user:', session.user.id);
            const { error } = await supabase
              .from('fcm_tokens')
              .upsert(
                { user_id: session.user.id, token: currentToken, app_name: 'food-tracker' },
                { onConflict: 'token,app_name' }
              );

            if (error) {
              console.error('Error saving token:', error);
              alert('Erro ao salvar o token de notificação no banco de dados.');
            } else {
              alert('Permissão concedida e dispositivo registrado para notificações!');
            }
          } else {
            alert('Usuário não logado. Não foi possível salvar o token.');
          }
        } else {
          console.log('No registration token available.');
          alert('Não foi possível obter o token do Firebase.');
        }
      } else {
        console.log('Unable to get permission to notify.');
        alert('Permissão para notificações negada.');
      }
    } catch (error) {
      console.error('An error occurred while requesting permission:', error);
      alert('Ocorreu um erro ao solicitar a permissão.');
    }
  };

  const handleSendTestNotification = async () => {
    if (!session?.user) {
      alert('Você precisa estar logado para enviar uma notificação.');
      return;
    }

    console.log('Inserting notification into queue for user:', session.user.id);
    const { error } = await supabase
      .from('notifications_queue')
      .insert({
        target_user_id: session.user.id,
        title: 'Notificação de Teste',
        body: 'Esta é uma notificação de teste disparada pelo front-end!',
        source_app: 'food-tracker'
      });

    if (error) {
      console.error('Error inserting notification:', error);
      alert(`Erro ao enfileirar a notificação: ${error.message}`);
    } else {
      console.log('Notification queued successfully.');
      alert('Notificação enfileirada com sucesso! O gatilho do banco de dados agora deve acionar o envio.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      <Card>
        <CardHeader>
          <CardTitle>1. Ativar Notificações</CardTitle>
          <CardDescription>
            Clique aqui primeiro para permitir notificações e registrar seu dispositivo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleRequestPermission} className="w-full">
            Ativar Notificações
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Enviar Notificação de Teste</CardTitle>
          <CardDescription>
            Depois de ativar, clique aqui para disparar uma notificação de teste para este dispositivo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSendTestNotification} className="w-full">
            Enviar Notificação de Teste
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationManager;