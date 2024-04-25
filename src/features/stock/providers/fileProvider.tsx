import React, { useState, createContext, useContext } from "react";

type FileContextType = {
  files: any[];
  setFiles: (prevFiles: any) => any;
};

export const FileContext = createContext<FileContextType | undefined>(
  undefined
);

export default function FileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [files, setFiles] = useState<any>([]);

  return (
    <FileContext.Provider
      value={{
        files,
        setFiles,
      }}
    >
      {children}
    </FileContext.Provider>
  );
}

export const useFiles = () => {
  const context = useContext(FileContext);

  if (context === undefined) {
    throw new Error("you need to use FileProvider arround this component");
  }

  return context;
};
