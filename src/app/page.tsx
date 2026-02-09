import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Credits from "@/components/sections/Credits";
import AudioShowreel from "@/components/sections/AudioShowreel";
import Studio from "@/components/sections/Studio";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-black">
      <Header />
      
      <Hero />
      <About />
      <Credits />
      <AudioShowreel />
      <Studio />
      <Gallery />
      <Testimonials />
      <Services />
      <Contact />

      <Footer />
    </main>
  );
}
