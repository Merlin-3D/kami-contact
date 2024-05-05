export function LogoIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      className="iconify iconify--emojione"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <circle cx="32" cy="32" r="30" fill="currentColor"></circle>
      <path
        d="M20.2 17.5h6v12l11.2-12h7.8L33.3 29.4l12.5 17.1H38l-8.9-12.7l-2.9 3v9.7h-6v-29"
        fill="#ffffff"
      ></path>
    </svg>
  );
}
