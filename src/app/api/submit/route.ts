import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name")?.toString() || "";
    const creationDate = formData.get("creationDate")?.toString() || "";
    const wtk = formData.get("wtk")?.toString() || "";

    console.log("Received form data:", { name, creationDate, wtk });

    return NextResponse.json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: "An error occurred while submitting the form" },
      { status: 500 }
    );
  }
}
