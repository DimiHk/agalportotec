import { Edit } from "@/components/components/Columns/Edit";
import { useRouter } from "next/router";

type Props = {
  id: string;
};

export const EditColumn = ({ id }: Props) => {
  const router = useRouter();

  const handleOnEditClick = () => {
    return router.push(`suppliers/${id}`);
  };

  return <Edit handleRedirectPage={handleOnEditClick} />;
};
