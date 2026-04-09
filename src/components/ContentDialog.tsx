import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";
import { ExternalLink } from "lucide-react";

type ContentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  content: string;
  externalUrl?: string;
  openLabel: string;
};

export function ContentDialog({
  open,
  onOpenChange,
  title,
  description,
  content,
  externalUrl,
  openLabel,
}: ContentDialogProps) {
  return (
    <Dialog open={open} onClose={onOpenChange} className="relative z-50">
      <div className="fixed inset-0 bg-black/55 backdrop-blur-[2px]" aria-hidden />
      <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-4">
        <DialogPanel className="w-[min(920px,96vw)] h-[min(82vh,780px)] max-w-none overflow-hidden rounded-lg border border-slate-200 dark:border-white/[0.14] bg-white dark:bg-[#080d19]">
          <div className="h-full flex flex-col">
            <div className="px-4 sm:px-5 py-3 border-b border-slate-200 dark:border-white/[0.1] bg-white/95 dark:bg-[#080d19]/90 backdrop-blur-sm flex items-start justify-between gap-3">
              <div className="min-w-0">
                <DialogTitle className="text-base sm:text-lg text-slate-900 dark:text-white leading-tight line-clamp-2">
                  {title}
                </DialogTitle>
                {description && (
                  <Description className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                    {description}
                  </Description>
                )}
              </div>
              <div className="flex items-center gap-2">
                {externalUrl && (
                  <a
                    href={externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 inline-flex items-center gap-1.5 rounded-md border border-slate-300 dark:border-white/[0.2] px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
                  >
                    {openLabel}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="rounded-md bg-black/65 hover:bg-black/80 text-white text-xs px-2.5 py-1.5 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 text-sm sm:text-[15px] leading-relaxed text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
              {content || "-"}
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
