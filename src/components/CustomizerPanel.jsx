import { useState } from "react";
import { FaPalette, FaXmark } from "react-icons/fa6";
import {
  usePreferences,
  ACCENTS,
  FONTS,
  EFFECTS,
  CARD_STYLES,
  VIEW_MODES,
  NAV_ORIENTATIONS,
  DEFAULT_PREFERENCES,
} from "../hooks/usePreferences";
import { useLens } from "../hooks/useLens";
import { LENSES } from "../constants/lenses";

const CustomizerPanel = () => {
  const [prefs, setPrefs] = usePreferences();
  const [lens, setLens] = useLens();
  const [open, setOpen] = useState(false);

  const reset = () => {
    setPrefs({ ...DEFAULT_PREFERENCES });
  };

  return (
    <div className="customizer-widget">
      {open && (
        <div className="customizer-panel" role="dialog" aria-label="Customize this site">
          <div className="customizer-panel-head">
            <p className="section-eyebrow">MAKE IT YOURS</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close">
              <FaXmark aria-hidden="true" />
            </button>
          </div>

          <div className="customizer-group">
            <p className="customizer-label">Lens</p>
            <div className="customizer-chip-row">
              {Object.entries(LENSES).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={lens === key}
                  onClick={() => setLens(key)}
                  className={`customizer-chip ${lens === key ? "customizer-chip-active" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="customizer-group">
            <p className="customizer-label">View mode</p>
            <div className="customizer-chip-row">
              {VIEW_MODES.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  aria-pressed={prefs.viewMode === mode.id}
                  onClick={() => setPrefs((p) => ({ ...p, viewMode: mode.id }))}
                  className={`customizer-chip ${prefs.viewMode === mode.id ? "customizer-chip-active" : ""}`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          <div className="customizer-group">
            <p className="customizer-label">Accent colour</p>
            <div className="customizer-swatch-row">
              {ACCENTS.map((accent) => (
                <button
                  key={accent.id}
                  type="button"
                  aria-pressed={prefs.accent === accent.id}
                  aria-label={accent.label}
                  title={accent.label}
                  onClick={() => setPrefs((p) => ({ ...p, accent: accent.id }))}
                  className={`customizer-swatch ${prefs.accent === accent.id ? "customizer-swatch-active" : ""}`}
                  style={{ background: `rgb(${accent.rgb})` }}
                />
              ))}
            </div>
          </div>

          <div className="customizer-group">
            <p className="customizer-label">Font</p>
            <div className="customizer-chip-row">
              {FONTS.map((font) => (
                <button
                  key={font.id}
                  type="button"
                  aria-pressed={prefs.font === font.id}
                  onClick={() => setPrefs((p) => ({ ...p, font: font.id }))}
                  className={`customizer-chip ${prefs.font === font.id ? "customizer-chip-active" : ""}`}
                  style={{ fontFamily: font.stack }}
                >
                  {font.label}
                </button>
              ))}
            </div>
          </div>

          <div className="customizer-group">
            <p className="customizer-label">Ambient effect</p>
            <div className="customizer-chip-row">
              {EFFECTS.map((effect) => (
                <button
                  key={effect.id}
                  type="button"
                  aria-pressed={prefs.effect === effect.id}
                  onClick={() => setPrefs((p) => ({ ...p, effect: effect.id }))}
                  className={`customizer-chip ${prefs.effect === effect.id ? "customizer-chip-active" : ""}`}
                >
                  {effect.label}
                </button>
              ))}
            </div>
          </div>

          <div className="customizer-group">
            <p className="customizer-label">Navbar layout</p>
            <div className="customizer-chip-row">
              {NAV_ORIENTATIONS.map((orientation) => (
                <button
                  key={orientation.id}
                  type="button"
                  aria-pressed={prefs.navOrientation === orientation.id}
                  onClick={() => setPrefs((p) => ({ ...p, navOrientation: orientation.id }))}
                  className={`customizer-chip ${prefs.navOrientation === orientation.id ? "customizer-chip-active" : ""}`}
                >
                  {orientation.label}
                </button>
              ))}
            </div>
          </div>

          <div className="customizer-group">
            <p className="customizer-label">Card style</p>
            <div className="customizer-chip-row">
              {CARD_STYLES.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  aria-pressed={prefs.cardStyle === card.id}
                  onClick={() => setPrefs((p) => ({ ...p, cardStyle: card.id }))}
                  className={`customizer-chip ${prefs.cardStyle === card.id ? "customizer-chip-active" : ""}`}
                >
                  {card.label}
                </button>
              ))}
            </div>
          </div>

          <button type="button" onClick={reset} className="customizer-reset">
            Reset to defaults
          </button>
        </div>
      )}

      <button
        type="button"
        className="customizer-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Customize this site"
      >
        <FaPalette aria-hidden="true" />
      </button>
    </div>
  );
};

export default CustomizerPanel;
