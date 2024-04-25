import { Edit } from "@/components/components/Columns/Edit";
import { PreviewFile } from "@/features/accounting/components/PreviewFile";
import { useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";
import { useFiles } from "../providers/fileProvider";
import { stockService } from "@/services";
import { useRouter } from "next/router";

export const EditColumnDetails = ({ data }: any) => {
  const toast = useToast();

  const router = useRouter();

  const { id: stockId } = router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setFiles } = useFiles();

  const { data: file, rowIndex } = data;

  const newUri = file.uri ? file.uri : URL.createObjectURL(file);

  const handleRemoveFile = async () => {
    if (file.isNew) {
      setFiles((prevFiles: any) => {
        const newFiles = [...prevFiles];
        newFiles.splice(rowIndex, 1);
        return newFiles;
      });
    } else {
      await stockService
        .handleRemoveAttachment(stockId as string, file.id)
        .then(() => {
          toast({
            title: "SUCESSO",
            description: "FICHEIRO REMOVIDO COM SUCESSO",
            status: "success",
          });
          setFiles((prevFiles: any) => {
            const newFiles = [...prevFiles];
            newFiles.splice(rowIndex, 1);
            return newFiles;
          });
        });
    }
  };

  return (
    <React.Fragment>
      <Edit
        isViewDetails={true}
        handlePreviewDetails={onOpen}
        isRemove={true}
        handleRemove={() => handleRemoveFile()}
        isEdit={false}
      />
      <PreviewFile
        type={file.isNew ? file.type : file.contentType}
        fileUrl={newUri}
        isOpen={isOpen}
        onClose={onClose}
        heading="FICHEIRO ANEXADO AO ARTIGO"
      />
    </React.Fragment>
  );
};
