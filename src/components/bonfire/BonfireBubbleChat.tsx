import Script from 'next/script';

export function BonfireBubbleChat() {
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
