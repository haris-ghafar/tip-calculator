import { useState, useEffect } from 'react'
import BillInput from './billinput.jsx'
import PeopleInput from './peopleinput.jsx'
import TipSelector from './tipselector.jsx'
import ResultPanel from './resultpanel.jsx'
import './App.css'

function App() {
  // Application State
  const [billAmount, setBillAmount] = useState('')
  const [tipPercentage, setTipPercentage] = useState(15) // Default 15% preset
  const [customTipValue, setCustomTipValue] = useState('')
  const [numberOfPeople, setNumberOfPeople] = useState('1')
  const [currency, setCurrency] = useState('Rs.')
  const [theme, setTheme] = useState('emerald')

  // Error States
  const [peopleError, setPeopleError] = useState('')
  const [billError, setBillError] = useState('')
  const [tipError, setTipError] = useState('')

  // Handle Theme switching globally by setting document class
  useEffect(() => {
    document.documentElement.className = `theme-${theme}`
  }, [theme])

  // Reset function to clear all states to defaults
  const handleReset = () => {
    setBillAmount('')
    setTipPercentage(15)
    setCustomTipValue('')
    setNumberOfPeople('1')
    setCurrency('Rs.')
    setPeopleError('')
    setBillError('')
    setTipError('')
  }

  // Check if inputs have any changes (used to enable/disable reset button)
  const isResetDisabled = 
    billAmount === '' && 
    customTipValue === '' && 
    numberOfPeople === '1' && 
    tipPercentage === 15 && 
    currency === 'Rs.' &&
    tipError === ''

  // Input Handlers with sanitization
  const handleBillChange = (e) => {
    const val = e.target.value
    if (val === '') {
      setBillAmount('')
      setBillError('')
      return
    }

    const floatVal = parseFloat(val)
    if (isNaN(floatVal)) return

    if (floatVal <= 0) {
      setBillError('Must be greater than 0')
    } else {
      setBillError('')
    }
    setBillAmount(val)
  }

  const handlePeopleChange = (e) => {
    const val = e.target.value
    if (val === '') {
      setNumberOfPeople('')
      setPeopleError("Can't be empty")
      return
    }

    const intVal = parseInt(val, 10)
    
    if (intVal < 1) {
      setPeopleError('Must be 1 or more')
    } else {
      setPeopleError('')
    }
    setNumberOfPeople(val)
  }

  const handlePresetSelect = (pct) => {
    setTipPercentage(pct)
    setCustomTipValue('') // Clear custom tip when preset selected
    setTipError('') // Clear custom tip errors
  }

  const handleCustomTipChange = (e) => {
    const val = e.target.value
    if (val === '') {
      setCustomTipValue('')
      setTipPercentage(0) // Fallback to 0% if custom is cleared
      setTipError('')
      return
    }

    const floatVal = parseFloat(val)
    if (isNaN(floatVal)) return

    if (floatVal < 0) {
      setTipError('Must be 0% or more')
    } else if (floatVal > 100) {
      setTipError('Maximum tip is 100%')
    } else {
      setTipError('')
    }
    
    setCustomTipValue(val)
    setTipPercentage(floatVal)
  }

  // ==========================================
  // Core Math & Dynamic Calculations Block
  // ==========================================

  // Inputs can be empty strings while typing; we default them safely to 0 to prevent NaN or breaking calculations.
  const bill = parseFloat(billAmount) || 0
  const people = parseInt(numberOfPeople, 10) || 0
  
  // tip represents the active percentage: custom value if typed, fallback to preset
  const tip = customTipValue !== '' ? parseFloat(customTipValue) || 0 : tipPercentage

  // Yields group-level metrics
  const tipAmount = bill * (tip / 100)
  const totalBill = bill + tipAmount

  /**
   * STRICT ROUNDING POLICY:
   * If a split amount (per person share) has more than 2 decimal places, it must always round UP 
   * to the nearest cent/paisa (using Math.ceil) so that the group never underpays the restaurant.
   *
   * To prevent JavaScript floating-point errors (e.g., 29.2 * 100 = 2919.9999999999995 which 
   * would trigger an incorrect ceil rounding), we round to a high-precision grid (6 decimals) 
   * first, and then apply the Math.ceil.
   */
  const applyStrictCeilRounding = (num) => {
    const fineGridValue = Math.round(num * 1e6) / 1e6
    return Math.ceil(fineGridValue * 100) / 100
  }

  // Yields per-person shares based on our strict rounding policy
  const tipPerPerson = people > 0 ? applyStrictCeilRounding(tipAmount / people) : 0
  const perPersonShare = people > 0 ? applyStrictCeilRounding(totalBill / people) : 0

  // Aliases for compatibility with rendering components
  const totalTip = tipAmount
  const totalPerPerson = perPersonShare

  // Quick formatter to safe currency string
  const formatValue = (num) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  return (
    <div className="app-container" role="application" aria-label="Tip Calculator and Bill Splitter">
      <header className="app-header">
        <div className="logo-container">
          <svg className="logo-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2.5" />
            <path d="M12 7V17M7 12H17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="logo-text">TIP CALCULATOR</span>
        </div>

        {/* Premium Theme Switcher */}
        <div className="theme-selector" role="group" aria-label="Select Color Theme">
          <button 
            type="button"
            className={`theme-pill-btn emerald ${theme === 'emerald' ? 'active' : ''}`}
            onClick={() => setTheme('emerald')}
            aria-label="Emerald Dark Theme"
            aria-pressed={theme === 'emerald'}
          >
            <span className="dot"></span> Emerald
          </button>
          <button 
            type="button"
            className={`theme-pill-btn amethyst ${theme === 'amethyst' ? 'active' : ''}`}
            onClick={() => setTheme('amethyst')}
            aria-label="Amethyst Cyberpunk Theme"
            aria-pressed={theme === 'amethyst'}
          >
            <span className="dot"></span> Amethyst
          </button>
          <button 
            type="button"
            className={`theme-pill-btn light ${theme === 'light' ? 'active' : ''}`}
            onClick={() => setTheme('light')}
            aria-label="Ultra Light Theme"
            aria-pressed={theme === 'light'}
          >
            <span className="dot"></span> Light
          </button>
        </div>
      </header>

      <main className="calculator-card">
        {/* Left Column: Interactive Inputs */}
        <section className="inputs-column" aria-label="Calculator Inputs">
          
          {/* Bill Input */}
          <BillInput
            value={billAmount}
            onChange={handleBillChange}
            error={billError}
            currency={currency}
          />

          {/* Tip Selection Grid */}
          <TipSelector
            activePreset={tipPercentage}
            customValue={customTipValue}
            onPresetSelect={handlePresetSelect}
            onCustomChange={handleCustomTipChange}
            error={tipError}
          />

          {/* Number of People */}
          <PeopleInput
            value={numberOfPeople}
            onChange={handlePeopleChange}
            error={peopleError}
          />

          {/* Premium Interactive Currency Select */}
          <div className="input-group">
            <div className="label-row">
              <span className="input-label">Currency Symbol</span>
            </div>
            <div className="currency-selector" role="group" aria-label="Select Currency Symbol">
              {['Rs.', '₹', '$', '€'].map((symbol) => (
                <button
                  key={symbol}
                  type="button"
                  className={`currency-btn ${currency === symbol ? 'active' : ''}`}
                  onClick={() => setCurrency(symbol)}
                  aria-label={`Switch currency to ${symbol}`}
                  aria-pressed={currency === symbol}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>

        </section>

          {/* Right Column: Display Calculations & Outcomes */}
          <ResultPanel
            tipAmountPerPerson={tipPerPerson}
            totalBillGroup={totalBill}
            perPersonShare={perPersonShare}
            currency={currency}
            isResetDisabled={isResetDisabled}
            onReset={handleReset}
          />
      </main>

      <footer className="app-footer">
        <p>Built for fellowship assessment &bull; Optimized for Mobile &amp; Desktop</p>
      </footer>
    </div>
  )
}

export default App
