import { Edit } from "@/components/components/Columns/Edit";
import React from "react";
import { useRouter } from "next/router";

export const EditColumnList = ({ data }: any) => {
  const router = useRouter();

  const { data: stock } = data;

  return (
    <React.Fragment>
      <Edit
        isEdit={true}
        handleRedirectPage={() => router.push(`stocks/${stock.id}`)}
      />
    </React.Fragment>
  );
};
