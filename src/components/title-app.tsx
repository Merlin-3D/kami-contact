import { LogoIcon } from "./icons";

type SizeLogo = "sm" | "lg" | "xl" | "2xl";

interface TitleAppProps {
  size: SizeLogo;
}

const sizeLogo = {
  sm: ["16", "16"],
  lg: ["24", "24"],
  xl: ["32", "32"],
  "2xl": ["44", "44"],
};

export function TitleApp({ size }: TitleAppProps) {
  return (
    <>
      <LogoIcon
        className="text-green-800"
        width={sizeLogo[size][0]}
        height={sizeLogo[size][1]}
      />
      <span className="text-base font-light font-amaranth">ami - Contact</span>
    </>
  );
}
