const inter = Inter({ subsets: ["latin"] });
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import { NavAdmin, NavLink } from "./_components/NavAdmin";

export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='h-full'>
      <body className={cn('relative h-full font-sans antialiased', inter.className)}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
        <main className='relative flex flex-col min-h-screen'>
        <NavAdmin>
        <NavLink href={"/admin"}>Dashboard</NavLink>
        <NavLink href={"/admin/products"}>Products</NavLink>
    </NavAdmin>
          <div className="flex-grow flex-1 pt-8">{children}</div>
        </main>
        </ThemeProvider>
      </body>
    </html>
  );
}


