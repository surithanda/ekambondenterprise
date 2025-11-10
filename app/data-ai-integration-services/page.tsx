import CTA from "@/components/common/cta-section";
import Process from "@/components/services-page/Process";
import ServicesHero from "@/components/services/hero-section";
import LayoutTwo from "@/components/shared/LayoutTwo";
import CtaImageSlider from "@/components/shared/CtaImageSlider";
import React from "react";
import InnovativeServices from "@/components/innovative-services/innovative-services";

export const metadata = {
  title: "Innovative Services - Mystic Mind Solutions",
};

const DataAIServices = () => {
  return (
    <LayoutTwo>
      <ServicesHero
        badgeTitle="Data & AI Integration"
        title="Integrated Services"
        italicTitle=""
        scale
        description="Unlock the potential of your data with our advanced AI-powered solutions. From real-time analytics to end-to-end automation, we deliver results that drive growth and efficiency."
        spacing="max-md:pt-44 max-sm:pb-10 max-md:pb-16 md:py-44 lg:py-[200px] relative overflow-hidden"
      />
      <InnovativeServices />
      <Process />
      <CTA>
        Let's chat!
        <CtaImageSlider
          slides={[
            { id: "1", img: "/images/home/One.jpg" },
            { id: "2", img: "/images/home/Two.jpg" },
            { id: "3", img: "/images/home/Three.jpg" },
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

export default DataAIServices;
