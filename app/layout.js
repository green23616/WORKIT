import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export const metadata = {
  title: "WORKIT",
  description: "All-In-One Guide for Fit",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}