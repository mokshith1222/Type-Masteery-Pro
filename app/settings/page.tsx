"use client"

import { SettingsSection } from "@/components/settings-section"
import { SettingsToggle } from "@/components/settings-toggle"
import { SettingsSelect } from "@/components/settings-select"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your Type Mastery Pro experience</p>
        </div>

        <div className="bg-white rounded-lg border border-blue-100 shadow-sm">
          {/* Typing Test Settings */}
          <SettingsSection title="Typing Test Preferences" description="Customize how you take typing tests">
            <SettingsSelect
              label="Test Duration"
              description="Choose how long each test lasts"
              options={[
                { value: "15", label: "15 seconds" },
                { value: "30", label: "30 seconds" },
                { value: "60", label: "1 minute" },
                { value: "120", label: "2 minutes" },
                { value: "300", label: "5 minutes" },
              ]}
              defaultValue="60"
            />
            <SettingsSelect
              label="Difficulty Level"
              description="Choose the difficulty of words and phrases"
              options={[
                { value: "easy", label: "Easy (Common words)" },
                { value: "medium", label: "Medium (Mixed vocabulary)" },
                { value: "hard", label: "Hard (Advanced vocabulary)" },
              ]}
              defaultValue="medium"
            />
            <SettingsToggle
              label="Show Live WPM"
              description="Display WPM calculation in real-time during tests"
              defaultValue={true}
            />
            <SettingsToggle
              label="Sound Effects"
              description="Play sounds for correct and incorrect keystrokes"
              defaultValue={true}
            />
          </SettingsSection>

          {/* Notifications */}
          <SettingsSection title="Notifications" description="Manage how we notify you">
            <SettingsToggle
              label="Practice Reminders"
              description="Get daily reminders to maintain your typing streak"
              defaultValue={true}
            />
            <SettingsToggle
              label="Achievement Notifications"
              description="Notify me when I unlock new achievements"
              defaultValue={true}
            />
            <SettingsToggle
              label="Race Invitations"
              description="Notify me when friends invite me to races"
              defaultValue={true}
            />
            <SettingsToggle
              label="Email Notifications"
              description="Receive email summaries of your progress"
              defaultValue={false}
            />
          </SettingsSection>

          {/* Display Settings */}
          <SettingsSection title="Display" description="Customize the appearance of Type Mastery Pro">
            <SettingsSelect
              label="Theme"
              description="Choose light or dark mode"
              options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
                { value: "auto", label: "Auto (System)" },
              ]}
              defaultValue="light"
            />
            <SettingsSelect
              label="Font Size"
              description="Adjust the typing test text size"
              options={[
                { value: "small", label: "Small" },
                { value: "medium", label: "Medium" },
                { value: "large", label: "Large" },
              ]}
              defaultValue="medium"
            />
            <SettingsToggle label="Compact View" description="Use a more condensed layout" defaultValue={false} />
          </SettingsSection>

          {/* Privacy & Security */}
          <SettingsSection title="Privacy & Security" description="Control your privacy settings">
            <SettingsSelect
              label="Profile Visibility"
              description="Who can view your profile and statistics"
              options={[
                { value: "public", label: "Public" },
                { value: "friends", label: "Friends only" },
                { value: "private", label: "Private" },
              ]}
              defaultValue="public"
            />
            <SettingsToggle
              label="Show on Leaderboard"
              description="Allow your scores to appear on global leaderboards"
              defaultValue={true}
            />
            <SettingsToggle
              label="Allow Friend Requests"
              description="Let other users add you as a friend"
              defaultValue={true}
            />
          </SettingsSection>

          {/* Account Settings */}
          <SettingsSection title="Account" description="Manage your account">
            <Button
              variant="outline"
              className="w-full mb-3 text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
            >
              Change Password
            </Button>
            <Button
              variant="outline"
              className="w-full mb-3 text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
            >
              Download Data
            </Button>
            <Button variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-50 bg-transparent">
              Delete Account
            </Button>
          </SettingsSection>

          {/* Save Button */}
          <div className="px-8 py-6 bg-blue-50 border-t border-blue-100 rounded-b-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Save className="w-5 h-5 text-blue-600" />
              {saved && <span className="text-sm text-green-600 font-medium">Settings saved successfully</span>}
              {!saved && <span className="text-sm text-gray-600">Save your changes</span>}
            </div>
            <Button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
