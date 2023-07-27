import { useUser } from "@/domain/users";

import { useStorageForm } from "..";
import { StorageHeading } from "../components/StorageHeading";

import type { StorageResponse } from "../types";

type Props = {
  storage: StorageResponse;
};

export const StorageHeadingContainer = ({ storage }: Props) => {
  const { isOwner } = useUser();

  const { StorageFormDrawer, onDrawerOpen } = useStorageForm();

  return (
    <>
      <StorageHeading
        storage={storage}
        isOwner={isOwner(storage.members)}
        onOpenDrawer={() => {
          onDrawerOpen(storage);
        }}
      />
      <StorageFormDrawer />
    </>
  );
};
