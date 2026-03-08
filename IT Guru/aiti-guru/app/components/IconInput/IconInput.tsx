import Image from "next/image";

const IconInput = ({
  type,
  firstIconSrc,
  secondIconSrc,
  id,
  placeholder,
  className = "",
  ...delegated
}: {
    type: string,
    firstIconSrc: string,
    secondIconSrc?: string,
    id: string,
    placeholder?: string,
    className?: string
}) => {
  return (
    <div className="flex flex-row justify-between gap-3.5 px-4 py-3.5 rounded-xl border border-solid border-gray-300">
      <Image src={firstIconSrc} alt="" width={24} height={24}></Image>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`border-0 ${className}`}
        {...delegated} />

      <Image src={secondIconSrc ?? ''} alt="" width={24} height={24}></Image>
    </div>
  );
};

export default IconInput;