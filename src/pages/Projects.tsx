import { FolderKanban } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

const Projects = () => (
  <PlaceholderPage
    title="Projects"
    subtitle="Track and manage all active initiatives"
    icon={FolderKanban}
    description="Browse the full project portfolio, view progress, and assign owners. Coming soon."
    primaryActionLabel="Create Project"
    secondaryActionLabel="Preview Roadmap"
    sampleItems={["Operations Overhaul", "Tech Infrastructure", "Client Portal Redesign", "Compliance Audit"]}
  />
);

export default Projects;
