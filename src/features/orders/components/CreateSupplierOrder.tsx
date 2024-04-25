import Modal from "@/components/components/Modal/Modal";
import React from "react";
import FormProvider from "@/providers/multiFormProvider";
import StepsProvider, { useFormSteps } from "@/providers/formStepsProvider";
import SupplierDetailsForm from "./SupplierDetailsForm";
import { SupplierOrderProductsForm } from "./SupplierOrderProductsForm";
import SupplierPartsProvider from "../providers/supplierPartsProvider";
import { SupplierSettingsForm } from "./SupplierSettingsForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateSupplierOrder = ({ isOpen, onClose }: Props) => {
  return (
    <FormProvider>
      <StepsProvider>
        <SupplierPartsProvider>
          <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
            <CreateClientOrderForms onClose={onClose} />
          </Modal>
        </SupplierPartsProvider>
      </StepsProvider>
    </FormProvider>
  );
};

const CreateClientOrderForms = ({ onClose }: { onClose: () => void }) => {
  const { currentFormIndex } = useFormSteps();

  return (
    <React.Fragment>
      {currentFormIndex === 1 && (
        <SupplierDetailsForm handleCloseModal={onClose} />
      )}
      {currentFormIndex === 2 && <SupplierOrderProductsForm />}
      {currentFormIndex === 3 && (
        <SupplierSettingsForm handleCloseModal={onClose} />
      )}
    </React.Fragment>
  );
};
