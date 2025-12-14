"use client"

import { ProfileHeader } from "@/components/profile-header"
import { ProfileAchievements } from "@/components/profile-achievements"

// Mock data - replace with actual API call
const mockProfile = {
  id: "1",
  username: "TypeMaster",
  email: "user@example.com",
  joinedDate: "Jan 15, 2024",
  bio: "Typing enthusiast and speed demon",
  stats: {
    totalTests: 287,
    bestWPM: 142,
    averageWPM: 98,
    accuracy: 96.2,
    totalHours: 145,
    currentStreak: 23,
    longestStreak: 47,
  },
  badges: ["first-test", "speed-demon", "accuracy-master", "hundred-club"],
  recentTests: [
    { id: "1", date: "Today", wpm: 142, accuracy: 97, testType: "Standard" },
    { id: "2", date: "Yesterday", wpm: 135, accuracy: 95, testType: "Standard" },
  ],
}

export default function ProfilePage({ params }: { params: { username: string } }) {
  const isOwnProfile = params.username === "me"

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <ProfileHeader profile={mockProfile} isOwnProfile={isOwnProfile} />
        <ProfileAchievements badges={mockProfile.badges} />

        <div className="bg-white rounded-lg border border-blue-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Tests</h2>
          <div className="space-y-4">
            {mockProfile.recentTests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{test.wpm} WPM</p>
                  <p className="text-sm text-gray-600">{test.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{test.accuracy}% Accuracy</p>
                  <p className="text-xs text-gray-500">{test.testType}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
