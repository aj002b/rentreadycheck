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
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
        {required ? <span className="text-bad"> *</span> : null}
      </label>
      <div className="relative mt-2">
        {prefix ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
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
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [helpText ? `${id}-help` : "", error ? `${id}-error` : ""]
              .filter(Boolean)
              .join(" ") || undefined
          }
          className={`field-control ${
            prefix ? "pl-8" : ""
          } ${error ? "!border-bad" : ""}`}
        />
      </div>
      {helpText ? (
        <p id={`${id}-help`} className="mt-1.5 text-xs leading-5 text-muted">
          {helpText}
        </p>
      ) : null}
      {error ? <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-semibold text-bad">{error}</p> : null}
    </div>
  );
}
