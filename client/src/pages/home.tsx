import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Speaking from "@/components/sections/Speaking";
import Newsletter from "@/components/sections/Newsletter";
import Contact from "@/components/sections/Contact";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";

const HomePage = () => {
  const { toast } = useToast();

  useEffect(() => {
    // scroll to top on mount
    window.scrollTo(0, 0);

    // check query params for confirmation result
    const url = new URL(window.location.href);
    const params = url.searchParams;

    const confirmed = params.get("confirmed");
    const confirmErr = params.get("confirm_error");

    if (confirmed === "1") {
      toast({
        title: "You're in 🎉",
        description: "Thanks for confirming. You'll get the next issue.",
        variant: "default",
      });
    } else if (confirmErr === "expired") {
      toast({
        title: "Confirmation link expired",
        description: "Please subscribe again and we’ll send a fresh link.",
        variant: "destructive",
      });
    } else if (confirmErr === "invalid") {
      toast({
        title: "Invalid confirmation link",
        description: "Please try subscribing again.",
        variant: "destructive",
      });
    }

    // clean the URL so refresh doesn't retrigger the toast
    if (confirmed || confirmErr) {
      params.delete("confirmed");
      params.delete("confirm_error");
      const clean =
        url.pathname +
        (params.toString() ? `?${params.toString()}` : "") +
        (url.hash || "");
      window.history.replaceState({}, "", clean);
    }
  }, [toast]);

  return (
    <>
      <Helmet>
        <title>The Devinci Code | Devin Baldwin</title>
        <meta
          name="description"
          content="The Devinci Code - Devin Baldwin's personal brand blending creativity, innovation, and education in WebXR, speaking engagements, and tutorials"
        />
      </Helmet>

      <Hero />
      <About />
      <Speaking />
      <Newsletter />
      <Contact />
    </>
  );
};

export default HomePage;
