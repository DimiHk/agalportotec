import { withDashboardLayout } from "@/components/layout";
import { StockDetails } from "@/features/stock/components/StockDetails";

const StockDetailsPage = () => {
  return <StockDetails />;
};

export default withDashboardLayout(StockDetailsPage);
