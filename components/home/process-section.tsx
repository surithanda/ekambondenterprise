import Link from "next/link";
import RevealWrapper from "../animation/RevealWrapper";
import TextAppearAnimation from "../animation/TextAppearAnimation";

const Process = () => {
  return (
    <section className="pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <div className="container">
        <div className="text-center">
          <TextAppearAnimation>
            <h2 className="text-appear mb-7 text-center lg:mb-14">
              From concept to
              <i className="font-instrument"> Data-Driven </i>
              <br className="hidden md:block" />
              <i className="font-instrument">execution</i>
            </h2>
          </TextAppearAnimation>
        </div>
        <div className="service-item-wrapper flex justify-center gap-[30px] max-md:flex-wrap">
          <RevealWrapper className="relative flex flex-col items-center justify-center pt-[100px]">
            <h2 className="service-item-number" aria-hidden="true"></h2>
            <h5 className="mb-5">Discovery Session</h5>
            <p className="text-center">
              Analyzing goals and business priorities.
            </p>
          </RevealWrapper>
          <RevealWrapper className="relative flex flex-col items-center justify-center pt-[100px]">
            <h2 className="service-item-number" aria-hidden="true"></h2>
            <h5 className="mb-5">Solution Design</h5>
            <p className="text-center">
              Building tailored data and AI solutions.
            </p>
          </RevealWrapper>
          <RevealWrapper className="relative flex flex-col items-center justify-center pt-[100px]">
            <h2 className="service-item-number" aria-hidden="true"></h2>
            <h5 className="mb-5">Deployment & Scale</h5>
            <p className="text-center">
              Delivering scalable platforms for business.
            </p>
          </RevealWrapper>
        </div>

        <RevealWrapper as="ul" className="mt-14 flex justify-center">
          <li>
            <Link
              href="/contact"
              className="rv-button rv-button-sm rv-button-primary"
            >
              <div className="rv-button-top">
                <span>Let’s Talk</span>
              </div>
              <div className="rv-button-bottom">
                <span>Let’s Talk</span>
              </div>
            </Link>
          </li>
        </RevealWrapper>
      </div>
    </section>
  );
};

export default Process;
