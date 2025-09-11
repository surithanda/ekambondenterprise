
import AboutFaq from "@/components/about/about-faqs";
import AboutHero from "@/components/about/about-hero";
import AboutServices from "@/components/about/about-services";
import HeroAbout from "@/components/about/hero-about";
import CtaImageSlider from "@/components/common/cta-image-slider";
import CTA from "@/components/common/cta-section";
import AboutScroller from "@/components/common/scroller";
import VideoSection from "@/components/common/video-section";
import LayoutTwo from "@/components/shared/LayoutTwo";

export const metadata = {
  title: "About | MysticMind Data Solutions",
  description:
    "Discover why businesses trust MysticMind Data Solutions. With expertise in data analytics, AI, cloud solutions, and consulting, we deliver tailored, secure, and innovative services to drive growth and transformation.",
};


const AboutPage = () => {
  return (
    <LayoutTwo>
      <AboutHero />
      <VideoSection />
      <HeroAbout spacingTop="pt-10 sm:pt-16 md:pt-[100px] mb-10 lg:mb-20" />
      <AboutScroller />
      <AboutServices />
      <AboutFaq />
      <CTA>
        Let's chat!
        <CtaImageSlider
          slides={[
            { id: "1", img: "/images/agent/11.png" },
            { id: "2", img: "/images/agent/16.png" },
            { id: "3", img: "/images/agent/17.png" },
          ]}
        />
        with us.
        <i className="block font-instrument italic max-md:inline-block max-sm:pl-2 sm:mt-10">
          A virtual coffee?
        </i>
      </CTA>{" "}
    </LayoutTwo>
  );
};

export default AboutPage;
