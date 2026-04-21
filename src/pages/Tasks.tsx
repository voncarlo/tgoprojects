import { CheckSquare } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

const Tasks = () => (
  <PlaceholderPage
    title="Tasks"
    subtitle="All tasks across your operations"
    icon={CheckSquare}
    description="A unified view of every task with filters, assignees, and due dates. Coming soon."
    primaryActionLabel="Add Task"
    secondaryActionLabel="Review Queue"
    sampleItems={["Approve payroll sync", "Validate route imports", "Prepare monthly close", "Update onboarding tracker"]}
  />
);

export default Tasks;
