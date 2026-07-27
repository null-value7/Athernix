import DiscoverView from "@/components/DiscoverView";
import { discoverSections } from "@/models/discoverContent";
import "./discover.css";

export default function DiscoverPage() {
  return <DiscoverView sections={discoverSections} />;
}
