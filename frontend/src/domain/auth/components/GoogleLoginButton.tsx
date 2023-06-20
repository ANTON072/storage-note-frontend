import { Button, Icon } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

type Props = {
  children: string;
  onClick: () => void;
};

export const GoogleLoginButton = ({ children, onClick }: Props) => {
  return (
    <Button
      leftIcon={<Icon as={FcGoogle} />}
      size={`lg`}
      variant={`outline`}
      width={`100%`}
      colorScheme="blue"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
