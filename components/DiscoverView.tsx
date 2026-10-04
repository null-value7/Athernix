import type { CSSProperties } from "react";
import DiscoverThreeScene from "./DiscoverThreeScene";
import DiscoverCard from "./DiscoverCard";
import { protectBrands } from '@/components/ui/ProtectedText';

interface TextPart {
  text: string;
  className: string;
}

interface Section {
  className: string;
  align: string;
  title: string;
  text?: string;
  textParts?: (string | TextPart)[];
  glitch?: boolean;
  indicator?: boolean;
}

interface DiscoverViewProps {
  sections: Section[];
}

function splitTitle(title: string) {
  return (
    <span className="notranslate discover-title" translate="no">
      {title.split("").map((ch, i) => (
        <span key={i} className="discover-char" style={{ ["--ci" as string]: i } as CSSProperties}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

function renderText(section: Section) {
  if (!section.text && !section.textParts) return null;
  if (!section.textParts) return <p>{protectBrands(section.text)}</p>;

  return (
    <p>
      {section.textParts.map((part, index) =>
        typeof part === "string" ? (
          part
        ) : (
          <span className={part.className} key={`${part.text}-${index}`}>
            {protectBrands(part.text)}
          </span>
        )
      )}
    </p>
  );
}

export default function DiscoverView({ sections }: DiscoverViewProps) {
  return (
    <div className="discover-page">
      <DiscoverThreeScene />
      <div className="discover-content-wrapper">
        {sections.map((section) => (
          <section className={`discover-section ${section.className}`} key={section.title}>
            <DiscoverCard align={section.align}>
              <span className="discover-kicker" aria-hidden="true">
                {String(sections.indexOf(section) + 1).padStart(2, "0")}
              </span>
              {section.glitch ? (
                <h1 className="glitch" data-text={section.title}>
                  {splitTitle(section.title)}
                </h1>
              ) : (
                <h2>{splitTitle(section.title)}</h2>
              )}
              {renderText(section)}
              {section.indicator && (
                <div className="discover-scroll-indicator">
                  <span>Desliza hacia abajo</span>
                  <div className="discover-arrow" aria-hidden="true">
                    ↓
                  </div>
                </div>
              )}
            </DiscoverCard>
          </section>
        ))}
      </div>
    </div>
  );
}
