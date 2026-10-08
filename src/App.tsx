import { useEffect } from "react";
import Lenis from "lenis";
import { Header } from "./components/layout/Header";
import { Hero } from "./components/sections/Hero";
import Services from "./components/sections/Services";
import BookingProcess from "./components/sections/BookingProcess";
import Faq from "./components/sections/Faq";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: { offset: -96 },
      respectReducedMotion: true,
      wheelMultiplier: 0.8,
      lerp: 0.05,
    });

    return () => lenis.destroy();
  }, []);

  return (
    <div className="font-geist">
      <Header />
      <Hero />
      <Services />
      <BookingProcess />
      <Faq />
    </div>
  );
}

export default App;
