import { useState } from "react";

import { Button } from "@chakra-ui/react";
import { sendEmailVerification } from "firebase/auth";
import { useMutation } from "react-query";

import type { Auth  } from "firebase/auth";


type Props = {
  auth: Auth;
  onSuccess: () => void;
  onError: () => void;
};

export const useReSendMail = ({ auth, onSuccess, onError }: Props) => {
  const [isShowResendMailButton, setShowResendMailButton] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      if (auth.currentUser === null)
        return Promise.reject(`ユーザーが存在しません`);
      return sendEmailVerification(auth.currentUser);
    },
    onSuccess: () => {
      onSuccess();
      setShowResendMailButton(false);
    },
    onError: (error) => {
      console.error(error);
      onError();
    },
  });

  const ResendMailButton: React.FC = () => {
    if (!isShowResendMailButton) return <></>;

    return (
      <Button
        onClick={() => mutate()}
        isLoading={isLoading}
        loadingText="送信中"
      >
        確認メールを再送信する
      </Button>
    );
  };

  return {
    isShowResendMailButton,
    setShowResendMailButton,
    ResendMailButton,
  };
};
