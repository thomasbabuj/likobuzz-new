"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface TableFiltersProps {
  searchPlaceholder: string;
  sortOptions: { value: string; label: string }[];
  defaultSortField: string;
  defaultSortOrder: string;
}

export function TableFilters({
  searchPlaceholder,
  sortOptions,
  defaultSortField,
  defaultSortOrder,
}: TableFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (params: Record<string, string | number>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value.toString());
        } else {
          newParams.delete(key);
        }
      });
      return newParams.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          className="pl-8"
          defaultValue={searchParams.get("search") || ""}
          onChange={(e) => {
            router.push(
              `?${createQueryString({
                search: e.target.value,
                page: 1,
              })}`
            );
          }}
        />
      </div>
      <Select
        defaultValue={searchParams.get("sort") || defaultSortField}
        onValueChange={(value) => {
          router.push(
            `?${createQueryString({
              sort: value,
              page: 1,
            })}`
          );
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        defaultValue={searchParams.get("order") || defaultSortOrder}
        onValueChange={(value) => {
          router.push(
            `?${createQueryString({
              order: value,
              page: 1,
            })}`
          );
        }}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">Descending</SelectItem>
          <SelectItem value="asc">Ascending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
