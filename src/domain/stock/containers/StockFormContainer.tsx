import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useCategoriesQuery } from "@/domain/category";

import { StockForm } from "../components/StockForm";
import { stockSchema, type StockFormValues } from "../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  storageId: string;
};

export const StockFormContainer = ({ isOpen, onClose, storageId }: Props) => {
  const { categoriesQuery } = useCategoriesQuery(storageId);

  const categories = categoriesQuery.data || [];

  const defaultCategory = categories.find(
    (category) => category.name === "未分類"
  );

  const form = useForm<StockFormValues>({
    defaultValues: {
      name: "",
      description: "",
      purchaseLocation: "",
      imageUrl: "",
      price: "",
      itemCount: 0,
      unitName: "個",
      alertThreshold: 1,
      category: defaultCategory?.id,
    },
    resolver: yupResolver(stockSchema),
  });

  return (
    <>
      <StockForm
        form={form}
        isOpen={isOpen}
        onClose={onClose}
        categories={categories}
        onSubmit={(values: StockFormValues) => {
          console.log("values", values);
        }}
      />
    </>
  );
};
