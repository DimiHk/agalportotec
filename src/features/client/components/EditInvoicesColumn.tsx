import { Edit } from "@/components/components/Columns/Edit";
import { PreviewFile } from "@/features/accounting/components/PreviewFile";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  id: string;
  type: string;
  contentType: string;
  clientId?: string;
  fileUrl: string;
};

export const EditInvoicesColumn = ({
  id,
  type,
  contentType,
  clientId,
  fileUrl,
}: Props) => {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnEditClick = () => {
    if (type === "EnterpriseClient")
      return router.push(
        `/dashboard/accounting/${id}?isEnterprise=true&clientId=${clientId}`
      );
    return router.push(`/dashboard/accounting/${id}?clientId=${clientId}`);
  };

  return (
    <React.Fragment>
      <Edit
        handleRedirectPage={handleOnEditClick}
        isViewDetails={true}
        handlePreviewDetails={onOpen}
      />
      <PreviewFile
        fileUrl={fileUrl}
        type={contentType}
        isOpen={isOpen}
        onClose={onClose}
      />
    </React.Fragment>
  );
};
