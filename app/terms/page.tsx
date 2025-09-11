import PageHero from "@/components/common/page-hero-section";
import CTA from "@/components/shared/CTA";
import CtaImageSlider from "@/components/shared/CtaImageSlider";
import LayoutTwo from "@/components/shared/LayoutTwo";
import TermsPolicyBody from "@/components/terms/terms-policy-body";
import getMarkDownData from "@/utils/GetMarkDownData";

export const metadata = {
  title: "Terms & Conditions -Mystic Mind Solutions",
};
export interface TermsDataType {
  slug: string;
  content: string;
  [key: string]: any;
}

const termsData: TermsDataType[] = getMarkDownData("data/terms");

const TermsPage = () => {
  return (
    <LayoutTwo>
      <PageHero
        title="Terms & "
        italicTitle="Privacy"
        badgeTitle="Terms"
        scale
      />
      <TermsPolicyBody termsData={termsData} />
      <CTA>
        Let's chat!
        <CtaImageSlider
          slides={[
            { id: "1", img: "/images/agent/14.png" },
            { id: "2", img: "/images/agent/16.png" },
            { id: "3", img: "/images/agent/19.png" },
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

export default TermsPage;
