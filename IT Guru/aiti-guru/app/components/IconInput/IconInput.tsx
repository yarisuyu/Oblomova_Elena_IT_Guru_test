import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";

interface IconInputProps extends ComponentPropsWithoutRef<'input'> {
  firstIconSrc: string;      // левая иконка (обязательная)
  secondIconSrc?: string;    // правая иконка (опциональная)
}

const IconInput = ({
  firstIconSrc,
  secondIconSrc,
  className = "",
  ...rest
}: IconInputProps) => {
  return (
    <div className="flex flex-row justify-between gap-3.5 px-4 py-3.5 rounded-xl border border-solid border-gray-300 cursor-text">
      <Image src={firstIconSrc} alt="" width={24} height={24}></Image>
      <input
        className={`border-0 focus:outline-0 ${className}`}
        {...rest}
      />

      {secondIconSrc && (
        <Image src={secondIconSrc} alt="" width={24} height={24} />
      )}
    </div>
  );
};

export default IconInput;