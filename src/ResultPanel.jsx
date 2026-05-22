import React from 'react'

function ResultPanel({ 
  tipAmountPerPerson, 
  totalBillGroup, 
  perPersonShare, 
  currency = 'Rs.', 
  isResetDisabled, 
  onReset 
}) {
  // Quick formatter to safe currency string
  const formatValue = (num) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  return (
    <section className="results-column" aria-label="Calculated Outcomes" aria-live="polite">
      <div className="results-list">
        
        {/* Line 1: Tip Amount */}
        <div className="result-row">
          <div className="result-info">
            <span className="result-title">Tip Amount</span>
            <span className="result-subtitle">/ person</span>
          </div>
          <div className="result-value-container">
            <span className="result-currency">{currency}</span>
            <span className="result-value">{formatValue(tipAmountPerPerson)}</span>
          </div>
        </div>

        {/* Line 2: Total Bill */}
        <div className="result-row">
          <div className="result-info">
            <span className="result-title">Total Bill</span>
            <span className="result-subtitle">group grand total</span>
          </div>
          <div className="result-value-container">
            <span className="result-currency">{currency}</span>
            <span className="result-value">{formatValue(totalBillGroup)}</span>
          </div>
        </div>

        {/* Divider Line */}
        <div className="results-divider" aria-hidden="true" />

        {/* Line 3: Per Person Share */}
        <div className="result-row secondary highlighting-share">
          <div className="result-info">
            <span className="result-title secondary highlight-text">Per Person Share</span>
            <span className="result-subtitle">what each diner owes</span>
          </div>
          <div className="result-value-container secondary highlight-text">
            <span className="result-currency secondary">{currency}</span>
            <span className="result-value secondary large-bold-value">{formatValue(perPersonShare)}</span>
          </div>
        </div>

      </div>

      {/* Large, Accessible Reset Button */}
      <button
        type="button"
        className="reset-btn"
        onClick={onReset}
        disabled={isResetDisabled}
        aria-label="Reset all calculator inputs and values"
      >
        RESET
      </button>
    </section>
  )
}

export default ResultPanel
