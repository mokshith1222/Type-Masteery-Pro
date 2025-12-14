"use client"

import type { UserProfile } from "@/types/profile"
import { Flame, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProfileHeaderProps {
  profile: UserProfile
  isOwnProfile: boolean
}

export function ProfileHeader({ profile, isOwnProfile }: ProfileHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-200 rounded-lg p-8">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold">
            {profile.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{profile.username}</h1>
            {profile.bio && <p className="text-gray-600 mt-2">{profile.bio}</p>}
            <p className="text-sm text-gray-500 mt-3">Joined {profile.joinedDate}</p>
          </div>
        </div>
        {isOwnProfile && (
          <Button variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50 bg-transparent">
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <div className="text-sm text-gray-600">Best WPM</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">{profile.stats.bestWPM}</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <div className="text-sm text-gray-600">Average WPM</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">{profile.stats.averageWPM}</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <div className="text-sm text-gray-600">Accuracy</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">{profile.stats.accuracy}%</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <div className="text-sm text-gray-600">Total Tests</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">{profile.stats.totalTests}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="flex items-center gap-2 bg-white rounded-lg p-4 border border-blue-100">
          <Flame className="w-5 h-5 text-orange-500" />
          <div>
            <div className="text-xs text-gray-600">Current Streak</div>
            <div className="font-bold text-gray-900">{profile.stats.currentStreak} days</div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-lg p-4 border border-blue-100">
          <Flame className="w-5 h-5 text-red-500" />
          <div>
            <div className="text-xs text-gray-600">Longest Streak</div>
            <div className="font-bold text-gray-900">{profile.stats.longestStreak} days</div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-lg p-4 border border-blue-100">
          <Clock className="w-5 h-5 text-blue-500" />
          <div>
            <div className="text-xs text-gray-600">Total Hours</div>
            <div className="font-bold text-gray-900">{profile.stats.totalHours}h</div>
          </div>
        </div>
      </div>
    </div>
  )
}
