// @ts-nocheck
import DiscoverThreeScene from "./DiscoverThreeScene";

function renderText(section) {
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

export default function DiscoverView({ sections }) {
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
