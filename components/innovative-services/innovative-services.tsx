import Image from "next/image";
import RevealWrapper from "../animation/RevealWrapper";
import RevealWrapperV2 from "../animation/RevealWrapperV2";
import TextAppearAnimation from "../animation/TextAppearAnimation";
import TextAppearAnimation02 from "../animation/TextAppearAnimation02";
import { InnovationServicesData } from "../../data/innovation-services";

const InnovativeServices = () => {
  return (
    <section className="overflow-hidden pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      {/* Section Header */}
      <div className="mb-8 text-center md:mb-16">
        <RevealWrapperV2 className="rv-badge reveal-me mb-3">
          <span className="rv-badge-text">Provided Services</span>
        </RevealWrapperV2>

        <TextAppearAnimation02>
          <h2 className="text-appear mb-3">
            Data & AI Solutions <br />
            <i className="font-instrument">Designed for Impact</i>
          </h2>
        </TextAppearAnimation02>

        <TextAppearAnimation>
          <p className="text-appear mx-auto lg:max-w-[770px]">
            Our AI and analytics services empower businesses with actionable
            insights, scalable cloud architectures, and automation to maximize
            value and drive growth.
          </p>
        </TextAppearAnimation>
      </div>

      {/* Services Grid */}
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-[30px] px-4 md:grid-cols-2 md:px-[30px] 2xl:grid-cols-3">
        {InnovationServicesData.map((service, index) => (
          <RevealWrapper
            key={index}
            className="reveal-me group border px-6 py-9 dark:border-dark lg:px-[30px] lg:py-[50px]"
          >
            <figure>
              <Image
                src={service.lightLogo}
                alt={`${service.title} Logo`}
                className="inline-block dark:hidden"
                width={60}
                height={60}
              />
              <Image
                src={service.darkLogo}
                alt={`${service.title} Dark Logo`}
                className="hidden dark:inline-block"
                width={60}
                height={60}
              />
            </figure>

            <h5 className="mb-2 mt-4 lg:mb-3 lg:mt-6">{service.title}</h5>
            <p className="mb-20 lg:mb-[106px]">{service.description}</p>
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
};

export default InnovativeServices;
