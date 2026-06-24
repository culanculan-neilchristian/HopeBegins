import Script from 'next/script';

export function BonfireInlineChat() {
  return (
    <>
      <div id="bonfire-inline" className="min-h-[620px] w-full" />
      <Script id="bonfire-inline-config" strategy="afterInteractive">
        {`
          window.BonfireInlineConfig = {
            aiId: "b085ba00-69b1-480a-baa1-0f9f0e525da1",
            visualMode: "default"
          };
        `}
      </Script>
      <Script
        id="bonfire-inline-script"
        src="https://app.heybonfire.com/inline.js"
        strategy="afterInteractive"
      />
    </>
  );
}
