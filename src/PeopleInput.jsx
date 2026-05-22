import React from 'react'

function PeopleInput({ value, onChange, error }) {
  const handleKeyDown = (e) => {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) {
      e.preventDefault()
    }
  }

  return (
    <div className="input-group people-group">
      <div className="label-row">
        <label htmlFor="people-input" className="input-label">Number of People</label>
      </div>
      <div className="input-wrapper">
        <span className="input-prefix icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </span>
        <input
          id="people-input"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          min="1"
          placeholder="1"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          className={`main-input ${error ? 'has-error' : ''}`}
          required
          aria-invalid={!!error}
          aria-describedby={error ? "people-error-msg" : undefined}
        />
      </div>
      {/* Layout Shift Protection: Absolute positioned container below the input wrapper */}
      <div className="error-container">
        {error && (
          <span className="error-text" id="people-error-msg" role="alert">
            {error}
          </span>
        )}
      </div>
    </div>
  )
}

export default PeopleInput
