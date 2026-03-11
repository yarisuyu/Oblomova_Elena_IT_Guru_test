import { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  primary?: boolean;
  styles?: string;
}

function Button({ primary=false, type="button", styles, onClick, children, ...rest }: ButtonProps
) {
  const commonStyles = "font-semibold cursor-pointer";
  const primaryStyles = "bg-blue-700 border-blue-600 border-solid border text-white hover:bg-blue-600";
  const secondaryStyles = "border border-solid border-[#ECECEC] text-gray-500 hover:border-gray-600";

  return (
    <button
      type={type}
      className={`${commonStyles} ${primary ? primaryStyles : secondaryStyles} ${styles}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;