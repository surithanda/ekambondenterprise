import Link from 'next/link'
import RevealWrapper from '../animation/RevealWrapper'
import TextAppearAnimation from '../animation/TextAppearAnimation'

const ServiceProcess = () => {
  return (
    <section className="pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <div className="container">
        <TextAppearAnimation>
          <h3 className="text-appear lg:text[56px] mb-20 text-center max-md:text-3xl md:text-6xl lg:leading-[1.2] lg:tracking-[-1.68px]">
            How do we deliver?
          </h3>
        </TextAppearAnimation>

        <RevealWrapper className="relative after:absolute after:-z-10 after:block after:h-[1px] after:w-full after:bg-[#e5e5e5] after:content-[''] dark:after:bg-white/10 max-lg:before:absolute max-lg:before:bottom-[157px] max-lg:before:-z-10 max-lg:before:block max-lg:before:h-[1px] max-lg:before:w-full max-lg:before:bg-[#e5e5e5] max-lg:before:content-[''] dark:max-lg:before:bg-white/10 max-md:bottom-5 max-md:before:bottom-[137px] max-md:after:top-16 md:after:top-[105px]">
          <div className="grid grid-cols-1 items-center justify-between gap-[30px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <RevealWrapper className="text-center">
              <span className="relative after:absolute after:-bottom-[37px] after:left-[50%] after:z-50 after:h-5 after:w-5 after:-translate-x-[50%] after:rounded-full after:bg-secondary after:content-[''] dark:after:bg-backgroundBody max-md:text-3xl md:text-[64px] md:leading-[1.2] md:tracking-[-1.92px]">
                01
              </span>
              <h3 className="mb-5 mt-16 max-md:text-3xl md:leading-[1.2] md:tracking-[-1.68px] md:text-[56PX]">
                Assess
              </h3>
              <p className="text-base leading-[1.4] tracking-[0.32px]">
                We analyze your data and business needs to craft tailored AI and analytics solutions for maximum impact and efficiency.
              </p>
            </RevealWrapper>

            <RevealWrapper className="text-center">
              <span className="relative after:absolute after:-bottom-[37px] after:left-[50%] after:z-10 after:h-5 after:w-5 after:-translate-x-[50%] after:rounded-full after:bg-secondary after:content-[''] dark:after:bg-backgroundBody max-md:text-3xl md:text-[64px] md:leading-[1.2] md:tracking-[-1.92px]">
                02
              </span>
              <h3 className="mb-5 mt-16 max-md:text-3xl md:leading-[1.2] md:tracking-[-1.68px] md:text-[56PX]">
                Design
              </h3>
              <p className="text-base leading-[1.4] tracking-[0.32px]">
                We design secure, scalable AI and cloud solutions to address your unique challenges and drive business transformation.
              </p>
            </RevealWrapper>

            <RevealWrapper className="text-center">
              <span className="relative after:absolute after:-bottom-[37px] after:left-[50%] after:z-10 after:h-5 after:w-5 after:-translate-x-[50%] after:rounded-full after:bg-secondary after:content-[''] dark:after:bg-backgroundBody max-md:text-3xl md:text-[64px] md:leading-[1.2] md:tracking-[-1.92px]">
                03
              </span>
              <h3 className="mb-5 mt-16 max-md:text-3xl md:leading-[1.2] md:tracking-[-1.68px] md:text-[56PX]">
                Implement
              </h3>
              <p className="text-base leading-[1.4] tracking-[0.32px]">
                We build and integrate robust data and AI systems, ensuring seamless execution and alignment with your business goals.
              </p>
            </RevealWrapper>

            <RevealWrapper className="text-center">
              <span className="relative after:absolute after:-bottom-[37px] after:left-[50%] after:z-10 after:h-5 after:w-5 after:-translate-x-[50%] after:rounded-full after:bg-secondary after:content-[''] dark:after:bg-backgroundBody max-md:text-3xl md:text-[64px] md:leading-[1.2] md:tracking-[-1.92px]">
                04
              </span>
              <h3 className="mb-5 mt-16 max-md:text-3xl md:leading-[1.2] md:tracking-[-1.68px] md:text-[56PX]">
                Deploy
              </h3>
              <p className="text-base leading-[1.4] tracking-[0.32px]">
                We deliver optimized solutions, empowering your business with actionable insights and scalable data-driven systems.
              </p>
            </RevealWrapper>
          </div>
        </RevealWrapper>

        <div className="reveal-me mt-7 flex list-none items-center justify-center md:mt-14">
          <div className="mx-auto block w-full text-center md:inline-block md:w-auto">
            <Link href="/contact" className="rv-button rv-button-sm rv-button-primary block md:inline-block">
              <div className="rv-button-top">
                <span>Let’s Begin</span>
              </div>
              <div className="rv-button-bottom">
                <span className="text-nowrap">Let’s Begin</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceProcess
