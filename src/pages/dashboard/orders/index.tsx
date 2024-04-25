import { withDashboardLayout } from "@/components/layout";
import { OrdersPage } from "@/features/orders/components/OrdersPage";

const Orders = () => {
  return <OrdersPage />;
};

export default withDashboardLayout(Orders);
