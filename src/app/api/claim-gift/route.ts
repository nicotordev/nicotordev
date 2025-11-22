import { NextRequest, NextResponse } from "next/server";
import { validateTurnstileToken } from "next-turnstile";
import { emailSchema } from "@/schemas/user.schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, token } = body;

    // Validate request body
    if (!email || !token) {
      return NextResponse.json(
        { error: "Email and token are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailValidation = emailSchema.safeParse({ email });
    if (!emailValidation.success) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Extract client IP address for additional security
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIP =
      forwardedFor?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    console.log("Client IP:", clientIP);

    // Validate Turnstile token
    const validationOptions: {
      token: string;
      secretKey: string;
      remoteip?: string;
      sandbox?: "pass" | "fail" | "error";
    } = {
      token,
      secretKey: process.env.TURNSTILE_SECRET_KEY!,
    };

    // Add IP address for validation (Cloudflare will verify it matches the widget load)
    if (clientIP && clientIP !== "unknown") {
      validationOptions.remoteip = clientIP;
    }

    // Add sandbox option only in development
    if (process.env.NODE_ENV === "development") {
      validationOptions.sandbox = "pass";
    }

    const turnstileResult = await validateTurnstileToken(validationOptions);

    if (!turnstileResult.success) {
      console.error("Turnstile validation failed:", turnstileResult);
      return NextResponse.json(
        { error: "Captcha validation failed" },
        { status: 403 }
      );
    }

    // TODO: Process the email (e.g., save to database, send gift email, etc.)
    console.log("Gift claimed by:", email);
    console.log("Turnstile validation:", turnstileResult);

    // Example: You might want to:
    // 1. Save the email to your database
    // 2. Send the gift via email
    // 3. Track analytics
    // 4. Add to mailing list

    return NextResponse.json({
      success: true,
      message: "Gift claimed successfully! Check your email.",
    });
  } catch (error) {
    console.error("Error processing gift claim:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
