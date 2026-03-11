import { ComponentPropsWithoutRef } from "react";

interface StyledCheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  /** Имя поля (используется также как id для связи label и input) */
  name: string;
  /** Дополнительные CSS-классы для кастомного индикатора */
  styles?: string;
  /** Содержимое label (обычно текст) */
  children: React.ReactNode;
}

function StyledCheckbox({
  name,
  checked,
  styles = "",
  children,
  ...rest
}: StyledCheckboxProps) {

  return (
    <label className="block relative select-none cursor-pointer" htmlFor={name}>
      {children}
      <span className={`absolute mt-0 top-0 left-0 ${styles} ${checked ? "bg-blue-800" : ""}`}></span>
      <input className="w-0 h-0" type="checkbox" name={name} id={name} {...rest} />
    </label>
  );
}

export default StyledCheckbox;