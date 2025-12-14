"use client"

import { useState } from "react"

interface SettingsSelectProps {
  label: string
  description?: string
  options: { value: string; label: string }[]
  defaultValue?: string
  onChange?: (value: string) => void
}

export function SettingsSelect({ label, description, options, defaultValue = "", onChange }: SettingsSelectProps) {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (newValue: string) => {
    setValue(newValue)
    onChange?.(newValue)
  }

  return (
    <div className="py-3">
      <label className="block">
        <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
        {description && <p className="text-xs text-gray-500 mb-3">{description}</p>}
        <select
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
