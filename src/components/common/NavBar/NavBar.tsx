"use client";

import { motion } from "framer-motion";
import BurgerNavMenu from "./BurgerNavMenu";
import Logo from "./Logo";
import NavActions from "./NavActions";
import NavMenu from "./NavMenu";
import Search_Input from "./Search_Input";
import HeaderWrapper from "./HeaderWrapper";
import { useNavBarLogic } from "./NavBarLogic";

function NavBar() {
  const { navRef } = useNavBarLogic(300);
  return (
    <motion.nav
      ref={navRef}
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 left-0 w-full z-50 border-b border-black bg-white/80 backdrop-blur-md"
    >
      {/* Extra meta or structured data container (for SEO if needed) */}
      <HeaderWrapper />

      <div className="container mx-auto p-3 md:px-3">
        {/* Search input should have a proper label for accessibility */}
        <div className="sm:hidden px-3">
          <label htmlFor="nav-search" className="sr-only">
            Search site content
          </label>
          <Search_Input id="nav-search" className="w-full" />
        </div>

        <div className="flex justify-between py-2 px-3 md:px-0 items-center  ">
          <div className="flex gap-5 items-center">
            {/* Accessible mobile menu toggle */}
            <BurgerNavMenu
              className="lg:hidden"
              aria-label="Toggle navigation menu"
            />

            {/* Ensure logo has accessible name and link to homepage */}

            <Logo />
          </div>

          {/* Navigation menu with ARIA role */}
          <NavMenu
            className="hidden lg:flex"
            role="menubar"
            aria-label="Primary menu"
          />

          {/* Actions (login/cart/profile etc.) */}
          <NavActions />
        </div>
      </div>
    </motion.nav>
  );
}

export default NavBar;
