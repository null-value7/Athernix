import DiscoverThreeScene from "./DiscoverThreeScene";

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

function renderText(section: Section) {
  if (!section.textParts) return <p>{section.text}</p>;

  return (
    <p>
      {section.textParts.map((part, index) =>
        typeof part === "string" ? (
          part
        ) : (
          <span className={part.className} key={`${part.text}-${index}`}>
            {part.text}
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
      <main className="discover-content-wrapper">
        {sections.map((section) => (
          <section className={`discover-section ${section.className}`} key={section.title}>
            <div className={`discover-content-block ${section.align}`}>
              {section.glitch ? (
                <h1 className="glitch" data-text={section.title}>
                  {section.title}
                </h1>
              ) : (
                <h2>{section.title}</h2>
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
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
