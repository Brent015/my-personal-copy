export interface GuestType {
  id: string;
  title: string;
  description: string;
  count: number;
}

export interface CounterItemProps {
  guest: GuestType;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  minValue?: number;
  maxValue?: number;
  className?: string;
}

export interface GuestCounterProps {
  guests: GuestType[];
  onChange: (guests: GuestType[]) => void;
  className?: string;
  minValue?: number;
  maxValue?: number;
}
