import { users, developers } from '@/.source';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const userSource = loader({
  baseUrl: '/users',
  source: users.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const developerSource = loader({
  baseUrl: '/developers',
  source: developers.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

/*
// TODO: Re-implement helper functions for the new sources if needed

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})\n\n${processed}`;
}
*/