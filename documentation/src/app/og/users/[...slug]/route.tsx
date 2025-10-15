import { userSource } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<'/og/users/[...slug]'>,
) {
  const { slug } = await params;
  const page = userSource.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return new ImageResponse(
    (
      <DefaultImage
        title={page.data.title}
        description={page.data.description}
        site="My App"
      />
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

// TODO: Re-implement generateStaticParams without getPageImage
// export function generateStaticParams() {
//   return userSource.getPages().map((page) => ({
//     lang: page.locale,
//     slug: getPageImage(page).segments,
//   }));
// }