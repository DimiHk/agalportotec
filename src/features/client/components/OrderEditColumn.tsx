import { Edit } from "@/components/components/Columns/Edit";
import { useRouter } from "next/router";

type Props = {
  id: string;
};

export const OrderEditColumn = ({ id }: Props) => {
  const router = useRouter();

  const { id: clientId, isEnterprise } = router.query;

  const handleOnEditClick = () => {
    if (isEnterprise)
      return router.push(
        `/dashboard/orders/${id}?isEnterprise=true&clientId=${clientId}`
      );
    return router.push(`/dashboard/orders/${id}?clientId=${clientId}`);
  };

  return <Edit handleRedirectPage={handleOnEditClick} />;
};
