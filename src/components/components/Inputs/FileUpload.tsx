import { Text, Box } from "@chakra-ui/react";
import { faFile, faXmark } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const FileUpload = (props: any) => {
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
    props.setValue("file", event.target.files[0]);
  };

  return (
    <Box padding={2.5} borderWidth="1px" borderRadius="md">
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-input"
        {...props}
      />
      <label htmlFor="file-input">
        {selectedFile ? (
          <ChoseFileText
            setValue={props.setValue}
            setSelectedFile={setSelectedFile}
            name={selectedFile.name}
            hasFile={true}
          />
        ) : (
          <ChoseFileText name="ESCOLHER FICHERIO" hasFile={false} />
        )}
      </label>
    </Box>
  );
};

const ChoseFileText = ({
  name,
  hasFile,
  setValue,
  setSelectedFile,
}: {
  name: string;
  hasFile: boolean;
  setValue?: any;
  setSelectedFile?: any;
}) => {
  const handleRemoveFile = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedFile(null);
    setValue("file", null);
  };

  return (
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
      {name}
      {!hasFile && (
        <FontAwesomeIcon
          style={{ marginLeft: "0.275rem" }}
          color={"gray"}
          icon={faFile}
        />
      )}
      {hasFile && (
        <FontAwesomeIcon
          onClick={(e: any) => handleRemoveFile(e)}
          style={{ marginLeft: "0.275rem" }}
          color={"red"}
          icon={faXmark}
        />
      )}
    </Text>
  );
};
