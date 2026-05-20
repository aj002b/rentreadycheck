"use client";

type InputFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  helpText?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  type?: "number" | "text";
};

export function InputField({
  id,
  label,
  value,
  onChange,
  prefix,
  helpText,
  required,
  error,
  placeholder,
  type = "number",
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold text-[#0f1f3a]">
        {label}
        {required ? <span className="text-[#b84735]"> *</span> : null}
      </label>
      <div className="relative mt-2">
        {prefix ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#53657f]">
            {prefix}
          </span>
        ) : null}
        <input
          id={id}
          type={type}
          min={type === "number" ? "0" : undefined}
          inputMode={type === "number" ? "decimal" : undefined}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-describedby={helpText ? `${id}-help` : undefined}
          className={`field-control ${
            prefix ? "pl-8" : ""
          } ${error ? "!border-[#b84735] !ring-[#f1c0b6]" : ""}`}
        />
      </div>
      {helpText ? (
        <p id={`${id}-help`} className="mt-1.5 text-xs leading-5 text-[#748882]">
          {helpText}
        </p>
      ) : null}
      {error ? <p className="mt-1.5 text-xs font-semibold text-[#b84735]">{error}</p> : null}
    </div>
  );
}
