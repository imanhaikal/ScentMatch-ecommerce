const requiredFields = ["brandName", "founder", "email", "location", "capacity", "concentration", "signatureNotes"] as const;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const missingField = requiredFields.find((field) => typeof body[field] !== "string" || String(body[field]).trim().length === 0);

    if (missingField) {
      return Response.json({ error: `${missingField} is required.` }, { status: 400 });
    }

    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const brandSeed = String(body.brandName).trim().replace(/[^a-z0-9]/gi, "").slice(0, 4).toUpperCase().padEnd(4, "X");

    return Response.json({
      reference: `VEN-${date}-${brandSeed}`,
      status: "Received for curator review",
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to submit vendor application." },
      { status: 400 },
    );
  }
}
