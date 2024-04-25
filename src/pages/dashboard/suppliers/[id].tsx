import { withDashboardLayout } from "@/components/layout";
import { SuppliersDetailsPage } from "@/features/suppliers/components/SuppliersDetailPage";
import React from "react";

const SuppliersDetails = () => {
  return <SuppliersDetailsPage />;
};

export default withDashboardLayout(SuppliersDetails);
