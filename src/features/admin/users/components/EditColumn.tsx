import { Edit } from "@/components/components/Columns/Edit";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  id: string;
};

export const EditColumn = ({ id }: Props) => {
  const router = useRouter();

  const handleOnEditClick = () => {
    router.push(`users/${id}`);
  };

  return (
    <React.Fragment>
      <Edit handleRedirectPage={handleOnEditClick} />
    </React.Fragment>
  );
};
