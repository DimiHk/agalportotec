import { Edit } from "@/components/components/Columns/Edit";
import { PreviewFile } from "@/features/accounting/components/PreviewFile";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useFiles } from "../providers/fileProvider";

export const EditColumn = ({ data }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setFiles } = useFiles();

  const { data: file, rowIndex } = data;

  const { type } = file;

  const url = URL.createObjectURL(file);

  return (
    <React.Fragment>
      <Edit
        isViewDetails={true}
        handlePreviewDetails={onOpen}
        isRemove={true}
        handleRemove={() => {
          setFiles((prevFiles: any) => {
            const newFiles = [...prevFiles];
            newFiles.splice(rowIndex, 1);
            return newFiles;
          });
        }}
        isEdit={false}
      />
      <PreviewFile
        fileUrl={url}
        type={type}
        isOpen={isOpen}
        onClose={onClose}
      />
    </React.Fragment>
  );
};
