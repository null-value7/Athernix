// @ts-nocheck
import InfoView from "../../components/InfoView";
import { infoCharacters, poseItems, previewItems, priceFeatures } from "../../models/infoContent";
import "./info.css";

export default function InfoPage() {
  return (
    <InfoView
      characters={infoCharacters}
      poseItems={poseItems}
      previewItems={previewItems}
      priceFeatures={priceFeatures}
    />
  );
}
