import React from 'react'
import RevealWrapper from '../animation/RevealWrapper'

const AboutHero = () => {
  return (
    <section className="pb-14 pt-28 md:pb-20 md:pt-48 lg:pb-[100px] lg:pt-[200px]">
      <RevealWrapper className="container">
        <div className="flex flex-col items-center justify-end gap-x-20 gap-y-5 sm:flex-row md:gap-y-10">
          <h1 className="font-instrument text-5xl font-normal italic md:text-6xl lg:text-9xl xl:text-[156px] xl:leading-[1.1]">
            About
          </h1>

          <p className="max-w-[470px]">
            At MysticMind Data Solutions, our team of experienced professionals excels in data
            and AI technologies across multiple industries. We deliver tailored solutions,
            leveraging the latest tools and technologies to build scalable, secure, and
            innovative data systems that align with your unique business goals.
          </p>
        </div>

        <h2 className="mb-5 text-6xl sm:text-7xl md:text-8xl lg:text-[156px] xl:text-[236px] xl:leading-[1.1]">
          MysticMind
        </h2>

        <p className="max-w-[720px] text-lg md:text-xl lg:text-2xl">
          As trusted partners of Microsoft, Azure, AWS, and Google Cloud, we bring credibility and
          deep expertise to every project. Ready to transform your data and drive innovation
          with AI? Get in touch today and let us help you navigate the world of data with
          confidence.
        </p>
      </RevealWrapper>
    </section>
  )
}

export default AboutHero
