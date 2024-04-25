import { InputGroup, Text } from "@chakra-ui/react";
import { faFile } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useRef, useState } from "react";

type FileUploadProps = {
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
  setSelectedFiles?: (prevFiles: any) => any;
  handleGetFiles?: (files: any) => any;
};

export const FileUploadVariant = (props: FileUploadProps) => {
  const [files, setFiles] = useState<any>();

  const { accept, multiple, children, setSelectedFiles, handleGetFiles } =
    props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && setSelectedFiles) {
      setSelectedFiles((oldImages: any) => {
        const newImages = Array.from(files);
        return [...oldImages, ...newImages];
      });
    }

    if (handleGetFiles && files) {
      setFiles(files);
      return handleGetFiles(files);
    }
  };

  return (
    <InputGroup onClick={handleClick}>
      <input
        type={"file"}
        multiple={multiple || false}
        hidden
        accept={accept}
        ref={inputRef}
        onChange={handleFileChange}
      />
      {children ? (
        <>{children}</>
      ) : (
        <Text
          width={"full"}
          height={"full"}
          backgroundColor={"gray.100"}
          padding={2}
          borderRadius={"base"}
          textAlign={"center"}
          cursor={"pointer"}
          fontSize={"small"}
          fontWeight={"semibold"}
        >
          {files ? `${files.length} FICHEIRO(S) SELECIONADO` : undefined}
          {files && <br />}
          {files ? "TROCAR FICHEIRO(S)" : "ESCOLHER FICHEIRO(S)"}
          <FontAwesomeIcon
            style={{ marginLeft: "0.275rem" }}
            color={"gray"}
            icon={faFile}
          />
        </Text>
      )}
    </InputGroup>
  );
};
