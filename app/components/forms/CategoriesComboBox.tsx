"use client";

import * as React from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";

type Category = { id: string; name: string };

interface CategoriesComboBoxProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: Category[];
}

export function CategoriesComboBox({
  value,
  onChange,
  options,
}: CategoriesComboBoxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value.length === 0
            ? "Select categories"
            : options
                .filter((cat) => value.includes(cat.id))
                .map((cat) => cat.name)
                .join(", ")}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search categories..." />
          <CommandList>
            {options.map((cat) => (
              <CommandItem
                key={cat.id}
                onSelect={() => {
                  if (value.includes(cat.id)) {
                    onChange(value.filter((id) => id !== cat.id));
                  } else {
                    onChange([...value, cat.id]);
                  }
                }}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${value.includes(cat.id) ? "opacity-100" : "opacity-0"}`}
                />
                {cat.name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
