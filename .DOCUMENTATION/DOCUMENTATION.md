# Documentação da Solução de Layout Mobile

Este documento explica a solução final e robusta para o controle de scroll e layout em navegadores mobile, especialmente no iOS Safari, ao interagir com o teclado virtual.

## O Problema

Abertura do teclado virtual em navegadores mobile causa uma série de problemas de layout. A principal dificuldade é criar um comportamento de "scroll para o foco" que seja suave e que não mova o layout principal da página (como o header), um problema exacerbado por inconsistências entre navegadores (especialmente iOS Safari) na forma como calculam a viewport e lidam com eventos de scroll programático dentro de containers.

## A Solução Final: Layout Explícito + Hook Inteligente

A solução definitiva foi alcançada através de uma combinação de duas estratégias principais:

### 1. Arquitetura de Layout Explícita (`MainLayout.tsx`)

Descobriu-se que a causa raiz dos problemas de scroll era uma ambiguidade no layout CSS. A abordagem inicial com `flexbox` não era explícita o suficiente para o navegador mobile identificar o container de conteúdo como a única área de scroll, fazendo com que o scroll programático "vazasse" para a página inteira.

A solução foi refatorar o `MainLayout.tsx` para usar um layout baseado em `position: absolute`:

- O container raiz ocupa 100% da altura da viewport visível (`var(--svh)`).
- Um `div` envolve o `<Header>` e sua altura é medida dinamicamente com `useRef` e `useLayoutEffect`.
- A área de conteúdo (`<main>`) é posicionada de forma absoluta para ocupar todo o espaço restante (`top` é definido pela altura do header e `bottom: 0`), com `overflow-y: auto` para habilitar o scroll interno.

Isso cria um container de scroll "blindado" e inequívoco para o navegador.

### 2. Hook de Scroll Inteligente (`useMobileInputFixes.ts`)

Com o layout robusto no lugar, o hook pôde ser implementado de forma confiável. A lógica final é:

- **`focusin`**: No foco de um input, o `event.preventDefault()` é usado para prevenir o scroll nativo e brusco do navegador. Uma referência ao input focado é armazenada.
- **`setTimeout`**: A lógica de scroll é envolvida em um `setTimeout` de 150ms. Isso dá tempo para a animação do teclado começar e a `visualViewport` se estabilizar, evitando "race conditions".
- **Cálculo Manual e Inteligente**: Dentro do timeout, o código calcula a posição ideal para centralizar o input na área de scroll.
- **"Clamp" de Posição**: O mais importante é que a posição de scroll calculada é "clampada" (limitada) entre 0 e a altura máxima de scroll do container. Isso permite que o input seja centralizado quando há espaço, mas role apenas o mínimo necessário quando está perto das bordas (topo ou fundo), evitando o "pulo" ou "empurrão" da tela.
- **`scrollTo` no Container**: A rolagem é executada com `scrollContainer.scrollTo()`, que, graças ao layout explícito, agora funciona corretamente apenas no container `<main>`.

#### Código Final do Hook:

```javascript
import { useEffect, useRef } from 'react';

export const useMobileInputFixes = () => {
  const viewportHeight = useRef(0);
  const activeElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const vp = window.visualViewport;
    if (!vp) return;

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        activeElementRef.current = target;
        target.focus({ preventScroll: true });

        setTimeout(() => {
          const scrollContainer = document.getElementById('main-scroll-container');
          const activeElement = activeElementRef.current;

          if (scrollContainer && activeElement) {
            const containerRect = scrollContainer.getBoundingClientRect();
            const inputRect = activeElement.getBoundingClientRect();

            const isAlreadyVisible = inputRect.top >= containerRect.top && inputRect.bottom <= containerRect.bottom;

            if (!isAlreadyVisible) {
              const centerPoint = containerRect.height / 2;
              const inputCenterPoint = inputRect.top - containerRect.top + inputRect.height / 2;
              let desiredScrollTop = scrollContainer.scrollTop + inputCenterPoint - centerPoint;

              const maxScrollTop = scrollContainer.scrollHeight - scrollContainer.clientHeight;
              desiredScrollTop = Math.max(0, Math.min(desiredScrollTop, maxScrollTop));

              scrollContainer.scrollTo({
                top: desiredScrollTop,
                behavior: 'smooth',
              });
            }
          }
        }, 150);
      }
    };

    const handleFocusOut = () => {
      activeElementRef.current = null;
    };

    const handleViewportResize = () => {
      const newHeight = vp.height;
      document.documentElement.style.setProperty('--svh', `${newHeight}px`);

      if (newHeight > viewportHeight.current + 150) {
        if (activeElementRef.current) {
          activeElementRef.current.blur();
        }
      }
      viewportHeight.current = newHeight;
    };

    viewportHeight.current = vp.height;
    vp.addEventListener('resize', handleViewportResize);
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    handleViewportResize();

    return () => {
      vp.removeEventListener('resize', handleViewportResize);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);
};
```