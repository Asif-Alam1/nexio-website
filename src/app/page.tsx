import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CustomCursor from "@/components/layout/CustomCursor";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <section id="hero" className="min-h-screen bg-midnight flex items-center justify-center">
          <h1 className="text-white font-display text-hero-mobile md:text-hero-tablet lg:text-hero">Nexio.</h1>
        </section>
        <section id="services" className="min-h-screen bg-cloud flex items-center justify-center">
          <h2 className="font-display text-h1 text-midnight">Services</h2>
        </section>
        <section id="process" className="min-h-screen bg-midnight flex items-center justify-center">
          <h2 className="font-display text-h1 text-white">Process</h2>
        </section>
        <section id="team" className="min-h-screen bg-cloud flex items-center justify-center">
          <h2 className="font-display text-h1 text-midnight">Team</h2>
        </section>
        <section id="contact" className="min-h-screen bg-midnight flex items-center justify-center">
          <h2 className="font-display text-h1 text-white">Contact</h2>
        </section>
      </main>
      <FloatingWhatsApp />
    </>
  );
}
