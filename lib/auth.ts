// Mock authentication - in a real app, use a proper auth service like Supabase
// This demonstrates the pattern for client-side auth

export const mockUsers: Record<string, { id: string; email: string; name: string; password: string }> = {
  "demo@example.com": {
    id: "user-1",
    email: "demo@example.com",
    name: "Demo User",
    password: "demo123", // In real app, this would be hashed
  },
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long")
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export function validateSignup(data: { name: string; email: string; password: string; confirmPassword: string }) {
  const errors: Record<string, string> = {}

  if (!data.name.trim()) {
    errors.name = "Name is required"
  }

  if (!validateEmail(data.email)) {
    errors.email = "Please enter a valid email address"
  }

  if (mockUsers[data.email]) {
    errors.email = "This email is already registered"
  }

  const passwordValidation = validatePassword(data.password)
  if (!passwordValidation.valid) {
    errors.password = passwordValidation.errors[0]
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match"
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateLogin(data: { email: string; password: string }) {
  const errors: Record<string, string> = {}

  if (!validateEmail(data.email)) {
    errors.email = "Please enter a valid email address"
  }

  if (!data.password) {
    errors.password = "Password is required"
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
