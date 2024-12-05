import CategoryBanner from "@/components/UI-HomePage/CategoryBanner";
import Header from "@/components/header/Header";
import HeroSection from "@/components/UI-HomePage/HeroSection";
import ProductsCategory from "@/components/UI-HomePage/ProductsCategori";
import CoffeeClub from "@/components/UI-HomePage/CoffeeClub";
import ContactUs from "@/components/UI-HomePage/contactus";
import Services from "@/components/UI-HomePage/Services";
import Footer from "@/components/footer/footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <CategoryBanner />
      <ProductsCategory />
      <CoffeeClub />
      <ContactUs />
      <Services />
      <Footer />
    </>
  );
}
