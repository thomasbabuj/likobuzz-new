"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

type SortField = "createdAt" | "lastSignInAt" | "firstName";
type SortOrder = "asc" | "desc";

export function UserFilters({
  sortField,
  sortOrder,
  search,
}: {
  sortField: SortField;
  sortOrder: SortOrder;
  search: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    router.push(`/admin/users?${newParams.toString()}`);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          className="pl-8"
          defaultValue={search}
          onChange={(e) => {
            updateSearchParams({
              search: e.target.value,
              page: "1",
            });
          }}
        />
      </div>
      <Select
        defaultValue={sortField}
        onValueChange={(value) => {
          updateSearchParams({ sort: value });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt">Joined Date</SelectItem>
          <SelectItem value="lastSignInAt">Last Sign In</SelectItem>
          <SelectItem value="firstName">Name</SelectItem>
        </SelectContent>
      </Select>
      <Select
        defaultValue={sortOrder}
        onValueChange={(value) => {
          updateSearchParams({ order: value });
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
