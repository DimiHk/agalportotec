import Modal from "@/components/components/Modal/Modal";
import React from "react";
import FormProvider from "@/providers/multiFormProvider";
import StepsProvider, { useFormSteps } from "@/providers/formStepsProvider";
import SelectedUserProvider from "../providers/userInfoProvider";
import OrderPartsProvider from "../providers/orderPartsProvider";
import { OrderEmailSettingsForm } from "./OrderEmailSettingsForm";
import PaymentTypeProvider, { usePayment } from "../providers/paymentProvider";
import ShipmentProvider from "../providers/shipmentProvider";
import EmailSettingsProvider from "../providers/emailSettingsProvider";
import { OrderPaymentForm } from "./OrderPaymentForm";
import { OrderShipmentForm } from "./OrderShipmentForm";
import { OrderProductsForm } from "./OrderProductsForm";
import EnterpriseClientDetailsForm from "./EnterpriseClientDetailsForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateEnterpriseClientOrder = ({ isOpen, onClose }: Props) => {
  return (
    <FormProvider>
      <StepsProvider>
        <SelectedUserProvider>
          <OrderPartsProvider>
            <PaymentTypeProvider>
              <ShipmentProvider>
                <EmailSettingsProvider>
                  <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
                    <CreateClientOrderForms onClose={onClose} />
                  </Modal>
                </EmailSettingsProvider>
              </ShipmentProvider>
            </PaymentTypeProvider>
          </OrderPartsProvider>
        </SelectedUserProvider>
      </StepsProvider>
    </FormProvider>
  );
};

const CreateClientOrderForms = ({ onClose }: { onClose: () => void }) => {
  const { currentFormIndex } = useFormSteps();
  const { shipmentMethod } = usePayment();

  return (
    <React.Fragment>
      {currentFormIndex === 1 && (
        <EnterpriseClientDetailsForm handleCloseModal={onClose} />
      )}
      {currentFormIndex === 2 && <OrderProductsForm />}
      {currentFormIndex === 3 && <OrderPaymentForm />}
      {currentFormIndex === 4 && shipmentMethod !== "1" && (
        <OrderShipmentForm />
      )}
      {currentFormIndex === 5 && (
        <OrderEmailSettingsForm
          userType="enterprise"
          handleCloseModal={onClose}
        />
      )}
    </React.Fragment>
  );
};
