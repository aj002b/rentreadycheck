"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SelectField } from "@/components/SelectField";
import {
  countries,
  type CountryCode,
  type CountryConfig,
} from "@/lib/countries";

type CountrySelectorProps = {
  country: CountryConfig;
  onChange: (countryCode: CountryCode) => void;
};

export function CountrySelector({ country, onChange }: CountrySelectorProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="md:col-span-2">
      <SelectField
        id="country"
        label="Apartment location"
        value={country.code}
        onChange={(value) => onChange(value as CountryCode)}
        options={countries.map((option) => ({
          label: option.name,
          value: option.code,
        }))}
      />
      <div className="mt-2 min-h-[3.25rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={country.code}
            className="rounded-lg border border-[#d8e5f7] bg-[#f8fbff] px-3 py-2 text-sm leading-6 text-[#53657f]"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {country.note}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
