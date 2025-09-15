"use client";

import logoDark from "@/public/images/logo/MysticMinds_Dark_Logo.png";
import logo from "@/public/images/logo/MysticMinds_Logo.png";

import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { SocialIcons } from "@/components/navbarCompo/social-icons";
import { MenuList } from "../navbarCompo/menu-list";

export default function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const menuRef = useRef<HTMLElement>(null);
  const menuOverflowRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLUListElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollPositionRef = useRef(0);
  const isMenuOpenRef = useRef(false);
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (menuRef.current) {
      menuRef.current.style.visibility = "hidden";
      menuRef.current.style.opacity = "0";
    }
    if (menuOverflowRef.current) {
      menuOverflowRef.current.style.visibility = "hidden";
      menuOverflowRef.current.style.opacity = "0";
    }
  }, []);

  const openMenu = useCallback(() => {
    if (
      menuOverflowRef.current &&
      openBtnRef.current &&
      menuRef.current &&
      timelineRef.current
    ) {
      isMenuOpenRef.current = true;

      scrollPositionRef.current = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      gsap.set(menuOverflowRef.current, { scale: 0.98 });
      openBtnRef.current.classList.add("opacity-0");
      timelineRef.current.timeScale(1).play();
      menuRef.current.style.pointerEvents = "auto";
    }
  }, []);

  const closeMenu = useCallback(() => {
    if (openBtnRef.current && menuRef.current && timelineRef.current) {
      isMenuOpenRef.current = false;

      const scrollY = Number.parseInt(document.body.style.top || "0") * -1;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, Math.abs(scrollY));

      openBtnRef.current.classList.remove("opacity-1");
      gsap.to(openBtnRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        delay: 0.5,
        ease: "back.out(1.7)",
      });

      timelineRef.current.timeScale(1.2).reverse();
      menuRef.current.style.pointerEvents = "none";
    }
  }, []);

  // Close menu on route change
  useEffect(() => {
    if (isMenuOpenRef.current) {
      closeMenu();
    }
  }, [pathname, closeMenu]);

  useEffect(() => {
    gsap.registerEase("custom", (progress) =>
      progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
    );

    if (
      menuRef.current &&
      menuOverflowRef.current &&
      menuItemsRef.current &&
      closeBtnRef.current &&
      openBtnRef.current
    ) {
      gsap.set(menuRef.current, {
        pointerEvents: "none",
        autoAlpha: 0,
      });
      gsap.set(menuOverflowRef.current, {
        pointerEvents: "none",
        autoAlpha: 0,
        y: -30,
        rotate: -1,
        scale: 0.98,
      });
      gsap.set(menuItemsRef.current, {
        autoAlpha: 0,
        y: -10,
        scale: 0.95,
      });
      gsap.set(closeBtnRef.current, {
        autoAlpha: 0,
        y: -10,
        scale: 0.95,
      });

      timelineRef.current = gsap.timeline({
        paused: true,
        defaults: {
          ease: "custom",
          duration: 0.8,
        },
        onReverseComplete: () => {
          if (menuRef.current) {
            menuRef.current.style.pointerEvents = "none";
          }
        },
      });

      timelineRef.current
        .to(
          menuRef.current,
          {
            autoAlpha: 1,
            pointerEvents: "auto",
            duration: 0.5,
            ease: "power2.out",
          },
          0
        )
        .to(
          menuOverflowRef.current,
          {
            autoAlpha: 1,
            pointerEvents: "auto",
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 0.6,
            ease: "custom",
          },
          0.1
        )
        .to(
          menuItemsRef.current,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            stagger: {
              amount: 0.4,
              ease: "power2.out",
            },
            duration: 0.7,
            ease: "custom",
          },
          0.2
        )
        .to(
          closeBtnRef.current,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          0.3
        )
        .to(
          openBtnRef.current,
          {
            autoAlpha: 0,
            y: -10,
            scale: 0.95,
            duration: 0.5,
            delay: 0.3,
            ease: "back.out(1.7)",
          },
          0.1
        );
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    if (isMenuOpenRef.current) {
      closeMenu();
    }
  }, [pathname, closeMenu]);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 200) {
        // Scrolling down & past threshold
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed z-[9999] w-full transition-transform duration-300"
      >
        {/* Hyper-responsive backdrop blur layers */}
        <div
          className={`pointer-events-none fixed top-0 z-[21] h-[80px] w-full transition duration-300 ease-linear will-change-transform 
            xs:h-[90px] 
            sm:h-[100px] 
            md:h-[120px] 
            lg:h-[130px] 
            xl:h-[140px] 
            2xl:h-[150px] 
            3xl:h-[165px] 
            4xl:h-[180px] 
            ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backdropFilter: "blur(0px)",
              WebkitBackdropFilter: "blur(0px)",
            }}
          ></div>
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              maskImage:
                "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 16.666666666666664%, rgba(255, 255, 255, 1) 33.33333333333333%, rgba(255, 255, 255, 0) 50%)",
              WebkitMaskImage:
                "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 16.666666666666664%, rgba(255, 255, 255, 1) 33.33333333333333%, rgba(255, 255, 255, 0) 50%)",
              backdropFilter: "blur(-7px)",
              WebkitBackdropFilter: "blur(-7px)",
            }}
          ></div>
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              maskImage:
                "linear-gradient(0deg, rgba(255, 255, 255, 0) 16.666666666666664%, rgba(255, 255, 255, 1) 33.33333333333333%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 66.66666666666666%)",
              WebkitMaskImage:
                "linear-gradient(0deg, rgba(255, 255, 255, 0) 16.666666666666664%, rgba(255, 255, 255, 1) 33.33333333333333%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 66.66666666666666%)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
            }}
          ></div>
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              maskImage:
                "linear-gradient(0deg, rgba(255, 255, 255, 0) 33.33333333333333%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 66.66666666666666%, rgba(255, 255, 255, 0) 83.33333333333333%)",
              WebkitMaskImage:
                "linear-gradient(0deg, rgba(255, 255, 255, 0) 33.33333333333333%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 66.66666666666666%, rgba(255, 255, 255, 0) 83.33333333333333%)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          ></div>
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              maskImage:
                "linear-gradient(0deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 1) 66.66666666666666%, rgba(255, 255, 255, 1) 83.33333333333333%, rgba(255, 255, 255, 0) 100%)",
              WebkitMaskImage:
                "linear-gradient(0deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 1) 66.66666666666666%, rgba(255, 255, 255, 1) 83.33333333333333%, rgba(255, 255, 255, 0) 100%)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          ></div>
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              maskImage:
                "linear-gradient(0deg, rgba(255, 255, 255, 0) 66.66666666666666%, rgba(255, 255, 255, 1) 83.33333333333333%, rgba(255, 255, 255, 1) 100%, rgba(255, 255, 255, 0) 116.66666666666666%)",
              WebkitMaskImage:
                "linear-gradient(0deg, rgba(255, 255, 255, 0) 66.66666666666666%, rgba(255, 255, 255, 1) 83.33333333333333%, rgba(255, 255, 255, 1) 100%, rgba(255, 255, 255, 0) 116.66666666666666%)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          ></div>
        </div>

        {/* Main navigation with hyper-responsive design */}
        <nav
          className={`fixed z-[1000] w-full transition duration-300 ease-linear will-change-transform
            px-2 pt-1 
            xs:px-3 xs:pt-2 
            sm:px-4 sm:pt-3 
            md:px-6 md:pt-4 
            lg:px-8 lg:pt-5 
            xl:px-10 xl:pt-6 
            2xl:px-12 2xl:pt-8 
            3xl:px-16 3xl:pt-10
            4xl:px-20 4xl:pt-12
            ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
        >
          <div className="flex justify-between items-center">
            {/* Logo with hyper-responsive sizing */}
            <Link href="/" className="relative z-10 flex-shrink-0">
              <Image
                className="inline-block dark:hidden
                  h-6 w-auto
                  xs:h-8
                  sm:h-10
                  md:h-12
                  lg:h-14
                  xl:h-16
                  2xl:h-[68px]
                  3xl:h-20
                  4xl:h-24"
                src={logo}
                alt="logo"
                width={136}
                height={68}
                priority
                sizes="(max-width: 480px) 24px, (max-width: 640px) 32px, (max-width: 768px) 40px, (max-width: 1024px) 48px, (max-width: 1280px) 56px, (max-width: 1536px) 64px, (max-width: 1920px) 68px, (max-width: 2560px) 80px, 96px"
              />
              <Image
                className="hidden dark:inline-block
                  h-6 w-auto
                  xs:h-8
                  sm:h-10
                  md:h-12
                  lg:h-14
                  xl:h-16
                  2xl:h-[68px]
                  3xl:h-20
                  4xl:h-24"
                src={logoDark}
                alt="logo"
                width={136}
                height={68}
                priority
                sizes="(max-width: 480px) 24px, (max-width: 640px) 32px, (max-width: 768px) 40px, (max-width: 1024px) 48px, (max-width: 1280px) 56px, (max-width: 1536px) 64px, (max-width: 1920px) 68px, (max-width: 2560px) 80px, 96px"
              />
            </Link>

            {/* Menu button with responsive sizing */}
            <div className="flex items-center">
              <button
                ref={openBtnRef}
                onClick={openMenu}
                className="menu-open relative cursor-pointer 
                  h-6 w-6 before:absolute before:left-1/2 before:top-[10px] before:h-0.5 before:w-3 before:-translate-x-1/2 before:bg-black before:transition-all before:duration-300 before:content-[''] after:absolute after:bottom-[10px] after:left-1/2 after:h-0.5 after:w-3 after:-translate-x-1/2 after:bg-black after:transition-all after:duration-300 after:content-[''] hover:before:top-[8px] hover:after:bottom-[8px] dark:before:bg-white dark:after:bg-white
                  xs:h-8 xs:w-8 xs:before:top-[14px] xs:before:w-4 xs:after:bottom-[14px] xs:after:w-4 xs:hover:before:top-[12px] xs:hover:after:bottom-[12px]
                  sm:h-10 sm:w-10 sm:before:top-[18px] sm:before:w-5 sm:after:bottom-[18px] sm:after:w-5 sm:hover:before:top-[16px] sm:hover:after:bottom-[16px]
                  md:h-12 md:w-12 md:before:top-[22px] md:before:w-6 md:after:bottom-[22px] md:after:w-6 md:hover:before:top-[19px] md:hover:after:bottom-[19px]
                  lg:h-14 lg:w-14 lg:before:top-[26px] lg:before:w-7 lg:after:bottom-[26px] lg:after:w-7 lg:hover:before:top-[23px] lg:hover:after:bottom-[23px]
                  xl:h-16 xl:w-16 xl:before:top-[30px] xl:before:w-8 xl:after:bottom-[30px] xl:after:w-8 xl:hover:before:top-[27px] xl:hover:after:bottom-[27px]
                  2xl:h-[68px] 2xl:w-[68px] 2xl:before:top-[32px] 2xl:before:w-9 2xl:after:bottom-[32px] 2xl:after:w-9 2xl:hover:before:top-[29px] 2xl:hover:after:bottom-[29px]
                  3xl:h-20 3xl:w-20 3xl:before:top-[38px] 3xl:before:w-10 3xl:after:bottom-[38px] 3xl:after:w-10 3xl:hover:before:top-[35px] 3xl:hover:after:bottom-[35px]
                  4xl:h-24 4xl:w-24 4xl:before:top-[46px] 4xl:before:w-12 4xl:after:bottom-[46px] 4xl:after:w-12 4xl:hover:before:top-[42px] 4xl:hover:after:bottom-[42px]"
                aria-label="Open Menu"
              ></button>
            </div>
          </div>
        </nav>
      </header>

      {/* Full screen menu with hyper-responsive design */}
      <nav
        ref={menuRef}
        data-lenis-prevent="true"
        className="menu fixed inset-0 z-[99999] min-h-screen w-full overflow-y-auto opacity-0 before:absolute before:top-0 before:w-[1px] before:bg-backgroundBody before:bg-opacity-10 before:content-none 
          xs:right-4 
          sm:right-6 
          md:right-8 md:before:left-[45%] md:before:h-screen md:before:content-[''] 
          lg:right-10 lg:before:left-[38%] lg:before:h-[calc(100vh-87px)] 
          xl:right-12 xl:before:left-[42%] xl:before:h-[calc(100vh-94px)] 
          2xl:right-16 2xl:before:left-[45%] 2xl:before:h-[calc(100vh-110px)] 
          3xl:right-20 3xl:before:left-[48%] 3xl:before:h-[calc(100vh-130px)]
          4xl:right-24 4xl:before:left-[50%] 4xl:before:h-[calc(100vh-150px)]"
      >
        {/* Close button with hyper-responsive positioning */}
        <button
          ref={closeBtnRef}
          onClick={closeMenu}
          className="menu-close sticky cursor-pointer text-white
            left-[85%] top-3 h-5 w-5
            xs:left-[88%] xs:top-4 xs:h-6 xs:w-6
            sm:left-[90%] sm:top-5 sm:h-7 sm:w-7
            md:left-[92%] md:top-6 md:h-8 md:w-8
            lg:left-[93.5%] lg:top-8 lg:h-9 lg:w-9
            xl:left-[95%] xl:top-10 xl:h-10 xl:w-10
            2xl:left-[96%] 2xl:top-12 2xl:h-11 2xl:w-11
            3xl:left-[97%] 3xl:top-14 3xl:h-12 3xl:w-12
            4xl:left-[97.5%] 4xl:top-16 4xl:h-14 4xl:w-14"
          aria-label="Close Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
            viewBox="0 0 50 50"
          >
            <path
              d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"
              fill="#fff"
            />
          </svg>
        </button>

        {/* Menu wrapper with hyper-responsive sizing */}
        <div className="menu-wrapper relative z-[99999] mx-auto flex max-h-[90vh] flex-col overflow-y-auto overflow-x-hidden pb-4
          max-w-[320px] gap-6 px-6
          xs:max-w-[360px] xs:gap-7 xs:px-7
          sm:max-w-[420px] sm:gap-8 sm:px-8
          md:top-8 md:max-h-none md:max-w-[520px] md:gap-10 md:overflow-visible md:px-10 md:pt-0
          lg:max-w-[680px] lg:gap-12 lg:px-12
          xl:max-w-[840px] xl:gap-16 xl:px-14
          2xl:top-6 2xl:max-w-[1000px] 2xl:gap-20 2xl:px-16
          3xl:max-w-[1200px] 3xl:gap-24 3xl:px-20
          4xl:max-w-[1400px] 4xl:gap-28 4xl:px-24">
          <MenuList ref={menuItemsRef} onItemClick={closeMenu} />
        </div>

        {/* Menu footer with hyper-responsive design */}
        <div className="menu-footer fixed bottom-0 w-full border-t border-white border-opacity-10 max-lg:hidden lg:block
          px-4 
          xs:px-5 
          sm:px-6 
          md:px-8 
          lg:px-10 
          xl:px-12 
          2xl:px-16 
          3xl:px-20
          4xl:px-24">
          <div className="menu-footer-content mx-auto flex flex-col justify-between text-xs
            max-w-[200px] py-3
            xs:max-w-[220px] xs:py-4 xs:text-sm
            sm:max-w-[280px] sm:py-5
            md:max-w-[420px] md:flex-row md:py-6
            lg:max-w-[560px] lg:py-7 lg:text-base
            xl:max-w-[720px] xl:py-8
            2xl:max-w-[900px] 2xl:py-9 2xl:text-lg
            3xl:max-w-[1100px] 3xl:py-10 3xl:text-xl
            4xl:max-w-[1300px] 4xl:py-12 4xl:text-2xl">
            <div className="mb-3 w-full text-white md:mb-0 md:w-auto">
              <div className="block md:hidden lg:hidden xl:block">
                {/* Single line on mobile and XL+ */}
                <p className="text-white">
                  Mystic Minds, 8-2-120/86, Banjara Hills, Hyderabad, TS, 500034
                </p>
              </div>
              <div className="hidden md:block lg:block xl:hidden">
                {/* Two lines on tablet/laptop */}
                <p className="text-white">Mystic Minds, 8-2-120/86, Banjara Hills,</p>
                <p className="text-white">Hyderabad, TS, 500034</p>
              </div>
            </div>
            <SocialIcons />
          </div>
        </div>
      </nav>

      {/* Menu overlay with consistent blur */}
      <div
        ref={menuOverflowRef}
        className="menu-overflow pointer-events-none fixed inset-0 z-[9999] bg-[rgba(10,10,10,0.90)] backdrop-blur-[15px] 
          xs:bg-[rgba(10,10,10,0.92)] xs:backdrop-blur-[18px] 
          sm:bg-[rgba(10,10,10,0.94)] sm:backdrop-blur-[20px] 
          md:bg-[rgba(10,10,10,0.95)] md:backdrop-blur-[25px] 
          lg:backdrop-blur-[30px] 
          xl:backdrop-blur-[35px] 
          2xl:backdrop-blur-[40px]
          3xl:backdrop-blur-[45px]
          4xl:backdrop-blur-[50px]"
      ></div>
    </>
  );
}