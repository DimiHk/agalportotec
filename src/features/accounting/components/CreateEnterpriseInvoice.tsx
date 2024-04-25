import Modal from "@/components/components/Modal/Modal";
import { useFormSteps } from "@/providers";
import { CreateInvoiceDetails } from "./CreateInvoiceDetails";
import StepsProvider from "@/providers/formStepsProvider";
import React from "react";
import { EnterpriseClientDetails } from "./EnterpriseClientDetails";
import SelectedUserProvider from "@/features/orders/providers/userInfoProvider";
import FileProvider from "@/features/stock/providers/fileProvider";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateEnterpriseInvoice = ({ isOpen, onClose }: Props) => {
  return (
    <StepsProvider>
      <SelectedUserProvider>
        <FileProvider>
          <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
            <CreateInvoice onClose={onClose} />
          </Modal>
        </FileProvider>
      </SelectedUserProvider>
    </StepsProvider>
  );
};

const CreateInvoice = ({ onClose }: { onClose: () => void }) => {
  const { currentFormIndex } = useFormSteps();

  return (
    <React.Fragment>
      {currentFormIndex === 1 && <EnterpriseClientDetails onClose={onClose} />}
      {currentFormIndex === 2 && (
        <CreateInvoiceDetails isEnterprise={true} onClose={onClose} />
      )}
    </React.Fragment>
  );
};
