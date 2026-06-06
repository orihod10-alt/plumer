import Grain from "@/components/Grain";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import ProcessSection from "@/components/ProcessSection";
import Gallery from "@/components/Gallery";
import BeforeAfter from "@/components/BeforeAfter";
import Credentials from "@/components/Credentials";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import ServiceArea from "@/components/ServiceArea";
import ContactForm from "@/components/ContactForm";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";

export default function HomePage() {
  return (
    <>
      {/* Global overlays */}
      <Grain />
      <Loader />
      <Cursor />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <ProcessSection />
        <Gallery />
        <BeforeAfter />
        <Credentials />
        <Reviews />
        <FAQ />
        <ServiceArea />
        <ContactForm />
        <FinalCTA />
      </main>

      <Footer />

      {/* Sticky mobile CTA bar */}
      <MobileBar />
    </>
  );
}
