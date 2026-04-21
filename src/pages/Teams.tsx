import { Users } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

const Teams = () => (
  <PlaceholderPage
    title="Teams"
    subtitle="People, departments, and roles"
    icon={Users}
    description="Manage team membership, departments, and access permissions. Coming soon."
    primaryActionLabel="Invite Member"
    secondaryActionLabel="Review Roles"
    sampleItems={["Operations", "Technology", "Dispatch", "Finance"]}
  />
);

export default Teams;
