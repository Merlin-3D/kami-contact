import React from "react";

interface InputAuthProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon: React.ReactNode;
}

export function InputAuth({ icon, ...props }: InputAuthProps) {
  return (
    <div className="mt-2 relative">
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        {...props}
        className="block w-full rounded-lg border-0 h-12 pl-12 pr-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-primary-90 placeholder:font-light text-primary-90 font-light focus:outline-none focus:ring-primary-100 focus-visible: sm:text-sm sm:leading-6"
      />
      {icon}
    </div>
  );
}
