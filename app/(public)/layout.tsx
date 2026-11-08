import { SiteFooter } from "@/components/public/footer";
import { SiteHeader } from "@/components/public/header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">{children}</main>
      <SiteFooter />
    </>
  );
}
