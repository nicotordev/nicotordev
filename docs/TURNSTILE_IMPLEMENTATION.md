# Cloudflare Turnstile Implementation Guide

## Overview

This guide explains how to complete the Cloudflare Turnstile integration in the lead-magnet-gift-dialog component.

## What's Been Implemented

✅ **Client-side Integration**

- Turnstile widget with proper callbacks (onVerify, onError, onExpire)
- Form validation using react-hook-form and zod
- Beautiful glassmorphic design matching the project aesthetic
- Loading states and success animations with framer-motion
- Automatic sandbox mode for development

✅ **Design Features**

- Gradient text and background effects
- Backdrop blur and glassmorphism
- Smooth animations and transitions
- Responsive layout
- Status indicators

## What You Need to Do

### 1. Configure Environment Variables

Add these variables to your `.env.local` file:

```env
# Cloudflare Turnstile Keys
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
TURNSTILE_SECRET_KEY=your_secret_key_here
```

**To get your Turnstile keys:**

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to Turnstile section
3. Create a new site or use an existing one
4. Copy the Site Key (public) → `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
5. Copy the Secret Key (private) → `TURNSTILE_SECRET_KEY`

**Note:** The component will use sandbox mode automatically in development, so it works without real keys for testing.

### 2. Create Server-Side Validation API Route

Create a new API route to validate the Turnstile token and process the email submission:

**File:** `/src/app/api/claim-gift/route.ts`

```typescript
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

    // Validate Turnstile token
    const turnstileResult = await validateTurnstileToken({
      token,
      secretKey: process.env.TURNSTILE_SECRET_KEY!,
      // Optional: Get client IP for additional validation
      // remoteip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
    });

    if (!turnstileResult.success) {
      console.error("Turnstile validation failed:", turnstileResult);
      return NextResponse.json(
        { error: "Captcha validation failed" },
        { status: 403 }
      );
    }

    // TODO: Process the email (e.g., save to database, send gift email, etc.)
    console.log("Gift claimed by:", email);

    // Example: Send email with the gift
    // await sendGiftEmail(email);

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
```

### 3. Update Client Component to Call API

Update the `onSubmit` function in `/src/components/home/lead-magnet/lead-magnet-gift-dialog.tsx`:

```typescript
const onSubmit: SubmitHandler<EmailSchema> = async (data) => {
  if (!turnstileToken) {
    console.error("No turnstile token available");
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch("/api/claim-gift", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        token: turnstileToken,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to claim gift");
    }

    setIsSuccess(true);

    // Reset form after 2 seconds
    setTimeout(() => {
      reset();
      setIsSuccess(false);
      setTurnstileToken(null);
      onOpenChange(null);
    }, 2000);
  } catch (error) {
    console.error("Error submitting form:", error);
    // You might want to show a toast notification here
    alert("Error al reclamar el regalo. Por favor, intenta de nuevo.");
  } finally {
    setIsSubmitting(false);
  }
};
```

## Testing in Development

The component automatically uses sandbox mode when `NODE_ENV === "development"`, which means:

- You can test without real Turnstile keys
- The sandbox always returns a valid token
- It uses the test site key: `1x00000000000000000000AA`

## Sandbox Options for Testing

If you want to test different scenarios, you can modify the `sandbox` prop:

```tsx
<Turnstile
  sandbox="pass" // Always passes (default in dev)
  // sandbox="block"    // Always fails visible challenge
  // sandbox="pass-invisible"  // Always passes invisible challenge
  // sandbox="block-invisible" // Always blocks invisible challenge
  // sandbox={false}    // Use real Turnstile (production)
/>
```

## Additional Features You Can Add

1. **Toast Notifications**: Use the `sonner` package (already installed) to show success/error messages
2. **Email Service**: Integrate with services like SendGrid, Resend, or Mailgun to send the gift
3. **Database Storage**: Save email addresses to your database for later use
4. **Analytics**: Track how many people claim the gift
5. **Rate Limiting**: Prevent abuse by limiting claims per IP/email

## Troubleshooting

### Widget not showing

- Check that `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set (or using sandbox mode)
- Check browser console for errors
- Make sure the domain is allowed in Cloudflare Turnstile settings

### Token validation fails

- Verify `TURNSTILE_SECRET_KEY` is correct
- Check that the token hasn't expired (tokens expire after 5 minutes)
- Ensure you're using the correct API endpoint

### Styling issues

- The Turnstile widget has limited customization
- You can only control size, theme, and container styling
- Internal widget styling is controlled by Cloudflare

## Resources

- [Cloudflare Turnstile Docs](https://developers.cloudflare.com/turnstile/)
- [next-turnstile Package](https://www.npmjs.com/package/next-turnstile)
- [Cloudflare Dashboard](https://dash.cloudflare.com/)
