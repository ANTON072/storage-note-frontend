import { Badge } from "@chakra-ui/react";

import type { CategoryResponse } from "@/domain/category";

type Props = {
  category?: CategoryResponse;
};

export const CategoryBadge = ({ category }: Props) => {
  if (!category) return null;

  if (category.name === "未分類") return null;

  return <Badge>{category.name}</Badge>;
};
