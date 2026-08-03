import Script from "next/script";

/**
 * GA4 loader. Never render this directly from a layout — go through
 * ConsentedTracking, which only mounts it after the user opts in.
 *
 * Consent Mode v2 defaults deny every advertising signal: this site measures
 * traffic, it does not build ad audiences, so ad_storage / ad_user_data /
 * ad_personalization stay denied even when analytics is granted.
 */
export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted'
          });
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
