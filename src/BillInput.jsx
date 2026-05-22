import React from 'react'

function BillInput({ value, onChange, error, currency }) {
  const handleKeyDown = (e) => {
    if (['e', 'E', '+', '-'].includes(e.key)) {
      e.preventDefault()
    }
  }

  return (
    <div className="input-group bill-group">
      <div className="label-row">
        <label htmlFor="bill-input" className="input-label">Bill Amount</label>
      </div>
      <div className="input-wrapper">
        <span className="input-prefix" aria-hidden="true">{currency}</span>
        <input
          id="bill-input"
          type="number"
          inputMode="decimal"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          className={`main-input ${error ? 'has-error' : ''}`}
          required
          aria-invalid={!!error}
          aria-describedby={error ? "bill-error-msg" : undefined}
        />
      </div>
      {/* Layout Shift Protection: Absolute positioned container below the input wrapper */}
      <div className="error-container">
        {error && (
          <span className="error-text" id="bill-error-msg" role="alert">
            {error}
          </span>
        )}
      </div>
    </div>
  )
}

export default BillInput
