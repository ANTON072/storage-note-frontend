import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { StockForm } from "../components/StockForm";
import { stockSchema, type StockFormValues } from "../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const StockFormContainer = ({ isOpen, onClose }: Props) => {
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

  return (
    <>
      <StockForm
        form={form}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={(values: StockFormValues) => {
          console.log("values", values);
        }}
      />
    </>
  );
};
