import Image from "next/image";
import { ChangeEventHandler } from "react";

const IconInput = ({
  type,
  firstIconSrc,
  secondIconSrc,
  required=false,
  id,
  placeholder,
  className = "",
  value,
  onChange
}: {
    type: string,
    firstIconSrc: string,
    secondIconSrc?: string,
    required?: boolean
    id: string,
    placeholder?: string,
    className?: string,
    value: string,
    onChange: ChangeEventHandler
}) => {
  return (
    <div className="flex flex-row justify-between gap-3.5 px-4 py-3.5 rounded-xl border border-solid border-gray-300 cursor-text">
      <Image src={firstIconSrc} alt="" width={24} height={24}></Image>
      <input
        type={type}
        required
        id={id}
        placeholder={placeholder}
        className={`border-0 focus:outline-0 ${className}`}
        value={value}
        onChange={onChange}
      />

      <Image src={secondIconSrc ?? ''} alt="" width={24} height={24}></Image>
    </div>
  );
};

export default IconInput;