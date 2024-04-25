import Modal from "@/components/components/Modal/Modal";
import React from "react";
import FormProvider from "@/providers/multiFormProvider";
import StepsProvider, { useFormSteps } from "@/providers/formStepsProvider";
import { CreateStockModal } from "./CreateStockModal";
import { StockFilesModal } from "./StockFilesModal";
import FileProvider from "../providers/fileProvider";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateStock = ({ isOpen, onClose }: Props) => {
  return (
    <FormProvider>
      <StepsProvider>
        <FileProvider>
          <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
            <MainContainer onClose={onClose} />
          </Modal>
        </FileProvider>
      </StepsProvider>
    </FormProvider>
  );
};

const MainContainer = ({ onClose }: { onClose: () => void }) => {
  const { currentFormIndex } = useFormSteps();

  return (
    <React.Fragment>
      {currentFormIndex === 1 && (
        <CreateStockModal handleCloseModal={onClose} />
      )}
      {currentFormIndex === 2 && <StockFilesModal handleCloseModal={onClose} />}
    </React.Fragment>
  );
};
