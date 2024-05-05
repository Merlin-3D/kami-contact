import { useLocation } from "react-router-dom";
import {
  GroupIcon,
  PeopleIcon,
  Profile2Icon,
  Send2Icon,
} from "../components/icons";
import classNames from "classnames";

const navigations = [
  {
    icon: GroupIcon,
    href: "/dashboard/admin",
    name: "Dashboard",
  },
  {
    icon: Send2Icon,
    href: "/dashboard/requests",
    name: "Demandes",
  },
  {
    icon: PeopleIcon,
    href: "/dashboard/contacts",
    name: "Contacts",
  },
  // { icon: Profile2Icon, href: "/dashboard/users", name: "Utilisateurs" },
];

interface AsideProps {
  close: boolean;
}

export default function Aside({ close }: AsideProps) {
  const location = useLocation();
  return (
    <aside
      className={classNames(
        { "hidden ": close },
        { "block ": !close },
        "hidden lg:flex transition-all duration-700 ease-in-out lg:w-[18%] xl:w-[12%] h-[500px] fixed bg-white px-2 rounded-lg py-2 left-4 inset-0 my-auto flex-col justify-between top-0 z-20"
      )}
    >
      <div className=" rounded-md grid grid-cols-1 divide-y w-full gap-y-2 h-full relative">
        {navigations.map((item, key) => {
          return (
            <a
              key={key}
              href={item.href}
              className={classNames(
                { "bg-primary-100": location.pathname === item.href },
                "flex flex-col justify-center items-center group hover:bg-primary-100/80 cursor-pointer rounded-md"
              )}
            >
              <item.icon
                className={classNames(
                  { "text-white": location.pathname === item.href },
                  "group-hover:text-white"
                )}
              />
              <span
                className={classNames(
                  { "text-white": location.pathname === item.href },
                  "group-hover:text-white"
                )}
              >
                {item.name}
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
