import { StorageForm } from "../components/StorageForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const StorageFormContainer = ({ isOpen, onClose }: Props) => {
  return <StorageForm isOpen={isOpen} onClose={onClose} />;
};
