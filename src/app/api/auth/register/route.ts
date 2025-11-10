import { getSession } from "@/app/actions/auth.actions";
import { auth } from "@/auth";
import { userSchema } from "@/schemas/user.schema";
import type { NextRequest } from "next/server";

const registerPostHandler = async (req: NextRequest) => {
  try {
    const session = await getSession();
    const body = await req.json();
    const newUserPayload = userSchema.parse(body);
  } catch (error) {
    console.error("Error registering user:", error);
  }
};
