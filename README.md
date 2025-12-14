# Type Mastery Pro

A professional typing platform for mastering keyboard skills with real-time analytics, lessons, and multiplayer races.

## Getting Started

### Sign Up
1. Go to [/auth/signup](/auth/signup)
2. Create an account with username, email, and password
3. You'll be automatically logged in (or need to verify email if using production)
4. Redirected to dashboard

### Dashboard
- View your typing statistics (WPM, accuracy, consistency)
- See your weekly progress chart
- Access recent test results
- Quick action buttons to start tests, continue lessons, or race

### Typing Tests
- Start a typing test from the dashboard
- Real-time WPM, accuracy, and mistake tracking
- Submit your results to save to the database
- Results automatically update your dashboard

### Lessons
- Browse lessons by level (Beginner, Intermediate, Advanced)
- Track your progress through lessons
- Each lesson includes objectives and tips

### Leaderboards
- Global rankings by WPM, accuracy, and consistency
- Filter by timeframe (Weekly, Monthly, All-Time)
- View user profiles and statistics

### Multiplayer Races
- Create or join typing races
- Compete with other users in real-time
- Share race codes with friends

## Features

- **Real Supabase Integration**: All data is persisted to a real database
- **Authentication**: Secure email/password authentication with Supabase Auth
- **Real-time Typing Tests**: Live WPM, accuracy, and consistency tracking
- **Analytics Dashboard**: Weekly charts, recent tests, and personal statistics
- **Lesson Progression**: Structured lessons from beginner to advanced
- **Multiplayer Racing**: Compete with other users
- **Leaderboards**: Global rankings and user profiles
- **Achievements**: Unlock badges based on milestones

## Architecture

\`\`\`
app/
├── (auth)/              # Authentication routes
│   ├── login/
│   ├── signup/
│   └── callback/
├── (protected)/         # Protected routes (require auth)
│   ├── dashboard/
│   ├── typing/
│   └── layout.tsx       # Auth guard layout
├── lessons/
├── leaderboards/
├── races/
├── achievements/
├── page.tsx             # Landing page
└── layout.tsx           # Root layout

lib/
├── supabase/
│   ├── client.ts        # Browser-side Supabase client
│   └── server.ts        # Server-side Supabase client
└── utils.ts

components/
├── app-header.tsx       # Authenticated app header
├── navigation.tsx       # Landing page navigation
├── typing-test.tsx      # Main typing interface
├── dashboard-*.tsx      # Dashboard components
└── ui/                  # shadcn components

scripts/
├── 01_create_schema.sql # Database schema
└── 02_seed_sample_data.sql # Sample lessons and achievements

types/
├── typing.ts
├── dashboard.ts
├── racing.ts
├── profile.ts
├── leaderboard.ts
├── achievements.ts
└── admin.ts
\`\`\`

## Database

All data is stored in Supabase PostgreSQL with Row-Level Security (RLS) policies to ensure user data privacy.

### Tables
- `profiles` - User profiles with stats
- `typing_tests` - Individual typing test results
- `lessons` - Typing lessons
- `lesson_progress` - User progress on lessons
- `races` - Multiplayer races
- `race_participants` - Race participants and results
- `achievements` - Achievement definitions
- `user_achievements` - Unlocked achievements per user

## Environment Variables

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
\`\`\`

## Testing

1. Sign up with test account
2. Take a typing test
3. Submit the result
4. Check dashboard - your stats should appear
5. Take more tests to see the weekly chart update

## Production Deployment

1. Set environment variables in Vercel
2. Deploy to Vercel
3. Update Supabase auth redirect URL to your production domain
4. All data automatically syncs to Supabase

---

Built with Next.js 16, React 19, Supabase, and Tailwind CSS.
