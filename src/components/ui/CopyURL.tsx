import { Share2 } from "lucide-react";
import React, { useRef } from "react";

export default function CopyURL({ url, shareKey }: { url: string; shareKey: () => void }) {
  const defaultRef = useRef<HTMLSpanElement>(null);
  const successRef = useRef<HTMLSpanElement>(null);
  const defaulToolTipRef = useRef<HTMLSpanElement>(null);
  const successToolTipRef = useRef<HTMLSpanElement>(null);
  const showSuccess = () => {
    defaultRef.current?.classList.add("hidden");
    successRef.current?.classList.remove("hidden");
    defaulToolTipRef.current?.classList.add("hidden");
    successToolTipRef.current?.classList.remove("hidden");
    // tooltip.show();
  };

  const resetToDefault = () => {
    defaultRef.current?.classList.remove("hidden");
    successRef.current?.classList.add("hidden");
    defaulToolTipRef.current?.classList.remove("hidden");
    successToolTipRef.current?.classList.add("hidden");
    // tooltip.hide();
  };

  const copyLink = () => {
    showSuccess();
    navigator.clipboard.writeText(url);
    setTimeout(resetToDefault, 1000);
  };

  return (
    <div className="flex items-center">
      <span className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-600 dark:text-white dark:border-gray-600">URL</span>
      <div className="relative w-full">
        <input id="website-url" type="text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-e-0 border-gray-300 text-gray-500 dark:text-gray-400 text-sm border-s-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={url} disabled />
      </div>
      {/* Copy text  */}
      <button onClick={copyLink} data-tooltip-target="tooltip-website-url" data-copy-to-clipboard-target="website-url" className="shrink-0 z-10 inline-flex items-center py-3 px-4 text-sm font-medium text-center text-white bg-blue-700  hover:bg-blue-800 " type="button">
        <span ref={defaultRef} id="default-icon">
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
          </svg>
        </span>
        <span ref={successRef} id="success-icon" className="hidden">
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
          </svg>
        </span>
      </button>
      {/* share url  */}
      <button onClick={shareKey} data-tooltip-target="tooltip-website-url" data-copy-to-clipboard-target="website-url" className="shrink-0 z-10 inline-flex items-center py-3 px-4 text-sm font-medium text-center text-white bg-purple-700 rounded-e-lg hover:bg-purple-800 " type="button">
        <Share2 width={16} height={16} className="w-4 h-4" />
      </button>
      <div id="tooltip-website-url" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
        <span ref={defaulToolTipRef} id="default-tooltip-message">
          Copy link
        </span>
        <span ref={successToolTipRef} id="success-tooltip-message" className="hidden">
          Copied!
        </span>
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  );
}
