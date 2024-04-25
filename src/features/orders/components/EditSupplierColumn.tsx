import { Edit } from "@/components/components/Columns/Edit";
import { useRouter } from "next/router";

type Props = {
  id: string;
  supplierId: string;
};

export const EditSupplierColumn = ({ id, supplierId }: Props) => {
  const router = useRouter();

  const handleOnEditClick = () => {
    return router.push(`orders/supplier/${id}?supplierId=${supplierId}`);
  };

  return <Edit handleRedirectPage={handleOnEditClick} />;
};
