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
    },
    resolver: yupResolver(stockSchema),
  });

  const { categoriesQuery } = useCategoriesQuery(storageId);

  const categories = categoriesQuery.data || [];

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
