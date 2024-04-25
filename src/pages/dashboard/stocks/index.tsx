import { withDashboardLayout } from "@/components/layout";
import { StockPage } from "@/features/stock/components/StockPage";

const Stock = () => {
  return <StockPage />;
};

export default withDashboardLayout(Stock);
