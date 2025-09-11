import CtaImageSlider from "@/components/common/cta-image-slider";
import CTA from "@/components/common/cta-section";
import About from "@/components/home/about-us";
import Blogs from "@/components/home/blogs-section";
import FAQ from "@/components/home/faq-section";
import HeroSection from "@/components/home/hero-section";
import Process from "@/components/home/process-section";
import Scroller from "@/components/home/scroller";
import Services from "@/components/home/services";
import Testimonials from "@/components/home/testimonials";
import WhyChooseUs from "@/components/home/whychooseus";
import LayoutTwo from "@/components/shared/LayoutTwo";

import getMarkDownData from "@/utils/GetMarkDownData";

export const metadata = {
  title: "Mistic Minds | Design Agency",
};

interface BlogsType {
  slug: string;
  content: string;
  [key: string]: any;
}

const blogPosts: BlogsType[] = getMarkDownData("data/ai-solutions/blog");

const Home = () => {
  return (
    <LayoutTwo>
      <HeroSection />
      <Scroller />
      <About />
      <Services />
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <Blogs posts={blogPosts} />
      <FAQ />
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

export default Home;
