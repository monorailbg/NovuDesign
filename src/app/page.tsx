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
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        {/* Hero animates itself internally */}
        <Hero />

        <FadeIn delay={0}  y={36}><Marquee /></FadeIn>
        <FadeIn delay={0}  y={48}><Services /></FadeIn>
        <FadeIn delay={0}  y={48}><Work /></FadeIn>
        <FadeIn delay={0}  y={48}><Manifesto /></FadeIn>
        <FadeIn delay={0}  y={48}><About /></FadeIn>
        <FadeIn delay={0}  y={48}><Testimonials /></FadeIn>
        <FadeIn delay={0}  y={48}><Insights /></FadeIn>
        <FadeIn delay={0}  y={48}><Contact /></FadeIn>
      </main>
      <FadeIn delay={0} y={24}><Footer /></FadeIn>
    </>
  );
}
