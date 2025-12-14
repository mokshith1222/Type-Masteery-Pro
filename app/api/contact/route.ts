import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

async function sendEmailNotification(name: string, email: string, message: string) {
  try {
    const emailContent = `
New Contact Form Submission:

Name: ${name}
Email: ${email}
Message:
${message}

---
Sent from Type Mastery Pro Contact Form
`

    // Using Resend API (you need to set RESEND_API_KEY in environment variables)
    // For now, we'll log it and return success
    // In production, integrate with Resend or another email service
    console.log("[v0] Email notification content:", emailContent)

    // If RESEND_API_KEY is available, send via Resend
    if (process.env.RESEND_API_KEY) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "noreply@typemastery.pro",
          to: "mokshithnaik932@gmail.com",
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
            <hr>
            <p><small>Sent from Type Mastery Pro Contact Form</small></p>
          `,
        }),
      })

      if (!response.ok) {
        console.error("[v0] Resend email failed:", await response.text())
        // Still return success to user even if email fails
        return true
      }
    }

    return true
  } catch (error) {
    console.error("[v0] Email notification error:", error)
    // Don't fail the whole request if email fails
    return true
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    })

    // Save message to database
    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        message,
        ip_address: request.headers.get("x-forwarded-for") || "unknown",
      })
      .select()

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Failed to save message" }, { status: 500 })
    }

    await sendEmailNotification(name, email, message)

    return NextResponse.json(
      {
        success: true,
        message: "Message received! We will get back to you soon at " + email,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Contact API error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
