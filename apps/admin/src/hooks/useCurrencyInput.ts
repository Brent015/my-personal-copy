import { useCallback } from "react";

interface UseCurrencyInputOptions {
  defaultValue?: number;
  min?: number;
  max?: number;
  precision?: number;
}

interface UseCurrencyInputResult {
  value: number;
  displayValue: string;
  onChange: (value: number | null) => void;
  formatter: (value: number | undefined) => string;
  parser: (displayValue: string | undefined) => number;
}

const useCurrencyInput = (
  options: UseCurrencyInputOptions = {}
): UseCurrencyInputResult => {
  const {
    defaultValue = 0,
    min = 0,
    max = Number.MAX_SAFE_INTEGER,
    precision = 2,
  } = options;

  const formatter = useCallback(
    (value: number | undefined): string => {
      if (value === undefined) return "";
      return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(value);
    },
    [precision]
  );

  const parser = useCallback(
    (displayValue: string | undefined): number => {
      if (displayValue === undefined) return defaultValue;
      const parsed = parseFloat(displayValue.replace(/[₱\s,]/g, ""));
      if (isNaN(parsed)) return defaultValue;
      return Math.max(min, Math.min(max, Number(parsed.toFixed(precision))));
    },
    [defaultValue, min, max, precision]
  );

  const onChange = useCallback(
    (value: number | null) => {
      if (value === null) return defaultValue;
      return Math.max(min, Math.min(max, Number(value.toFixed(precision))));
    },
    [defaultValue, min, max, precision]
  );

  return {
    value: defaultValue,
    displayValue: formatter(defaultValue),
    onChange,
    formatter,
    parser,
  };
};

export default useCurrencyInput;
