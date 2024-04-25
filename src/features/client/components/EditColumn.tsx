import { Edit } from "@/components/components/Columns/Edit";
import { useRouter } from "next/router";

type Props = {
  id: string;
  type: string;
};

export const EditColumn = ({ id, type }: Props) => {
  const router = useRouter();

  const handleOnEditClick = () => {
    if (type === "EnterpriseClient")
      return router.push(`clients/${id}?isEnterprise=true`);
    return router.push(`clients/${id}`);
  };

  return <Edit handleRedirectPage={handleOnEditClick} />;
};
