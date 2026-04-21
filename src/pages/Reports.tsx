import { BarChart3 } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

const Reports = () => (
  <PlaceholderPage
    title="Reports"
    subtitle="Operational analytics and exports"
    icon={BarChart3}
    description="Generate weekly, monthly, and custom reports with downloadable exports. Coming soon."
    primaryActionLabel="Generate Report"
    secondaryActionLabel="Export Snapshot"
    sampleItems={["Weekly Ops Summary", "Monthly Workforce Report", "Dispatch Quality Scorecard", "Attendance Exceptions"]}
  />
);

export default Reports;
