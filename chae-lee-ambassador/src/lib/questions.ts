export type QuestionType = "text" | "tel" | "email" | "select" | "textarea" | "url";

export interface FollowUp {
  condition: string;
  id: string;
  label: string;
  type: QuestionType;
  placeholder?: string;
}

export interface Question {
  id: string;
  number: number;
  question: string;
  subtitle?: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
  placeholder?: string;
  followUp?: FollowUp;
}

export const questions: Question[] = [
  { id: "fullName", number: 1, question: "Adın Soyadın?", subtitle: "Creator ekibine katılmak için seni tanıyalım ✨", type: "text", required: true, placeholder: "Adın ve soyadın..." },
  { id: "age", number: 2, question: "Yaş aralığın nedir?", type: "select", required: true, options: ["13–17", "18–24", "25–30", "31–40", "40+"] },
  { id: "phone", number: 3, question: "Telefon Numarası", subtitle: "Seçim sonuçlarını bu numara üzerinden ileteceğiz", type: "tel", required: true, placeholder: "+90 5xx xxx xx xx" },
  { id: "email", number: 4, question: "Mail Adresin?", type: "email", required: true, placeholder: "email@adresin.com" },
  { id: "city", number: 5, question: "Hangi şehirdesin?", type: "text", required: true, placeholder: "İstanbul, Ankara, İzmir..." },
  { id: "instagram", number: 6, question: "Instagram Kullanıcı Adın?", type: "text", required: true, placeholder: "@kullaniciad" },
  { id: "tiktok", number: 7, question: "TikTok Kullanıcı Adın?", subtitle: "Bu alan opsiyoneldir, boş bırakabilirsin", type: "text", required: false, placeholder: "@kullaniciad (opsiyonel)" },
  { id: "followers", number: 8, question: "Instagram takipçi sayın nedir?", type: "select", required: true, options: ["0–1K", "1K–5K", "5K–10K", "10K–50K", "50K+"] },
  { id: "contentType", number: 9, question: "İçerik türün nedir?", subtitle: "Seni en iyi tanımlayan kategoriyi seç", type: "select", required: true, options: ["Beauty", "Lifestyle", "Fashion", "Couple Content", "Makeup", "Skincare", "Daily Life", "Aesthetic Content", "Student Content", "Vlog"] },
  { id: "postingFrequency", number: 10, question: "Haftada ortalama kaç içerik paylaşıyorsun?", type: "select", required: true, options: ["Her gün", "Haftada 4–5", "Haftada 2–3", "Ara sıra"] },
  { id: "brandExperience", number: 11, question: "Daha önce markalarla çalıştın mı?", type: "select", required: true, options: ["Evet", "Hayır"], followUp: { condition: "Evet", id: "brandExperienceDetails", label: "Hangi markalarla çalıştın? Kısaca anlat...", type: "textarea", placeholder: "Marka adları ve ürettiğin içerik türleri..." } },
  { id: "eventContent", number: 12, question: "Etkinlik sırasında içerik üretmek ister misin?", type: "select", required: true, options: ["Evet kesinlikle", "Büyük ihtimalle", "Belki", "Emin değilim"] },
  { id: "creatorStrength", number: 13, question: "İnsanlar seni en çok hangi özelliğin için takip ediyor?", type: "select", required: true, options: ["Enerjim", "Samimiyetim", "Estetik içeriklerim", "Bilgi verici içeriklerim", "Günlük hayatım", "Mizahım"] },
  { id: "kbeautyInterest", number: 14, question: "K-beauty dünyasında seni en çok ne heyecanlandırıyor?", type: "select", required: true, options: ["Glass skin", "Minimal skincare", "Trend ürünler", "Cilt sağlığı", "Makeup & skincare kombinasyonu", "İçerik üretmek"] },
  { id: "cameraConfidence", number: 15, question: "Kamerada kendini ne kadar rahat hissediyorsun?", type: "select", required: true, options: ["Çok rahatım", "Rahatım", "Biraz çekingenim"] },
  { id: "skinType", number: 16, question: "Cilt tipin nasıl?", type: "select", required: true, options: ["Yağlı", "Karma", "Kuru", "Hassas", "Normal"] },
  { id: "favoriteBrand", number: 17, question: "En sevdiğin Kore skincare markası hangisi?", type: "text", required: true, placeholder: "COSRX, Laneige, Innisfree, Sulwhasoo..." },
  { id: "creatorDifference", number: 18, question: "Seni diğer creator'lardan ayıran şey ne?", subtitle: "Kendi sözlerinle anlat, samimi ol ✨", type: "textarea", required: true, placeholder: "Seni özel ve benzersiz kılan şeyi anlat..." },
  { id: "ambassadorInterest", number: 19, question: "Chae Lee ile ileride içerik üretmek ister misin?", type: "select", required: true, options: ["Kesinlikle evet!", "Evet", "Belki"] },
  { id: "selfIntro", number: 20, question: "Kendini kısaca tanıt ✨", subtitle: "Birkaç cümle yeterli — kim olduğunu, ne ürettiğini anlat", type: "textarea", required: false, placeholder: "Kim olduğunu, ne ürettiğini ve seni özel kılan şeyi kısaca anlat..." },
];
