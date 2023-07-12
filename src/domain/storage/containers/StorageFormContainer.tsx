import { useCallback } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { StorageForm } from "../components/StorageForm";
import { storageSchema, type Storage } from "../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const StorageFormContainer = ({ isOpen, onClose }: Props) => {
  const form = useForm<Storage>({
    defaultValues: {
      name: "",
      members: [],
      imageUrl: "",
    },
    resolver: yupResolver(storageSchema),
  });

  const handleSubmit = useCallback((values: Storage) => {
    console.log("values", values);
  }, []);

  return (
    <StorageForm
      form={form}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
