import "./globals.css";

export const metadata = {
  title: "Ease-Edit AI",
  description: "Lightweight AI Image Editor"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
<body
  className="bg-zinc-950 text-zinc-100"
  suppressHydrationWarning
>
        {children}
      </body>
    </html>
  );
}
