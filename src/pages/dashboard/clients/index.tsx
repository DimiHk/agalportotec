import { withDashboardLayout } from "@/components/layout";
import { ClientsPage } from "@/features/client/components/ClientsPage";

const Clients = () => {
  return <ClientsPage />;
};

export default withDashboardLayout(Clients);
