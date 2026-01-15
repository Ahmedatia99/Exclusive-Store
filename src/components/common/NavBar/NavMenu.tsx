import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

type NavMenuProps = {
  className?: string;
  role?: string;
};

function NavMenu({ className }: NavMenuProps) {
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "home" },
    { path: "/Contact", label: "contact" },
    { path: "/About", label: "about" },
    { path: "/SignUp", label: "signup" },
  ];

  return (
    <nav aria-label="Main navigation">
      <ul className={`flex gap-10 ${className}`}>
        {navLinks.map((link) => {
          const active = isActive(link.path);
          return (
            <li key={link.path}>
              <Link
                to={link.path}
                aria-current={active ? "page" : undefined} //  SEO + Accessibility
                className={`link-underline ${
                  active ? "link-underline-active" : ""
                } focus-visible:outline-none focus-visible:ring-2 capitalize  focus-visible:ring-black focus-visible:rounded`}
              >
                {t(link.label)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavMenu;
