'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '/shared/utils/utils/utils';
import { useAuth } from '@/features/auth/AuthProvider';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/settings', label: 'Settings' },
];

export function BottomNavBar() {
  const pathname = usePathname();
  const { session } = useAuth();

  if (!session) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-20">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center w-full py-2 text-sm',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
