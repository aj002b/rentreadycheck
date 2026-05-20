"use client";

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  helpText?: string;
};

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  helpText,
}: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold text-[#0f1f3a]">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="field-control mt-2 appearance-none bg-[linear-gradient(45deg,transparent_50%,#53657f_50%),linear-gradient(135deg,#53657f_50%,transparent_50%)] bg-[length:6px_6px,6px_6px] bg-[position:calc(100%-18px)_calc(50%-3px),calc(100%-12px)_calc(50%-3px)] bg-no-repeat pr-10"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helpText ? <p className="mt-1.5 text-xs leading-5 text-[#748882]">{helpText}</p> : null}
    </div>
  );
}
