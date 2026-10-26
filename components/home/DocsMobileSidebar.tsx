'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import type * as PageTree from 'fumadocs-core/page-tree';
import {
  Sidebar,
  SidebarContentMobile,
  SidebarFooter,
  SidebarHeader,
  SidebarPageTree,
  SidebarTrigger,
  SidebarViewport,
} from 'fumadocs-ui/components/layout/sidebar';
import { ThemeToggle } from 'fumadocs-ui/components/layout/theme-toggle';
import { TreeContextProvider } from 'fumadocs-ui/contexts/tree';
import { TeluskoLearnCta } from './TeluskoLearnCta';

interface DocsMobileSidebarProps {
  tree: PageTree.Root;
}

export function DocsMobileSidebar({ tree }: DocsMobileSidebarProps) {
  const homeTree = useMemo<PageTree.Root>(
    () => ({
      ...tree,
      children: tree.children.filter((child) => !(child.type === 'page' && child.url === '/docs')),
    }),
    [tree],
  );

  return (
    <TreeContextProvider tree={homeTree}>
      <Sidebar
        Content={null}
        Mobile={
          <SidebarContentMobile className="z-50">
            <SidebarHeader>
              <div className="flex items-center justify-between gap-2">
                <Link href="/" className="inline-flex items-center gap-2.5 text-[15px] font-medium">
                  <img src="/logo.png" alt="Telusko" className="h-8 w-auto" />
                </Link>
                <div className="flex items-center gap-1 text-fd-muted-foreground">
                  <ThemeToggle />
                  <SidebarTrigger
                    aria-label="Close Sidebar"
                    className="rounded-lg p-2 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
                  >
                    <X className="size-4.5" />
                  </SidebarTrigger>
                </div>
              </div>
            </SidebarHeader>
            <SidebarViewport>
              <SidebarPageTree />
            </SidebarViewport>
            <SidebarFooter>
              <TeluskoLearnCta className="flex w-full justify-center" />
            </SidebarFooter>
          </SidebarContentMobile>
        }
      />
    </TreeContextProvider>
  );
}
