import { Link, useLocation } from "react-router-dom";
import { TitleApp } from "../components";
import {
  Burger,
  GroupIcon,
  LogoutIcon,
  PeopleIcon,
  Send2Icon,
} from "../components/icons";
import classNames from "classnames";
import { useAuthContext } from "../core/context/auth-context";

interface HeaderProps {
  closeAside: () => void;
}

const navigations = [
  {
    icon: GroupIcon,
    href: "/dashboard/admin",
    name: "Tableau de bord",
  },
  {
    icon: PeopleIcon,
    href: "/dashboard/contacts",
    name: "Contacts",
  },
  {
    icon: Send2Icon,
    href: "/dashboard/commandes",
    name: "Commandes",
  },
];

export default function Header({ closeAside }: HeaderProps) {
  const location = useLocation();
  const { signOut } = useAuthContext();

  return (
    <header className="text-gray-600 body-font bg-white fixed w-full top-0 z-50">
      <div className="w-full flex flex-wrap px-4 py-2 flex-row justify-between items-center">
        <div className="flex items-center justify-center">
          <Burger
            className="block lg:hidden cursor-pointer"
            onClick={closeAside}
          />
          {/* <Burger
            className="hidden lg:block cursor-pointer"
            onClick={closeAside}
          /> */}
          <Link
            to={"/"}
            className="flex ml-3 title-font justify-center font-medium items-center text-gray-900 mb-0"
          >
            <TitleApp size="lg" />
          </Link>
        </div>
        <div>
          <nav className="flex items-center gap-x-6 list-none">
            {navigations.map((item) => {
              return (
                <a href={item.href}>
                  <li
                    className={classNames(
                      {
                        "text-green-700 bg-green-100 rounded-3xl":
                          location.pathname === item.href,
                      },
                      {
                        "] hover:bg-green-100 hover:rounded-3xl":
                          location.pathname !== item.href,
                      },
                      "hover:text-green-700 group flex items-center gap-2 px-4 py-2"
                    )}
                  >
                    <item.icon />
                    <span
                      className={classNames(
                        { "text-green-700": location.pathname === item.href },
                        "group-hover:text-green-700 "
                      )}
                    >
                      {item.name}
                    </span>
                  </li>
                </a>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center">
          {/* <MessageIcon className="cursor-pointer" />
          <div className="relative cursor-pointer">
            <BellIcon />
            <hr className="absolute bg-red-500 w-1.5 h-1.5 rounded-full right-1 top-1" />
          </div> */}
          {/* Profile dropdown */}
          <div className="flex flex-row gap-x-2">
            {/* <LogoIcon className="h-8 w-8" /> */}
            <span className="text-base font-light font-amaranth ">
              Déconnexion
            </span>
            <LogoutIcon
              className="text-red-400 cursor-pointer"
              onClick={() => signOut()}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
