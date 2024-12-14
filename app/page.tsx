import CategoryBanner from "@/components/UI-HomePage/CategoryBanner";
import Header from "@/components/header/Header";
import HeroSection from "@/components/UI-HomePage/HeroSection";
import ProductsCategory from "@/components/UI-HomePage/ProductsCategori";
import CoffeeClub from "@/components/UI-HomePage/CoffeeClub";
import ContactUs from "@/components/UI-HomePage/contactus";
import Services from "@/components/UI-HomePage/Services";
import Footer from "@/components/footer/footer";
import NewProducts from "@/container/home/newProducts";
import TopSellingProducts from "@/container/home/topSellingProducts";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <NewProducts />
      <CategoryBanner />
      <ProductsCategory />
      <TopSellingProducts />
      <CoffeeClub />
      <ContactUs />
      <Services />
      <Footer />
    </>
  );
}
