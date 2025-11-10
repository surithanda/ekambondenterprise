"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import RevealWrapper from "../animation/RevealWrapper";
import TextAppearAnimation from "../animation/TextAppearAnimation";
import HeroGradientAnimationV2 from "../shared/HeroGradientAnimationV2";

const HeroSection = () => {
  const heroImage1Ref = useRef<HTMLDivElement>(null);
  const heroImage2Ref = useRef<HTMLDivElement>(null);
  const heroImage3Ref = useRef<HTMLDivElement>(null);
  const heroButtonRef = useRef<HTMLAnchorElement>(null);

  const [isHovered, setIsHovered] = useState(true);

  useEffect(() => {
    if (
      !heroImage1Ref.current ||
      !heroImage2Ref.current ||
      !heroImage3Ref.current
    )
      return;

    gsap.set(heroImage1Ref.current, {
      x: -320,
      opacity: 0.8,
      rotate: -20,
      visibility: "visible",
    });

    gsap.set(heroImage2Ref.current, {
      x: 280,
      opacity: 0.8,
      rotate: 20,
      visibility: "visible",
    });

    gsap.set(heroImage3Ref.current, {
      scale: 0,
      opacity: 0.8,
      rotate: -17,
      visibility: "visible",
    });
  }, []);

  useEffect(() => {
    if (
      !heroImage1Ref.current ||
      !heroImage2Ref.current ||
      !heroImage3Ref.current
    )
      return;

    const ctx = gsap.context(() => {
      const image1 = heroImage1Ref.current;
      const image2 = heroImage2Ref.current;
      const image3 = heroImage3Ref.current;

      gsap.killTweensOf([image1, image2, image3]);

      if (isHovered) {
        gsap.fromTo(
          image1,
          { x: -320, opacity: 0.8, rotate: -20 },
          { duration: 0.5, x: 0, opacity: 1, rotate: 0, ease: "power2.out" }
        );

        gsap.fromTo(
          image2,
          { x: 280, opacity: 0.8, rotate: 20 },
          { duration: 0.5, x: 0, opacity: 1, rotate: 0, ease: "power2.out" }
        );

        gsap.fromTo(
          image3,
          { scale: 0, opacity: 0.8, rotate: -17 },
          { duration: 0.5, scale: 1, opacity: 1, rotate: 0, ease: "power2.out" }
        );
      } else {
        gsap.fromTo(
          image1,
          { x: 0, opacity: 1, rotate: 0 },
          {
            duration: 1.2,
            x: -320,
            opacity: 0.8,
            rotate: -20,
            ease: "power1.inOut",
          }
        );

        gsap.fromTo(
          image2,
          { x: 0, opacity: 1, rotate: 0 },
          {
            duration: 1.2,
            x: 280,
            opacity: 0.8,
            rotate: 20,
            ease: "power1.inOut",
          }
        );

        gsap.fromTo(
          image3,
          { scale: 1, opacity: 1, rotate: 0 },
          {
            duration: 1,
            scale: 0,
            opacity: 0.8,
            rotate: -17,
            ease: "back.in(1.2)",
          }
        );
      }
    });

    return () => ctx.revert();
  }, [isHovered]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <section className="relative overflow-hidden pb-14 pt-[120px] sm:pt-[135px] md:pb-16 md:pt-[150px] lg:pb-[88px] lg:pt-44 xl:pb-[100px] xl:pt-[200px]">
      <div className="container">
        {/* Badge */}
        <RevealWrapper className="flex items-center justify-center">
          <div className="rv-badge mb-2">
            <span className="rv-badge-text">Data + AI Innovation</span>
          </div>
        </RevealWrapper>

        {/* Heading */}
        <TextAppearAnimation>
          <h4 className="text-appear text-center 2xl:leading-[1.21]">
            Empowering businesses with
            <i className="font-instrument"> Data & AI </i>
            solutions
          </h4>
        </TextAppearAnimation>

        {/* Subtext */}
        <TextAppearAnimation>
          <p className="text-appear mx-auto mt-3 max-w-4xl text-center">
            From advanced analytics to cloud-native AI solutions, MysticMind
            Data Solutions helps organizations transform data into actionable
            insights, ensuring scalability, security, and sustainable growth.
          </p>
        </TextAppearAnimation>

        {/* Button (currently disabled)
        <RevealWrapper as="ul" className="mt-14 flex list-none justify-center">
          <li className="w-full text-center">
            <Link
              href="/services"
              className="rv-button rv-button-primary block cursor-pointer md:inline-block"
              ref={heroButtonRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="rv-button-top">
                <span>Explore Our Services</span>
              </div>
              <div className="rv-button-bottom">
                <span className="text-nowrap">Explore Our Services</span>
              </div>
            </Link>
          </li>
        </RevealWrapper>
        */}
      </div>

      {/* Hero Image — centered below text */}
      {/* <img
          src="/images/icons/hero-icons/data.png"
          alt="hero"
          className="reveal-me"
          width={100}
          height={100}
        /> */}
      <div className="grid grid-cols-3 justify-items-center items-center gap-10 mt-10">
       <div className="flex flex-col items-center">
  <img
    src="/images/icons/hero-icons/data.png"
    alt="data-left"
    className="reveal-me"
    width={200}
    height={100}
  />
  <p className=" text-lg font-semibold text-gray-800 bg-sky-100 px-4 py-2 rounded-lg">
  Data Analytics
</p>

</div>

        <img
          src="/images/icons/hero-icons/group.png"
          alt="hero"
          className="reveal-me"
          width={400}
          height={600}
        />
        <img
          src="/images/icons/hero-icons/data.png"
          alt="data-right"
          className="reveal-me"
          width={100}
          height={100}
        />
      </div>
    </section>
  );
};

export default HeroSection;
