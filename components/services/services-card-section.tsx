import Image from 'next/image'
import RevealWrapper from '../animation/RevealWrapper'
import RevealWrapperV2 from '../animation/RevealWrapperV2'
import TextAppearAnimation from '../animation/TextAppearAnimation'
import TextAppearAnimation02 from '../animation/TextAppearAnimation02'
import Icon from "../../public/images/service-icons/One.svg"

import servicesData from "../../data/services";

const ServicesSection = () => {
  return (
    <section className="overflow-hidden pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <div className="mb-8 text-center md:mb-16">
        <RevealWrapperV2 className="rv-badge reveal-me mb-3">
          <span className="rv-badge-text">Provided Services</span>
        </RevealWrapperV2>
        <TextAppearAnimation02>
          <h2 className="text-appear mb-3">
            Data, AI solutions crafted for <br />
            <i className="font-instrument"> maximum value</i>
          </h2>
        </TextAppearAnimation02>
        <TextAppearAnimation>
          <p className="text-appear mx-auto lg:max-w-[770px]">
            MysticMind’s AI and analytics solutions drive business growth with secure, scalable cloud systems and intelligent data insights.
          </p>
        </TextAppearAnimation>
      </div>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-[30px] px-4 md:grid-cols-2 md:px-[30px] 2xl:grid-cols-3">
        {servicesData.slice(0, 7).map((service, index) => (
          <RevealWrapper
            key={index}
            className="reveal-me group border px-6 py-9 dark:border-dark lg:px-[30px] lg:py-[50px]">
            <figure>
              <Image src={service.lightLogo} alt={`Service ${index + 1} Logo`} className="inline-block dark:hidden" width={60} height={60} />
              <Image src={service.darkLogo} alt={`Service ${index + 1} Dark Logo`} className="hidden dark:inline-block" width={60} height={60} />
            </figure>
            <h5 className="mb-2 mt-4 lg:mb-3 lg:mt-6">{service?.title}</h5>
            <p className="mb-20 lg:mb-[106px]">{service.description}</p>
          </RevealWrapper>
        ))}
      </div>
    </section>
  )
}

export default ServicesSection
