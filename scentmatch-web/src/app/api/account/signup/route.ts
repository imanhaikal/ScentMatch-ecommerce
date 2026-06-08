import { NextResponse } from "next/server";
import { assertTrustedMutationOrigin, jsonError, sessionResponse } from "@/lib/account/api";
import { createAccountService } from "@/lib/account/service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    assertTrustedMutationOrigin(request);
    const body = (await request.json()) as { name?: string; email?: string; password?: string };
    const user = await createAccountService().signup({
      name: String(body.name ?? ""),
      email: String(body.email ?? ""),
      password: String(body.password ?? ""),
    });

    return sessionResponse(user);
  } catch (error) {
    return jsonError(error);
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
