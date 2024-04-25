import { EnterpriseInvoiceResponse } from "@/models";
import React, { useState, createContext, useContext } from "react";

type UpdateInvoicesContextType = {
  invoiceDetails: {
    date: string | undefined;
    status: string | undefined;
    sendEmails: boolean | undefined;
    timeFrame: string | undefined;
    dayOfWeek: string | undefined;
    fileUrl: any;
    total: string | undefined;
    fileName: string | undefined;
  };
  handleSetDefaultValues: (data: EnterpriseInvoiceResponse) => void;
  setSendEmails: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setTimeFrame: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDayOfWeek: React.Dispatch<React.SetStateAction<string | undefined>>;
  setFileUrl: React.Dispatch<React.SetStateAction<any>>;
  setTotal: React.Dispatch<React.SetStateAction<string | undefined>>;
  setStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const UpdateInvoicesDetailsContext = createContext<
  UpdateInvoicesContextType | undefined
>(undefined);

export default function UpdateInvoiceDetailsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [date, setDate] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();
  const [sendEmails, setSendEmails] = useState<boolean | undefined>();
  const [timeFrame, setTimeFrame] = useState<string | undefined>();
  const [dayOfWeek, setDayOfWeek] = useState<string | undefined>();
  const [fileUrl, setFileUrl] = useState<any>();
  const [total, setTotal] = useState<string | undefined>();
  const [fileName, setFileName] = useState<string | undefined>();

  const handleSetDefaultValues = (data: EnterpriseInvoiceResponse) => {
    setDate(data.date ? data.date.toString() : undefined);
    setStatus(data.status.toString());
    setSendEmails(data.sendEmails);
    setTimeFrame(data.timeFrame ? data.timeFrame.toString() : undefined);
    setDayOfWeek(data.dayOfWeek ? data.dayOfWeek.toString() : undefined);
    setFileUrl(data.fileUrl);
    setFileName(data.filename);
    setTotal(data.total ? data.total.toString() : undefined);
  };

  return (
    <UpdateInvoicesDetailsContext.Provider
      value={{
        invoiceDetails: {
          date,
          status,
          sendEmails,
          timeFrame,
          dayOfWeek,
          fileUrl,
          total,
          fileName,
        },
        handleSetDefaultValues,
        setSendEmails,
        setTimeFrame,
        setDate,
        setDayOfWeek,
        setFileUrl,
        setTotal,
        setStatus,
      }}
    >
      {children}
    </UpdateInvoicesDetailsContext.Provider>
  );
}

export const useUpdateInvoiceDetails = () => {
  const context = useContext(UpdateInvoicesDetailsContext);

  if (context === undefined) {
    throw new Error(
      "you need to use UpdateInvoiceDetailsProvider arround this component"
    );
  }

  return context;
};
