import Modal from "@/components/components/Modal/Modal";
import { CreatePrivateClientForm } from "./CreatePrivateClientForm";
import { CreatePrivateClientHeader } from "./CreatePrivateClientHeader";
import { OrderPrivateClients } from "@/models";
import { KeyedMutator } from "swr";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  mutate?: KeyedMutator<OrderPrivateClients[]>;
  setPrivateClientsStated?: React.Dispatch<any>;
};

export const CreatePrivateClientModal = ({
  isOpen,
  onClose,
  mutate,
  setPrivateClientsStated,
}: Props) => {
  return (
    <Modal
      size={"2xl"}
      isOpen={isOpen}
      onClose={onClose}
      Header={<CreatePrivateClientHeader />}
      Body={
        <CreatePrivateClientForm
          mutate={mutate}
          onClose={onClose}
          setPrivateClientsStated={setPrivateClientsStated}
        />
      }
    />
  );
};
