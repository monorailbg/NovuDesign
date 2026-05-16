import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Manifesto from "@/components/Manifesto";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Insights from "@/components/Insights";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <Manifesto />
        <About />
        <Testimonials />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
