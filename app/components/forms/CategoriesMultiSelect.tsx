"use client";

import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

type Category = { id: string; name: string };

interface CategoriesMultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: Category[];
}

export function CategoriesMultiSelect({
  value,
  onChange,
  options,
}: CategoriesMultiSelectProps) {
  useEffect(() => {
    // Ensure value is always an array
    if (!Array.isArray(value)) onChange([]);
  }, [value, onChange]);

  return (
    <div className="flex flex-col gap-2">
      {options.map((cat) => (
        <label key={cat.id} className="flex items-center gap-2">
          <Checkbox
            checked={value.includes(cat.id)}
            onCheckedChange={(checked) => {
              if (checked) {
                onChange([...value, cat.id]);
              } else {
                onChange(value.filter((id) => id !== cat.id));
              }
            }}
          />
          {cat.name}
        </label>
      ))}
    </div>
  );
}
