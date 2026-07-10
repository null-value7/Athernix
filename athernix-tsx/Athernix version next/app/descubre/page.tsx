// @ts-nocheck
import DiscoverView from "../../components/DiscoverView";
import { discoverSections } from "../../models/discoverContent";
import "./descubre.css";

export default function DescubrePage() {
  return <DiscoverView sections={discoverSections} />;
}
