import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body?.fullName || !body?.organization || !body?.email || !body?.role || !body?.interest) {
    return NextResponse.json(
      { message: "Missing required fields. Please fill all mandatory inputs." },
      { status: 400 },
    );
  }

  return NextResponse.json({
    message: "Early access request received successfully.",
    receivedAt: new Date().toISOString(),
  });
}
