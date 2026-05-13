import { NextRequest, NextResponse } from "next/server";
import { calculateScores } from "@/lib/scoring";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const scores = calculateScores(data);

    const payload = {
      timestamp: new Date().toISOString(),
      fullName: data.fullName ?? "",
      age: data.age ?? "",
      phone: data.phone ?? "",
      email: data.email ?? "",
      city: data.city ?? "",
      instagram: data.instagram ?? "",
      tiktok: data.tiktok ?? "",
      followers: data.followers ?? "",
      contentType: data.contentType ?? "",
      postingFrequency: data.postingFrequency ?? "",
      brandExperience: data.brandExperience ?? "",
      brandExperienceDetails: data.brandExperienceDetails ?? "",
      eventContent: data.eventContent ?? "",
      creatorStrength: data.creatorStrength ?? "",
      kbeautyInterest: data.kbeautyInterest ?? "",
      cameraConfidence: data.cameraConfidence ?? "",
      skinType: data.skinType ?? "",
      favoriteBrand: data.favoriteBrand ?? "",
      creatorDifference: data.creatorDifference ?? "",
      ambassadorInterest: data.ambassadorInterest ?? "",
      videoUrl: data.videoUrl ?? "",
      engagementScore: scores.engagementScore,
      brandFitScore: scores.brandFitScore,
      cameraPresenceScore: scores.cameraPresenceScore,
      luxuryAestheticScore: scores.luxuryAestheticScore,
    };

    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (!scriptUrl) {
      console.error("GOOGLE_APPS_SCRIPT_URL not set");
      return NextResponse.json({ success: false, error: "Server misconfigured" }, { status: 500 });
    }

    const gsRes = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    if (!gsRes.ok) {
      throw new Error(`Google Apps Script error: ${gsRes.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json({ success: false, error: "Submission failed" }, { status: 500 });
  }
}
