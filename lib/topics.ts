import { source } from '@/lib/source';
import type { Folder, Item } from 'fumadocs-core/page-tree';
import type { ReactNode } from 'react';

const TOPIC_ORDER = [
  'java',
  'javascript',
  'python',
  'fastapi',
  'spring-ai',
  'langchain4j',
  'langchain4j-one-shot',
  'aws',
  'go',
  'docker',
  'system-design',
  'git',
  'linux',
  'claude-code',
  'mcp',
  'devops',
  'maven',
  'terraform',
  'ansible',
  'kubernetes',
  'jenkins',
] as const;

export interface TopicLink {
  slug: string;
  title: ReactNode;
  icon?: ReactNode;
  description?: ReactNode;
  href: string;
}

export interface SpineLink extends TopicLink {
  label: string;
  color: string;
}

export interface HomeTopics {
  navTopics: TopicLink[];
  tickerTopics: TopicLink[];
  pillTopics: TopicLink[];
  bentoNextFive: TopicLink[];
  ctaSpines: SpineLink[];
}

function getTopicFolders(): Partial<Record<string, Folder>> {
  const folders = source.pageTree.children.filter(
    (node): node is Folder => node.type === 'folder',
  );

  const map: Partial<Record<string, Folder>> = {};
  TOPIC_ORDER.forEach((slug, i) => {
    if (folders[i]) map[slug] = folders[i];
  });
  return map;
}

function toTopicLink(slug: string, folder: Folder): TopicLink {
  const firstPage = folder.children.find(
    (child): child is Item => child.type === 'page',
  );

  return {
    slug,
    title: folder.name,
    icon: folder.icon,
    description: firstPage?.description,
    href: firstPage?.url ?? '/docs',
  };
}

function pick(slugs: readonly string[]): TopicLink[] {
  const folders = getTopicFolders();
  return slugs
    .map((slug) => {
      const folder = folders[slug];
      return folder ? toTopicLink(slug, folder) : undefined;
    })
    .filter((link): link is TopicLink => link !== undefined);
}

export function getHomeTopics(): HomeTopics {
  const folders = getTopicFolders();

  const navTopics = pick(['java', 'python', 'fastapi', 'spring-ai', 'system-design']);
  const tickerTopics = pick([
    'javascript',
    'docker',
    'aws',
    'java',
    'system-design',
    'spring-ai',
    'kubernetes',
  ]);
  const pillTopics = pick(['java', 'python', 'spring-ai', 'docker', 'go']);
  const bentoNextFive = pick(['claude-code', 'system-design', 'devops', 'docker', 'linux']);

  const spineDefs: Array<{ slug: string; label: string; color: string }> = [
    { slug: 'git', label: 'Start with Git', color: '#FFD469' },
    { slug: 'jenkins', label: 'Start with Jenkins', color: '#E98B73' },
    { slug: 'terraform', label: 'Start with Terraform', color: '#8AADF4' },
    { slug: 'ansible', label: 'Start with Ansible', color: '#B8D94E' },
    { slug: 'maven', label: 'Start with Maven', color: '#B8A7D9' },
  ];

  const ctaSpines = spineDefs
    .map(({ slug, label, color }) => {
      const folder = folders[slug];
      if (!folder) return undefined;
      return { ...toTopicLink(slug, folder), label, color };
    })
    .filter((spine): spine is SpineLink => spine !== undefined);

  return { navTopics, tickerTopics, pillTopics, bentoNextFive, ctaSpines };
}
