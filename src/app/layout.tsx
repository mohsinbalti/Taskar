import { Providers } from "./providers";
import { metropolis } from "@/components/fonts/fonts";
import "./index.css";
import { CAPTCHA_KEY } from "../../constants";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

// export const metadata: Metadata = {
//   title: "EZ tasker",
//   description: "The Easiest Way To Earn, Using Your Skills.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo/ico.svg" />
        <Script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${CAPTCHA_KEY}`}
        ></Script>
        <Script id="google-tags">
          {`
            window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-16676698381');
            `}
        </Script>
        <Script id="google-tags2">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PKZ9WWTN');
            `}
        </Script>
        <Script id="meta-pixel-code">
          {/* <!-- Meta Pixel Code --> */}
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1186140209299131');
fbq('track', 'PageView');`}
        </Script>
        <Script id="meta-pixel-code2">
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=1186140209299131&ev=PageView&noscript=1"
            />
          </noscript>
          {/* <!-- End Meta Pixel Code --> */}
        </Script>
      </head>
      <body
        className={metropolis?.className}
        style={{
          background: "#f6f6f6",
        }}
      >
        <Providers>
          <div className="body-wrapper">{children}</div>
        </Providers>
        <Script id="microsoft-clarity-analytics">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "nmjoejbddz");
            `}
        </Script>
        <Script id="no-script">
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PKZ9WWTN"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        </Script>
      </body>
      <GoogleAnalytics gaId="G-R181R301X5" />
    </html>
  );
}
