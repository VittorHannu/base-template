import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { developerSource } from '@/lib/source';

export default function Layout({ children }: LayoutProps<'/developers'>) {
  return (
    <DocsLayout tree={developerSource.pageTree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}