"use client"

import type { ReactNode } from "react"

interface SettingsSectionProps {
  title: string
  description?: string
  children: ReactNode
}

export function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <div className="border-b border-gray-200 py-8 last:border-0">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-sm text-gray-600 mb-6">{description}</p>}
      {children}
    </div>
  )
}
