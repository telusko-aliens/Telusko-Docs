import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Accordion, Accordions} from 'fumadocs-ui/components/accordion';
import { File,Folder } from 'fumadocs-ui/components/files';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import Quote from '@/components/ui/Quote';
import Badge from '@/components/ui/Badge';
import { ComingSoonCard } from '@/components/coming-soon-card';
import { ComingSoonAccordion } from '@/components/coming-soon-accordion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react'

import Video from './components/ui/Video';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: (props) =>
      props.width ? (
        <ImageZoom {...(props as any)} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img {...(props as any)} alt={props.alt ?? ''} />
      ),
     Accordion,
    Accordions,
    File,
    Step,
    Steps,
    Tabs,
    Tab,
    Folder,
    Card,
    Cards,
    Video,
    Quote,
    Badge,
    ComingSoonCard,
    ComingSoonAccordion,
    ExternalLink,
    Image,
    ...components,
  };
}
