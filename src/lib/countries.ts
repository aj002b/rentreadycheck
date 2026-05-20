export type CountryCode = "UK" | "US" | "CA" | "AU" | "ROW";
export type RentFrequency = "monthly" | "weekly";

export type CountryConfig = {
  code: CountryCode;
  name: string;
  currencyCode: string;
  currencySymbol: string;
  rentFrequencyLabel: string;
  affordabilityMethod: string;
  applicantThresholds: number[];
  guarantorThreshold: number;
  supportPersonLabel: string;
  note: string;
  disclaimer: string;
};

export const countries: CountryConfig[] = [
  {
    code: "US",
    name: "United States",
    currencyCode: "USD",
    currencySymbol: "$",
    rentFrequencyLabel: "monthly",
    affordabilityMethod: "Monthly income ratio",
    applicantThresholds: [2.5, 3, 3.5],
    guarantorThreshold: 3,
    supportPersonLabel: "co-signer",
    note: "Uses example US-style checks such as 2.5x to 3x monthly rent.",
    disclaimer:
      "Many US landlords use monthly income requirements such as 2.5x to 3x monthly rent.",
  },
];

export const defaultCountryCode: CountryCode = "US";

export function getCountryConfig(countryCode: CountryCode): CountryConfig {
  return (
    countries.find((country) => country.code === countryCode) ?? countries[0]
  );
}
