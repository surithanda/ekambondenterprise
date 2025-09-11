import CtaImageSlider from "@/components/common/cta-image-slider";
import CTA from "@/components/common/cta-section";
import PageHero from "@/components/common/page-hero-section";
import TermsPolicyBody from "@/components/policy/terms-policy-body";
import LayoutTwo from "@/components/shared/LayoutTwo";
import getMarkDownData from "@/utils/GetMarkDownData";

export const metadata = {
  title: "Privacy & Policy - Mystic Minds Solutions",
};
export interface TermsDataType {
  slug: string;
  content: string;
  [key: string]: any;
}

const termsData: TermsDataType[] = getMarkDownData("data/terms");

const PolicyPage = () => {
  return (
    <LayoutTwo>
      <PageHero
        title="Privacy & "
        italicTitle="Policy"
        badgeTitle="Policy"
        scale
      />
      <TermsPolicyBody termsData={termsData} heading={true} />
      <CTA>
        Let's chat!
        <CtaImageSlider
          slides={[
            { id: "1", img: "/images/agent/01.jpg" },
            { id: "3", img: "/images/agent/03.jpg" },
            { id: "2", img: "/images/agent/04.png" },
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

export default PolicyPage;
