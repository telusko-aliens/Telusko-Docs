import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <img className="h-[32px]" src="/logo.png" />,
    },
    githubUrl: 'https://github.com/telusko-aliens/Telusko-Docs',
    
  };
}
