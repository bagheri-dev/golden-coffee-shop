import Footer from "@/components/footer/footer";
import HeaderLayout from "@/components/header/HeaderLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderLayout />
      {children}
      <Footer />
    </>
  )
}