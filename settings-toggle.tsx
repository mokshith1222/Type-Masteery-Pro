"use client"

import { useState } from "react"

interface SettingsToggleProps {
  label: string
  description?: string
  defaultValue?: boolean
  onChange?: (value: boolean) => void
}

export function SettingsToggle({ label, description, defaultValue = false, onChange }: SettingsToggleProps) {
  const [enabled, setEnabled] = useState(defaultValue)

  const handleToggle = () => {
    const newValue = !enabled
    setEnabled(newValue)
    onChange?.(newValue)
  }

  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )
}
