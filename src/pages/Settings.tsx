import { Settings as SettingsIcon } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

const Settings = () => (
  <PlaceholderPage
    title="Settings"
    subtitle="Workspace preferences and configuration"
    icon={SettingsIcon}
    description="Configure organization details, notifications, and integrations. Coming soon."
    primaryActionLabel="Save Preferences"
    secondaryActionLabel="Test Integration"
    sampleItems={["Notifications", "Workspace branding", "User permissions", "Integrations"]}
  />
);

export default Settings;
