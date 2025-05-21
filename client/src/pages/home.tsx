import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Speaking from "@/components/sections/Speaking";
import Tutorials from "@/components/sections/Tutorials";
import Newsletter from "@/components/sections/Newsletter";
import Contact from "@/components/sections/Contact";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const HomePage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>The Devinci Code | Devin Baldwin</title>
        <meta name="description" content="The Devinci Code - Devin Baldwin's personal brand blending creativity, innovation, and education in WebXR, speaking engagements, and tutorials" />
      </Helmet>
      <Hero />
      <About />
      <Projects />
      <Speaking />
      <Tutorials />
      <Newsletter />
      <Contact />
    </>
  );
};

export default HomePage;
