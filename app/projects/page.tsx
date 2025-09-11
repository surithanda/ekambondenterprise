import CtaImageSlider from "@/components/common/cta-image-slider";
import CTA from "@/components/common/cta-section";
import HeroSection from "@/components/projects/hero-section";
import ProjectItems from "@/components/projects/project-items";
import LayoutTwo from "@/components/shared/LayoutTwo";
import React from "react";

export const metadata = {
  title: "Projects - Mystic Minds Solutions",
};

const Projects = () => {
  return (
    <LayoutTwo>
      <HeroSection />
      <ProjectItems />
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

export default Projects;
