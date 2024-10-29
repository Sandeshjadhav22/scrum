import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";



export const metadata = {
  title: "Zscrum",
  description: "A project management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={``}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
