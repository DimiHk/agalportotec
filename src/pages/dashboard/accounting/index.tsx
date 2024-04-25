import { withDashboardLayout } from "@/components/layout";
import { InvoicesPage } from "@/features/accounting/components/InvoicesPage";

const Invoices = () => {
  return <InvoicesPage />;
};

export default withDashboardLayout(Invoices);
