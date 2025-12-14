export interface Racer {
  id: string
  name: string
  wpm: number
  accuracy: number
  progress: number
  position: number
  finished: boolean
  finishTime?: number
}

export interface Race {
  id: string
  code: string
  status: "waiting" | "starting" | "racing" | "finished"
  racers: Racer[]
  duration: number
  text: string
  createdAt: Date
  startTime?: Date
  finishTime?: Date
}

export interface RaceLeaderboard {
  position: number
  name: string
  wpm: number
  accuracy: number
  finishTime: number
}

export interface RaceResult {
  raceId: string
  position: number
  wpm: number
  accuracy: number
  totalTime: number
  opponentCount: number
}
