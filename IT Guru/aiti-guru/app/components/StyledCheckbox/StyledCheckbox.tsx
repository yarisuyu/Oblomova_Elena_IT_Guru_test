function StyledCheckbox({ name, styles="", checked, onChange, children }:
  { name: string, styles?: string, checked: boolean, onChange: () => void, children: React.ReactNode }) {

  return (
    <label className="block relative select-none" htmlFor={name}>
      {children}
      <span className={`absolute mt-0 top-0 left-0 ${styles} ${checked && "bg-blue-800"}`}></span>
      <input className="w-0 h-0" type="checkbox" checked={checked} name={name} id={name} onChange={onChange} />
    </label>
  );
}

export default StyledCheckbox;