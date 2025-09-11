"use client";
import useReveal from "@/hooks/useReveal";
import RevealWrapper from "../animation/RevealWrapper";

const About = () => {
  const { revealRef } = useReveal();
  return (
    <section className="relative overflow-hidden pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <RevealWrapper className="container">
        <h3
          ref={revealRef}
          className="text-left text-2xl font-normal text-secondary/90 dark:text-backgroundBody/70 lg:text-3xl lg:leading-[1.2] lg:tracking-[0.72px] xl:text-4xl"
        >
          At MysticMind Data Solutions, we believe data goes beyond numbers—it’s
          about creating intelligent strategies that empower, optimize, and
          drive lasting growth. Our approach blends technology with innovation,
          ensuring that every solution adds real value. Whether it’s analytics,
          cloud platforms, or AI applications, we focus on transformation that
          aligns with your business goals.
        </h3>
      </RevealWrapper>
    </section>
  );
};

export default About;
