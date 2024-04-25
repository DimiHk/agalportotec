import { withDashboardLayout } from "@/components/layout";
import { SupplierOrderDetails } from "@/features/orders/components/SupplierOrderDetails";
import React from "react";

const SupplierOrderDetailsPage = () => {
  return <SupplierOrderDetails />;
};

export default withDashboardLayout(SupplierOrderDetailsPage);
