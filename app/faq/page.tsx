import CTA from "@/components/common/cta-section";
import CtaImageSlider from "@/components/shared/CtaImageSlider";
import FAQ from "@/components/shared/FAQ";
import LayoutTwo from "@/components/shared/LayoutTwo";

export const metadata = {
  title: "FAQ | MysticMind Data Solutions",
  description:
    "Find answers to common questions about MysticMind Data Solutions, including our services in data analytics, AI, cloud platforms, data security, and how to get started with us.",
};

const FAQPage = () => {
  return (
    <LayoutTwo>
      <FAQ bigTitleWithBadge={true} />
      <CTA>
        Let's chat!
        <CtaImageSlider
          slides={[
            { id: "1", img: "/images/agent/11.png" },
            { id: "2", img: "/images/agent/01.jpg" },
            { id: "3", img: "/images/agent/12.png" },
          ]}
        />
        with us.
        <i className="block font-instrument italic max-md:inline-block max-sm:pl-2 sm:mt-10">
          A virtual coffee?
        </i>
      </CTA>
    </LayoutTwo>
  );
};

export default FAQPage;
