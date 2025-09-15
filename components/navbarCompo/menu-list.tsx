"use client";

import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, useEffect, useRef, useState } from "react";

interface MenuItemProps {
  title: string;
  url: string;
  items?: { title: string; url: string; isActive?: boolean }[];
  isActive?: boolean;
}

const menuItems: MenuItemProps[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Services",
    url: "#",
    items: [
      { title: "Main Services", url: "/services" },
      {
        title: "Data & AI Integration Services",
        url: "/data-ai-integration-services",
      },
    ],
  },
  {
    title: "Blog",
    url: "/blogs",
  },
  {
    title: "Products",
    url: "/products",
  },
  {
    title: "Projects",
    url: "/projects",
  },
  {
    title: "Contact Us",
    url: "/contact",
  },
];

interface MenuListProps {
  onItemClick?: () => void;
}

export const MenuList = forwardRef<HTMLUListElement, MenuListProps>(
  (props, ref) => {
    const { onItemClick } = props;
    const pathname = usePathname();
    const [activeItems, setActiveItems] = useState<string[]>([]);
    const [initialLoad, setInitialLoad] = useState(true);
    const dropdownRefsMap = useRef(new Map<string, HTMLUListElement | null>());

    //  initial active item current path
    useEffect(() => {
      let foundParent = false;

      menuItems.forEach((item) => {
        if (item.items) {
          const activeSubItem = item.items.find(
            (subItem) =>
              pathname === subItem.url || pathname.startsWith(subItem.url + "/")
          );

          if (activeSubItem) {
            setActiveItems([item.title]);
            foundParent = true;
          }
        }
      });

      if (!foundParent) {
        const topLevelMatch = menuItems.find(
          (item) =>
            pathname === item.url ||
            (item.url !== "#" && pathname.startsWith(item.url + "/"))
        );

        if (topLevelMatch) {
          setActiveItems([topLevelMatch.title]);
        }
      }

      if (pathname === "/") {
        setActiveItems(["Home"]);
      }

      setInitialLoad(false);
    }, [pathname]);

    useEffect(() => {
      if (initialLoad && pathname === "/") {
        setActiveItems(["Home"]);

        setTimeout(() => {
          const homeDropdown = dropdownRefsMap.current.get("Home");
          if (homeDropdown) {
            gsap.set(homeDropdown, { display: "block", autoAlpha: 1, x: 0 });
          }
        }, 100);
      }
    }, [initialLoad, pathname]);

    // Handle dropdown animations
    useEffect(() => {
      menuItems.forEach((item) => {
        const dropdownRef = dropdownRefsMap.current.get(item.title);
        if (dropdownRef) {
          if (activeItems.includes(item.title)) {
            // Show dropdown
            gsap.set(dropdownRef, { display: "block", autoAlpha: 0, x: 10 });
            gsap.to(dropdownRef, {
              autoAlpha: 1,
              x: 0,
              duration: 0.2,
              ease: "power3.in",
              stagger: {
                amount: 0.1,
                ease: "back.out(1.7)",
              },
            });
          } else {
            // Hide dropdown
            gsap.to(dropdownRef, {
              autoAlpha: 0,
              x: 10,
              duration: 0.1,
              ease: "power3.out",
              onComplete: () => {
                gsap.set(dropdownRef, {});
              },
            });
          }
        }
      });
    }, [activeItems]);

    const handleDropdownClick = (title: string) => {
      if (window.innerWidth > 368) {
        setActiveItems((prev) => (prev.includes(title) ? [] : [title]));
      } else {
        setActiveItems((prev) =>
          prev.includes(title)
            ? prev.filter((item) => item !== title)
            : [...prev, title]
        );
      }
    };

    const handleMenuItemClick = (e: React.MouseEvent, item: MenuItemProps) => {
      // If the item has no dropdown items and has a valid URL, navigate to it
      if (!item.items && item.url !== "#") {
        // Let the Link component handle navigation
        onItemClick && onItemClick();
        return;
      }

      // Otherwise, prevent default and handle dropdown
      e.preventDefault();
      handleDropdownClick(item.title);
    };

    const setDropdownRef = (el: HTMLUListElement | null, title: string) => {
      if (el) {
        dropdownRefsMap.current.set(title, el);

        // If this is the Home dropdown and we're on the homepage, make it visible immediately
        if (title === "Home" && pathname === "/" && initialLoad) {
          gsap.set(el, { display: "block", autoAlpha: 1, x: 0 });
        }
      }
    };

    const isLinkActive = (url: string) => {
      return pathname === url || pathname.startsWith(url + "/");
    };

    return (
      <ul ref={ref} className="menu-list">
        {menuItems.map((item) => (
          <li
            key={item.title}
            className={`menu-list-item menu-list-item-anchor ${activeItems.includes(item.title) ? "active" : ""}`}
          >
            {/* Use Link for items without dropdown items, anchor for items with dropdowns */}
            {!item.items && item.url !== "#" ? (
              <Link
                href={item.url}
                onClick={(e) => handleMenuItemClick(e, item)}
                className="menu-list-item-text text-white
                  text-[18px] leading-[40px] 
                  xs:text-[20px] xs:leading-[45px]
                  sm:text-[24px] sm:leading-[50px] 
                  md:text-[28px] md:leading-[55px]
                  lg:text-[32px] lg:leading-[60px]
                  xl:text-[36px] xl:leading-[65px]
                  2xl:text-[42px] 2xl:leading-[75px]
                  3xl:text-[48px] 3xl:leading-[85px]
                  4xl:text-[56px] 4xl:leading-[90px]"
              >
                {item.title}
              </Link>
            ) : (
              <a
                href={item.url}
                onClick={(e) => handleMenuItemClick(e, item)}
                className="menu-list-item-text text-white cursor-pointer
                  text-[18px] leading-[40px] 
                  xs:text-[20px] xs:leading-[45px]
                  sm:text-[24px] sm:leading-[50px] 
                  md:text-[28px] md:leading-[55px]
                  lg:text-[32px] lg:leading-[60px]
                  xl:text-[36px] xl:leading-[65px]
                  2xl:text-[42px] 2xl:leading-[75px]
                  3xl:text-[48px] 3xl:leading-[85px]
                  4xl:text-[56px] 4xl:leading-[90px]"
              >
                {item.title}
              </a>
            )}

            {item.items && (
              <ul
                ref={(el) => setDropdownRef(el, item.title)}
                className={`menu-list-item-dropdown relative left-0 h-fit max-h-[60vh] w-full gap-x-4 overflow-y-auto 
                  md:absolute md:left-[48%] md:max-h-none md:w-[280px] md:overflow-visible md:pb-0 
                  lg:left-[35%] lg:w-[480px] 
                  xl:left-[40%] xl:w-[520px]
                  2xl:left-[42%] 2xl:w-[580px]
                  3xl:left-[44%] 3xl:w-[650px]
                  ${item.title === "Home" ? "!grid !grid-cols-1 lg:-mt-[50px] lg:!grid-cols-2 xl:-mt-[60px] 2xl:-mt-[70px]" : "!grid !grid-cols-1 lg:top-3 xl:top-4 2xl:top-5"} 
                  ${activeItems.includes(item.title) || (item.title === "Home" && pathname === "/" && initialLoad) ? "block" : "hidden"}`}
              >
                {item.items.map((subItem) => (
                  <li key={subItem.title}>
                    <Link
                      href={subItem.url}
                      onClick={() => {
                        onItemClick && onItemClick();
                      }}
                      className={`menu-list-item-dropdown-list inline-block pb-1 pl-3 text-white
                        text-[18px] leading-[40px]
                        xs:text-[20px] xs:leading-[42px]
                        sm:text-[22px] sm:leading-[44px]
                        md:text-[24px] md:leading-[46px]
                        lg:text-[26px] lg:leading-[48px]
                        xl:text-[28px] xl:leading-[52px]
                        2xl:text-[30px] 2xl:leading-[56px]
                        3xl:text-[32px] 3xl:leading-[60px]
                        4xl:text-[36px] 4xl:leading-[64px]
                        ${isLinkActive(subItem.url) ? "active" : ""}`}
                    >
                      {subItem.title.includes("-") ? (
                        <>
                          {subItem.title.split("-")[0]}-
                          <i className="font-instrument italic text-inherit">
                            {subItem.title.split("-")[1]}
                          </i>
                        </>
                      ) : (
                        subItem.title
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  }
);

MenuList.displayName = "MenuList";