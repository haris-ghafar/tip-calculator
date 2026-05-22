import React from 'react'

function TipSelector({ activePreset, customValue, onPresetSelect, onCustomChange, error }) {
  // Determine if a preset button is active: activePreset matches and customValue is empty
  const isPresetActive = (pct) => activePreset === pct && customValue === ''

  return (
    <div className="input-group tip-selector-group">
      <div className="label-row">
        <span className="input-label">Select Tip %</span>
      </div>
      
      <div className="tip-grid" role="group" aria-label="Preset Tip Percentages">
        {[10, 15, 20].map((pct) => {
          const active = isPresetActive(pct)
          return (
            <button
              key={pct}
              type="button"
              className={`tip-btn ${active ? 'active' : ''}`}
              onClick={() => onPresetSelect(pct)}
              aria-pressed={active}
            >
              {pct}%
            </button>
          )
        })}
        <div className="custom-tip-wrapper">
          <input
            type="number"
            inputMode="decimal"
            min="0"
            max="100"
            placeholder="Custom"
            value={customValue}
            onChange={onCustomChange}
            className={`custom-tip-input ${customValue !== '' ? 'active' : ''} ${error ? 'has-error' : ''}`}
            aria-label="Custom Tip Percentage"
            aria-invalid={!!error}
            aria-describedby={error ? "tip-error-msg" : undefined}
          />
          <span className="percent-suffix" aria-hidden="true">%</span>
        </div>
      </div>

      {/* Layout Shift Protection: Absolute positioned container below the tip grid */}
      <div className="error-container">
        {error && (
          <span className="error-text" id="tip-error-msg" role="alert">
            {error}
          </span>
        )}
      </div>
    </div>
  )
}

export default TipSelector
