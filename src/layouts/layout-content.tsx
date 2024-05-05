import classNames from "classnames";
import Aside from "./aside";
import Header from "./header";
import React from "react";

interface LayoutContentProps {
  children: React.ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const [closeAside, setCloseAside] = React.useState<boolean>(false);

  const handleCloseAside = React.useCallback(() => {
    setCloseAside((old) => !old);
  }, []);

  return (
    <main className="h-full w-full  bg-all-background bg-cover bg-no-repeat">
      <Header closeAside={handleCloseAside} />
      <section className="flex flex-row px-0 lg:px-4 gap-x-2 fixe d w-screen">
        <section
          className={classNames(
            "w-full transition-all duration-700 ease-in-out z-10 h-screen md:h-100vh-h-7 bg-white mt-24 lg:mt-16 rounded-lg"
          )}
        >
          {children}
        </section>
      </section>
    </main>
  );
}
