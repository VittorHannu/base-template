import { developerSource } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// TODO: This should be updated to search both user and developer sources.
export const { GET } = createFromSource(developerSource, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: 'english',
});