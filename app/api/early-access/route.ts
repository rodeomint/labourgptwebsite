import { NextResponse } from "next/server";

type EarlyAccessPayload = {
  fullName?: unknown;
  organization?: unknown;
  email?: unknown;
  role?: unknown;
  interest?: unknown;
  consent?: unknown;
  website?: unknown;
};

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as EarlyAccessPayload | null;

  if (
    !body ||
    !isNonEmptyString(body.fullName) ||
    !isNonEmptyString(body.organization) ||
    !isNonEmptyString(body.email) ||
    !isNonEmptyString(body.role) ||
    !isNonEmptyString(body.interest)
  ) {
    return NextResponse.json(
      { message: "Missing required fields. Please fill all mandatory inputs." },
      { status: 400 },
    );
  }

  if (body.consent !== true) {
    return NextResponse.json(
      { message: "Consent is required before submitting early access requests." },
      { status: 400 },
    );
  }

  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ message: "Early access request received successfully." });
  }

  return NextResponse.json({
    message: "Early access request received successfully.",
    receivedAt: new Date().toISOString(),
  });
}
