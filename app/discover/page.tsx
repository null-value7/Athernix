// @ts-nocheck
import DiscoverView from "@/components/ui/DiscoverView";
import { discoverSections } from "@/app/scripts/discoverContent";
import "../styles/discover.css";

export default function DescubrePage() {
  return <DiscoverView sections={discoverSections} />;
}
