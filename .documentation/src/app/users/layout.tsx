import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { userSource } from '@/lib/source';

export default function Layout({ children }: LayoutProps<'/users'>) {
  return (
    <DocsLayout tree={userSource.pageTree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}