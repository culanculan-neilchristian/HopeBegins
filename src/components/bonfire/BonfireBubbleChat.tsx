'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    BonfireChat?: (method: string, ...args: unknown[]) => void;
  }
}

export function BonfireBubbleChat() {
  const pathname = usePathname();
  const isHopeAIPage = pathname === '/hope-ai';

  useEffect(() => {
    const selector = [
      '[id*="bonfire" i]',
      '[class*="bonfire" i]',
      '[id*="lt-chat" i]',
      '[class*="lt-chat" i]',
      'iframe[src*="heybonfire.com"]',
    ].join(',');

    const updateBubbleVisibility = () => {
      const inlineRoot = document.getElementById('bonfire-inline');
      const elements = document.querySelectorAll<HTMLElement>(selector);

      elements.forEach((element) => {
        if (
          element.tagName === 'SCRIPT' ||
          element.id === 'bonfire-inline' ||
          element.closest('#bonfire-inline') ||
          inlineRoot?.contains(element)
        ) {
          return;
        }

        if (isHopeAIPage) {
          if (!('bonfirePreviousDisplay' in element.dataset)) {
            element.dataset.bonfirePreviousDisplay = element.style.display;
          }
          element.style.setProperty('display', 'none', 'important');
          return;
        }

        if ('bonfirePreviousDisplay' in element.dataset) {
          element.style.display = element.dataset.bonfirePreviousDisplay ?? '';
          delete element.dataset.bonfirePreviousDisplay;
        }
      });
    };

    updateBubbleVisibility();

    if (!isHopeAIPage) {
      window.BonfireChat?.('boot');
    }

    const observer = new MutationObserver(updateBubbleVisibility);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [isHopeAIPage]);

  if (isHopeAIPage) {
    return null;
  }

  return (
    <>
      <Script id="bonfire-widget-config" strategy="afterInteractive">
        {`
          window.BonfireWidgetConfig = {
            widgetId: "5cf03168-9b0d-4798-a7e0-66d9df4f4f6c"
          };
        `}
      </Script>
      <Script
        id="bonfire-widget"
        src="https://app.heybonfire.com/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
