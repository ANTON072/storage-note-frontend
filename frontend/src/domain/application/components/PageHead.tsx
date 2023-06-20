import { useMemo } from "react";

import { Helmet } from "react-helmet-async";

import { APP_NAME } from "..";

type Props = {
  title: string | string[];
};

export const PageHead = ({ title }: Props) => {
  const pageTitle = useMemo(() => {
    if (Array.isArray(title)) {
      return title.join(" | ");
    }
    return title;
  }, [title]);

  return (
    <Helmet>
      <title>{`${pageTitle} | ${APP_NAME}`}</title>
    </Helmet>
  );
};
