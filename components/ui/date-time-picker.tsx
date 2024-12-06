"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Function to generate dynamic available dates
const generateAvailableDates = (startDate: Date, days: number) => {
  const dates = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
};

function DatePickerDemo({
  setDate,
  date,
}: {
  setDate: (date: Date) => void;
  date: Date | undefined;
}) {
  const availableDates = React.useMemo(
    () => generateAvailableDates(new Date(), 10),
    []
  );

  const handleDateChange = (value: string) => {
    const newDate = new Date(value);
    setDate(newDate);
  };

  return (
    <Select
      onValueChange={handleDateChange}
      value={date ? date.toISOString() : undefined}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select date">
          {date && format(date, "MMMM d, yyyy")}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {availableDates.map((d) => (
          <SelectItem key={d.toISOString()} value={d.toISOString()}>
            {format(d, "MMMM d, yyyy")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function DateTimePicker({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) {
  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "MMMM d, yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <DatePickerDemo setDate={handleDateChange} date={date} />
      </PopoverContent>
    </Popover>
  );
}
