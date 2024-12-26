// types.ts
export interface Package {
  id: number;
  title: string;
  price: number;
  activities: string[];
}

export interface DateOption {
  date: string;
  label: string;
}

export interface PackageSelectorProps {
  packages: Package[];
  dates: DateOption[];
  selectedDate: string;
  selectedPackageId: number | null;
  onDateChange: (date: string) => void;
  onPackageSelect: (packageId: number | null) => void;
  className?: string;
}
