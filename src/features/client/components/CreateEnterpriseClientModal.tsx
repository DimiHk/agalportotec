import { CreateEnterpriseClientForm } from "./CreateEnterpriseClientForm";
import { CreateEnterpriseClientHeader } from "./CreateEnterpriseClientHeader";
import Modal from "@/components/components/Modal/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  mutate?: () => void;
};

export const CreateEnterpriseClientModal = ({
  isOpen,
  onClose,
  mutate,
}: Props) => {
  return (
    <Modal
      size={"2xl"}
      isOpen={isOpen}
      onClose={onClose}
      Header={<CreateEnterpriseClientHeader />}
      Body={<CreateEnterpriseClientForm mutate={mutate} onClose={onClose} />}
    />
  );
};
