import { FolderKanban } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

const Projects = () => (
  <PlaceholderPage
    title="Projects"
    subtitle="Track and manage all active initiatives"
    icon={FolderKanban}
    description="Browse the full project portfolio, view progress, and assign owners. Coming soon."
  />
);

export default Projects;
