import classNames from "classnames";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  className?: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className={classNames(className)}>
      <label
        htmlFor="email"
        className="block text-sm font-semibold leading-6 text-primary-80"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type={props.type}
          name={props.name}
          id={props.id}
          {...props}
          className="block w-full rounded-lg border-0 h-12 p-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-primary-90 placeholder:font-light focus:ring-2 text-primary-80 font-normal focus:outline-none focus:ring-primary-100 focus-visible: sm:text-sm sm:leading-6"
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
}
