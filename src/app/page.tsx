import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CustomCursor from "@/components/layout/CustomCursor";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import PageLoader from "@/components/layout/PageLoader";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <Process />
        <Team />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
