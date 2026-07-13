// export const dynamic = 'force-dynamic';
export const revalidate = 900; // cache for 15 mins (we can change it based on our requirements)
// export const dynamicParams = true;

import { getPageImage, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { LLMCopyButton, ViewOptions } from '@/components/ai/page-actions';
import { Feedback } from '@/components/feedback';
import { onRateAction,owner, repo } from '@/lib/github';
import { DownloadPDFButton } from '@/components/ui/DownloadPDFButton';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  // console.log(params.slug, "full page data")
  
  if (!page) notFound();

  const MDX = page.data.body;

  const {lastModified} = page.data;

   const markdownUrl = params.slug?.length 
  ? `/api/docs/${params.slug.join('/')}/raw`
  : `/api/docs/raw`;

  //  console.log(params.slug,'params slug')

  return (
    <DocsPage toc={page.data.toc} full={page.data.full} lastUpdate={lastModified ? new Date(lastModified) : undefined} tableOfContent={{
        style: 'clerk',
        enabled: true,
      }}
      tableOfContentPopover={{
        style: 'clerk',
        enabled: true,
      }}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
       <div className="flex flex-row gap-2 items-center border-b pb-6">
        <LLMCopyButton markdownUrl={markdownUrl} />
        <ViewOptions
          markdownUrl={markdownUrl}
          // blob/main/content/docs/index.mdx
          githubUrl={`https://github.com/${owner}/${repo}/blob/main/content/docs/${page.path}`}
        />
        {page.url === '/docs/system-design/getting-started' && (
    <DownloadPDFButton pdfUrl="https://dyz1pdcuffwr5.cloudfront.net/System-designs/System%20Design%20Notes%20PDF/System_Design_Notes.pdf" />
  )}
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
       <Feedback onRateAction={onRateAction} />
    </DocsPage>
  );
}

// export async function generateStaticParams() {
//   return source.generateParams();
// }

export async function generateMetadata(
  props: PageProps<'/docs/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
