export type FormData = Record<string, string>;

export interface Scores {
  engagementScore: number;
  brandFitScore: number;
  cameraPresenceScore: number;
  luxuryAestheticScore: number;
}

export function calculateScores(data: FormData): Scores {
  // — Engagement Score (follower reach × posting velocity)
  const followerMap: Record<string, number> = {
    "0–1K": 10,
    "1K–5K": 25,
    "5K–10K": 40,
    "10K–50K": 70,
    "50K+": 100,
  };
  const frequencyMap: Record<string, number> = {
    "Ara sıra": 20,
    "Haftada 2–3": 50,
    "Haftada 4–5": 75,
    "Her gün": 100,
  };
  const engagementScore = Math.round(
    ((followerMap[data.followers] ?? 0) + (frequencyMap[data.postingFrequency] ?? 0)) / 2
  );

  // — Brand Fit Score (content type × K-beauty alignment × brand experience)
  const contentFitMap: Record<string, number> = {
    Beauty: 100,
    Skincare: 100,
    Makeup: 95,
    "Aesthetic Content": 85,
    Lifestyle: 70,
    Fashion: 65,
    "Daily Life": 60,
    "Couple Content": 50,
    "Student Content": 50,
    Vlog: 45,
  };
  const kbeautyMap: Record<string, number> = {
    "Glass skin": 100,
    "Cilt sağlığı": 95,
    "Minimal skincare": 90,
    "Makeup & skincare kombinasyonu": 85,
    "Trend ürünler": 75,
    "İçerik üretmek": 60,
  };
  const brandExpBonus = data.brandExperience === "Evet" ? 100 : 0;
  const brandFitScore = Math.round(
    (contentFitMap[data.contentType] ?? 0) * 0.4 +
      (kbeautyMap[data.kbeautyInterest] ?? 0) * 0.4 +
      brandExpBonus * 0.2
  );

  // — Camera Presence Score (confidence × event willingness)
  const confidenceMap: Record<string, number> = {
    "Çok rahatım": 100,
    Rahatım: 70,
    "Biraz çekingenim": 40,
  };
  const eventMap: Record<string, number> = {
    "Evet kesinlikle": 100,
    "Büyük ihtimalle": 75,
    Belki: 50,
    "Emin değilim": 25,
  };
  const cameraPresenceScore = Math.round(
    ((confidenceMap[data.cameraConfidence] ?? 0) + (eventMap[data.eventContent] ?? 0)) / 2
  );

  // — Luxury Aesthetic Score (visual content type × creator identity)
  const luxuryContentMap: Record<string, number> = {
    "Aesthetic Content": 100,
    Beauty: 95,
    Skincare: 90,
    Makeup: 85,
    Fashion: 75,
    Lifestyle: 65,
    "Daily Life": 55,
    "Couple Content": 50,
    "Student Content": 45,
    Vlog: 40,
  };
  const strengthMap: Record<string, number> = {
    "Estetik içeriklerim": 100,
    "Bilgi verici içeriklerim": 70,
    Samimiyetim: 60,
    Enerjim: 55,
    "Günlük hayatım": 50,
    Mizahım: 40,
  };
  const luxuryAestheticScore = Math.round(
    (luxuryContentMap[data.contentType] ?? 0) * 0.6 +
      (strengthMap[data.creatorStrength] ?? 0) * 0.4
  );

  return { engagementScore, brandFitScore, cameraPresenceScore, luxuryAestheticScore };
}
