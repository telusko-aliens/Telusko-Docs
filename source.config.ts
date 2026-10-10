import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema,
    // Load each page on demand instead of bundling all pages into one huge chunk
    async: true,
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  lastModifiedTime:'git',
  mdxOptions: {
    remarkImageOptions: {
      external: false,
    },
  },
});
