'use client';
import { Download } from 'lucide-react';
import { cn } from '@/lib/cn';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';

export function DownloadPDFButton({ pdfUrl }: { pdfUrl: string }) {
  return (
    <div className="relative inline-flex rounded-lg p-[1.5px] overflow-hidden">
      <span className="spin-border absolute inset-[-1000%]" />
      <a
        href={pdfUrl}
        download
        className={cn(
          buttonVariants({
            color: 'secondary',
            size: 'sm',
            className:
              'relative gap-2 [&_svg]:size-3.5 [&_svg]:text-fd-muted-foreground rounded-[7px] hover:bg-fd-secondary hover:text-fd-secondary-foreground',
          }),
        )}
      >
        <Download />
        Download Notes
      </a>

      <style jsx>{`
        .spin-border {
          background: conic-gradient(
            from 0deg,
            transparent 0%,
            transparent 70%,
            #22c55e 85%,
            #4ade80 92%,
            #22c55e 100%
          );
          animation: spin 4s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}