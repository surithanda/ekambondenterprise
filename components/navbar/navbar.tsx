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
          className={`pointer-events-none fixed top-0 z-[21] h-[100px] w-full transition duration-300 ease-linear will-change-transform xs:h-[120px] sm:h-[140px] md:h-[155px] lg:h-[155px] xl:h-[155px] 2xl:h-[165px] ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
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
          className={`fixed z-[1000] w-full px-2 pt-0.5 transition duration-300 ease-linear will-change-transform xs:px-3 xs:pt-1 sm:px-4 sm:pt-2 md:px-6 md:pt-3 lg:px-8 lg:pt-5 xl:px-10 xl:pt-6 2xl:px-12 2xl:pt-8 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
        >
          <div className="flex justify-between items-center">
            {/* Logo with hyper-responsive sizing */}
            <Link href="/" className="relative z-10 flex-shrink-0">
              <Image
                className="inline-block h-8 w-auto dark:hidden xs:h-10 sm:h-12 md:h-14 lg:h-16 xl:h-[68px] 2xl:h-20 3xl:h-24"
                src={logo}
                alt="logo"
                width={136}
                height={68}
                priority
                sizes="(max-width: 480px) 32px, (max-width: 640px) 40px, (max-width: 768px) 48px, (max-width: 1024px) 56px, (max-width: 1280px) 64px, (max-width: 1536px) 68px, (max-width: 1920px) 80px, 96px"
              />
              <Image
                className="hidden h-8 w-auto dark:inline-block xs:h-10 sm:h-12 md:h-14 lg:h-16 xl:h-[68px] 2xl:h-20 3xl:h-24"
                src={logoDark}
                alt="logo"
                width={136}
                height={68}
                priority
                sizes="(max-width: 480px) 32px, (max-width: 640px) 40px, (max-width: 768px) 48px, (max-width: 1024px) 56px, (max-width: 1280px) 64px, (max-width: 1536px) 68px, (max-width: 1920px) 80px, 96px"
              />
            </Link>

            {/* Menu button with responsive sizing */}
            <div className="flex items-center">
              <button
                ref={openBtnRef}
                onClick={openMenu}
                className="menu-open relative h-8 w-8 cursor-pointer before:absolute before:left-1/2 before:top-[14px] before:h-0.5 before:w-4 before:-translate-x-1/2 before:bg-black before:transition-all before:duration-300 before:content-[''] after:absolute after:bottom-[14px] after:left-1/2 after:h-0.5 after:w-4 after:-translate-x-1/2 after:bg-black after:transition-all after:duration-300 after:content-[''] hover:before:top-[12px] hover:after:bottom-[12px] dark:before:bg-white dark:after:bg-white xs:h-10 xs:w-10 xs:before:top-[18px] xs:before:w-5 xs:after:bottom-[18px] xs:after:w-5 xs:hover:before:top-[16px] xs:hover:after:bottom-[16px] sm:h-12 sm:w-12 sm:before:top-[22px] sm:before:w-6 sm:after:bottom-[22px] sm:after:w-6 sm:hover:before:top-[19px] sm:hover:after:bottom-[19px] md:h-14 md:w-14 md:before:top-[26px] md:before:w-7 md:after:bottom-[26px] md:after:w-7 md:hover:before:top-[23px] md:hover:after:bottom-[23px] lg:h-16 lg:w-16 lg:before:top-[30px] lg:before:w-8 lg:after:bottom-[30px] lg:after:w-8 lg:hover:before:top-[27px] lg:hover:after:bottom-[27px] xl:h-[68px] xl:w-[68px] xl:before:top-[32px] xl:before:w-9 xl:after:bottom-[32px] xl:after:w-9 xl:hover:before:top-[29px] xl:hover:after:bottom-[29px] 2xl:h-20 2xl:w-20 2xl:before:top-[38px] 2xl:before:w-10 2xl:after:bottom-[38px] 2xl:after:w-10 2xl:hover:before:top-[35px] 2xl:hover:after:bottom-[35px] 3xl:h-24 3xl:w-24 3xl:before:top-[46px] 3xl:before:w-12 3xl:after:bottom-[46px] 3xl:after:w-12 3xl:hover:before:top-[42px] 3xl:hover:after:bottom-[42px]"
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
        className="menu fixed inset-0 z-[99999] min-h-screen w-full overflow-y-auto opacity-0 before:absolute before:top-0 before:w-[1px] before:bg-backgroundBody before:bg-opacity-10 before:content-none xs:right-4 sm:right-6 md:right-8 lg:right-10 xl:right-12 2xl:right-16 3xl:right-20 md:before:left-[45%] md:before:h-screen md:before:content-[''] lg:before:left-[38%] lg:before:h-[calc(100vh-87px)] xl:before:left-[42%] xl:before:h-[calc(100vh-94px)] 2xl:before:left-[45%] 2xl:before:h-[calc(100vh-110px)] 3xl:before:left-[48%] 3xl:before:h-[calc(100vh-130px)]"
      >
        {/* Close button with hyper-responsive positioning */}
        <button
          ref={closeBtnRef}
          onClick={closeMenu}
          className="menu-close sticky left-[85%] top-4 h-6 w-6 cursor-pointer text-white xs:left-[88%] xs:top-5 xs:h-7 xs:w-7 sm:left-[90%] sm:top-6 sm:h-8 sm:w-8 md:left-[92%] md:top-8 md:h-9 md:w-9 lg:left-[93.5%] lg:top-10 lg:h-10 lg:w-10 xl:left-[95%] xl:top-12 xl:h-[40px] xl:w-[40px] 2xl:left-[96%] 2xl:top-14 2xl:h-12 2xl:w-12 3xl:left-[97%] 3xl:top-16 3xl:h-14 3xl:w-14"
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
        <div className="menu-wrapper relative z-[99999] mx-auto flex max-h-[90vh] max-w-[250px] flex-col gap-4 overflow-y-auto overflow-x-hidden px-4 pb-4 xs:max-w-[280px] xs:gap-5 xs:px-5 sm:max-w-[350px] sm:gap-6 sm:px-6 md:top-8 md:max-h-none md:max-w-[500px] md:gap-10 md:overflow-visible md:px-8 md:pt-0 lg:max-w-[700px] lg:gap-12 lg:px-10 xl:max-w-[900px] xl:gap-16 xl:px-12 2xl:top-6 2xl:max-w-[1100px] 2xl:gap-20 2xl:px-16 3xl:max-w-[1300px] 3xl:gap-24 3xl:px-20">
          <MenuList ref={menuItemsRef} onItemClick={closeMenu} />
        </div>

        {/* Menu footer with hyper-responsive design */}
        <div className="menu-footer fixed bottom-0 w-full border-t border-white border-opacity-10 px-4 xs:px-5 sm:px-6 md:px-8 lg:block lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 max-lg:hidden">
          <div className="menu-footer-content mx-auto flex max-w-[250px] flex-col justify-between py-4 text-xs xs:max-w-[280px] xs:py-5 xs:text-sm sm:max-w-[350px] sm:py-6 md:max-w-[500px] md:flex-row md:py-7 lg:max-w-[700px] lg:py-8 lg:text-base xl:max-w-[900px] xl:py-9 2xl:max-w-[1100px] 2xl:py-10 2xl:text-lg 3xl:max-w-[1300px] 3xl:py-12 3xl:text-xl">
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
        className="menu-overflow pointer-events-none fixed inset-0 z-[9999] bg-[rgba(10,10,10,0.90)] backdrop-blur-[15px] xs:bg-[rgba(10,10,10,0.92)] xs:backdrop-blur-[18px] sm:bg-[rgba(10,10,10,0.94)] sm:backdrop-blur-[20px] md:bg-[rgba(10,10,10,0.95)] md:backdrop-blur-[25px] lg:backdrop-blur-[30px] xl:backdrop-blur-[35px] 2xl:backdrop-blur-[40px]"
      ></div>
    </>
  );
}