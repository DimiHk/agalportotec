import { Edit } from "@/components/components/Columns/Edit";
import { useRouter } from "next/router";

type Props = {
  id: string;
  type: string;
  clientId?: string;
};

export const EditColumn = ({ id, type, clientId }: Props) => {
  const router = useRouter();

  const handleOnEditClick = () => {
    if (type === "EnterpriseClient")
      return router.push(`orders/${id}?isEnterprise=true&clientId=${clientId}`);
    return router.push(`orders/${id}?clientId=${clientId}`);
  };

  return <Edit handleRedirectPage={handleOnEditClick} />;
};
