"use client";

import logoDark from "@/public/images/logo/MysticMinds_Dark_Logo.png";
import logo from "@/public/images/logo/MysticMinds_Logo.png";

import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

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

  /** Hide both menu & overlay initially */
  useLayoutEffect(() => {
    if (menuRef.current) menuRef.current.classList.add("hidden");
    if (menuOverflowRef.current) menuOverflowRef.current.classList.add("hidden");
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

      menuRef.current.classList.remove("hidden");
      menuOverflowRef.current.classList.remove("hidden");

      timelineRef.current.timeScale(1).play();
    }
  }, []);

  const closeMenu = useCallback(() => {
    if (timelineRef.current && menuRef.current) {
      isMenuOpenRef.current = false;

      const scrollY = Number.parseInt(document.body.style.top || "0") * -1;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, Math.abs(scrollY));

      timelineRef.current.timeScale(1.3).reverse();

      setTimeout(() => {
        menuRef.current?.classList.add("hidden");
        menuOverflowRef.current?.classList.add("hidden");
      }, 500);
    }
  }, []);

  /** Close menu on route change */
  useEffect(() => {
    if (isMenuOpenRef.current) closeMenu();
  }, [pathname, closeMenu]);

  /** GSAP animation setup */
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
      gsap.set(menuRef.current, { autoAlpha: 0 });
      gsap.set(menuOverflowRef.current, {
        autoAlpha: 0,
        y: -20,
        scale: 0.98,
      });
      gsap.set(menuItemsRef.current, { autoAlpha: 0, y: -10 });
      gsap.set(closeBtnRef.current, { autoAlpha: 0, y: -10 });

      timelineRef.current = gsap.timeline({ paused: true });

      timelineRef.current
        .to(menuOverflowRef.current, { autoAlpha: 1, y: 0, scale: 1 }, 0)
        .to(menuRef.current, { autoAlpha: 1 }, 0)
        .to(
          menuItemsRef.current,
          { autoAlpha: 1, y: 0, stagger: 0.2 },
          0.2
        )
        .to(
          closeBtnRef.current,
          { autoAlpha: 1, y: 0 },
          0.3
        );
    }
  }, []);

  /** Hide navbar on scroll */
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 200) {
        setIsVisible(false);
      } else {
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
        className={`fixed top-0 left-0 z-[9999] w-full transition-transform duration-300 ${
          !isVisible ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <nav className="fixed z-[1000] bg-white/50 backdrop-blur-lg dark:bg-black/50 w-full px-3 pt-2 sm:px-6 sm:pt-4 lg:px-10 lg:pt-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex-shrink-0">
              <Image
                className="inline-block dark:hidden h-12 sm:h-14 md:h-16"
                src={logo}
                alt="logo"
                width={70}
                height={120}
                priority
              />
              <Image
                className="hidden dark:inline-block h-12 sm:h-14 md:h-16"
                src={logoDark}
                alt="logo"
                width={70}
                height={120}
                priority
              />
            </Link>

            {/* Desktop menu */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              <Link href="/" className="text-xl hover:text-blue-500">Home</Link>
              <Link href="/about" className="text-xl hover:text-blue-500">About</Link>

              <div className="relative group">
                <Link href="#" className="text-xl flex items-center gap-1">
                  Services
                </Link>
                <div className="absolute top-full left-0 mt-1 w-60 bg-white dark:bg-gray-800 border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <Link href="/services" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Main Services
                  </Link>
                  <Link href="/data-ai-integration-services" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Data & AI Integration Services
                  </Link>
                </div>
              </div>

              <Link href="/products" className="text-xl hover:text-blue-500">Products</Link>
              <Link href="/projects" className="text-xl hover:text-blue-500">Projects</Link>
              <Link href="/blogs" className="text-xl hover:text-blue-500">Blogs</Link>
              <Link href="/contact" className="text-xl hover:text-blue-500">Contact</Link>
            </div>

            {/* Mobile menu button */}
            <button
              ref={openBtnRef}
              onClick={openMenu}
              className="lg:hidden relative h-[60px] w-[60px]"
            >
              <span className="absolute top-[22px] left-1/2 -translate-x-1/2 bg-black dark:bg-white h-0.5 w-8"></span>
              <span className="absolute bottom-[22px] left-1/2 -translate-x-1/2 bg-black dark:bg-white h-0.5 w-8"></span>
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Menu */}
      <nav
        ref={menuRef}
        className="fixed inset-0 z-[99999] min-h-screen w-full hidden"
      >
        <button
          ref={closeBtnRef}
          onClick={closeMenu}
          className="absolute right-10 top-6 h-10 w-10 text-white"
        >
          ✕
        </button>

        <div className="menu-wrapper mx-auto flex flex-col gap-6 px-6 pt-24 max-w-[600px]">
          <MenuList ref={menuItemsRef} onItemClick={closeMenu} />
        </div>

        <div className="fixed bottom-0 w-full border-t border-white/20 px-10 pb-6">
          <SocialIcons />
        </div>
      </nav>

      {/* Menu Overlay (fixed black bg) */}
      <div
        ref={menuOverflowRef}
        className="hidden fixed inset-0 z-[9999] bg-[rgba(10,10,10,0.9)] backdrop-blur-lg opacity-0"
      />
    </>
  );
}
