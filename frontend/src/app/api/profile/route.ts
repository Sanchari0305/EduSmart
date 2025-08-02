import { NextResponse } from "next/server";

// Dummy in-memory storage (replace with real DB logic)
let userProfile = {
  name: "John Doe",
  email: "john@example.com",
};

export async function GET() {
  return NextResponse.json(userProfile);
}

export async function PUT(req: Request) {
  const data = await req.json();

  if (!data.name || !data.email) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  userProfile = { ...userProfile, ...data };

  return NextResponse.json({ success: true, user: userProfile });
}
