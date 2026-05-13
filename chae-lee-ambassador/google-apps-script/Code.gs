// ─────────────────────────────────────────────────────────────────
// Chae Lee K-Beauty Ambassador — Google Apps Script
// ─────────────────────────────────────────────────────────────────
// SETUP:
// 1. Google Sheets → Extensions → Apps Script → paste this code
// 2. Deploy → New deployment → Web app
//    Execute as: Me | Who has access: Anyone
// 3. Copy the deployment URL → paste into Vercel env as GOOGLE_APPS_SCRIPT_URL
// ─────────────────────────────────────────────────────────────────

var SHEET_NAME = "Başvurular";

var HEADERS = [
  "Timestamp",
  "Ad Soyad",
  "Yaş",
  "Telefon",
  "Email",
  "Şehir",
  "Instagram",
  "TikTok",
  "Takipçi Sayısı",
  "İçerik Türü",
  "Paylaşım Sıklığı",
  "Marka Deneyimi",
  "Marka Detayları",
  "Etkinlik İçerik İlgisi",
  "Creator Gücü",
  "K-Beauty İlgisi",
  "Kamera Güveni",
  "Cilt Tipi",
  "Favori Marka",
  "Creator Farkı",
  "Ambassador İlgisi",
  "Video URL",
  "Engagement Score",
  "Brand Fit Score",
  "Camera Presence Score",
  "Luxury Aesthetic Score",
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // Create sheet + headers on first run
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      formatHeaderRow(sheet);
    }

    var row = [
      data.timestamp || new Date().toISOString(),
      data.fullName || "",
      data.age || "",
      data.phone || "",
      data.email || "",
      data.city || "",
      data.instagram || "",
      data.tiktok || "",
      data.followers || "",
      data.contentType || "",
      data.postingFrequency || "",
      data.brandExperience || "",
      data.brandExperienceDetails || "",
      data.eventContent || "",
      data.creatorStrength || "",
      data.kbeautyInterest || "",
      data.cameraConfidence || "",
      data.skinType || "",
      data.favoriteBrand || "",
      data.creatorDifference || "",
      data.ambassadorInterest || "",
      data.videoUrl || "",
      data.engagementScore || 0,
      data.brandFitScore || 0,
      data.cameraPresenceScore || 0,
      data.luxuryAestheticScore || 0,
    ];

    sheet.appendRow(row);
    colorScoreCells(sheet, sheet.getLastRow());

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Format header row ──
function formatHeaderRow(sheet) {
  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setBackground("#C4869B");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(10);
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 160);  // Timestamp
  sheet.setColumnWidth(2, 130);  // Name
  sheet.setColumnWidth(20, 250); // Creator Difference
}

// ── Color score cells based on value ──
function colorScoreCells(sheet, rowNum) {
  var scoreColumns = [23, 24, 25, 26]; // Engagement, BrandFit, Camera, Luxury
  scoreColumns.forEach(function(col) {
    var cell = sheet.getRange(rowNum, col);
    var val = cell.getValue();
    if (val >= 75) {
      cell.setBackground("#C8E6C9"); // green — high
    } else if (val >= 50) {
      cell.setBackground("#FFF9C4"); // yellow — medium
    } else {
      cell.setBackground("#FFCCBC"); // orange — low
    }
    cell.setFontWeight("bold");
  });
}

// ── GET handler (health check) ──
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "Chae Lee Apps Script is live ✨" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ────────────────────────────────────────────────────────────────
// ANALYTICS SHEET — run manually from Apps Script editor
// Creates a second sheet with ambassador scoring summary
// ────────────────────────────────────────────────────────────────
function buildAnalyticsSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var src = ss.getSheetByName(SHEET_NAME);
  if (!src) { Logger.log("No data sheet found."); return; }

  var existing = ss.getSheetByName("Analytics");
  if (existing) ss.deleteSheet(existing);

  var analytics = ss.insertSheet("Analytics");
  var lastRow = src.getLastRow();
  if (lastRow < 2) { Logger.log("No submissions yet."); return; }

  var data = src.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();

  // ── Top 10 Candidates ──
  analytics.appendRow(["🏆 TOP 10 AMBASSADOR ADAYLARI"]);
  analytics.appendRow(["Ad Soyad", "Instagram", "Şehir", "Takipçi", "İçerik", "Engagement", "Brand Fit", "Camera", "Luxury", "TOPLAM"]);

  var scored = data.map(function(row) {
    var total = (row[22] || 0) + (row[23] || 0) + (row[24] || 0) + (row[25] || 0);
    return row.concat([total]);
  });

  scored.sort(function(a, b) { return b[26] - a[26]; });

  scored.slice(0, 10).forEach(function(row) {
    analytics.appendRow([
      row[1], row[6], row[5], row[8], row[9],
      row[22], row[23], row[24], row[25], row[26]
    ]);
  });

  analytics.appendRow([""]);

  // ── City distribution ──
  analytics.appendRow(["📍 ŞEHİR DAĞILIMI"]);
  analytics.appendRow(["Şehir", "Başvuru Sayısı"]);
  var cities = {};
  data.forEach(function(row) {
    var city = (row[5] || "Bilinmiyor").trim();
    cities[city] = (cities[city] || 0) + 1;
  });
  Object.keys(cities).forEach(function(city) {
    analytics.appendRow([city, cities[city]]);
  });

  analytics.appendRow([""]);

  // ── Content type breakdown ──
  analytics.appendRow(["📊 İÇERİK TÜRÜ DAĞILIMI"]);
  analytics.appendRow(["İçerik Türü", "Kişi Sayısı"]);
  var types = {};
  data.forEach(function(row) {
    var t = (row[9] || "Bilinmiyor").trim();
    types[t] = (types[t] || 0) + 1;
  });
  Object.keys(types).forEach(function(t) {
    analytics.appendRow([t, types[t]]);
  });

  analytics.appendRow([""]);

  // ── Follower distribution ──
  analytics.appendRow(["👥 TAKİPÇİ DAĞILIMI"]);
  analytics.appendRow(["Aralık", "Kişi Sayısı"]);
  var followers = {};
  data.forEach(function(row) {
    var f = (row[8] || "Bilinmiyor").trim();
    followers[f] = (followers[f] || 0) + 1;
  });
  ["0–1K", "1K–5K", "5K–10K", "10K–50K", "50K+"].forEach(function(range) {
    analytics.appendRow([range, followers[range] || 0]);
  });

  analytics.appendRow([""]);

  // ── Summary stats ──
  analytics.appendRow(["📈 GENEL İSTATİSTİKLER"]);
  analytics.appendRow(["Toplam Başvuru", data.length]);
  var withBrandExp = data.filter(function(r) { return r[11] === "Evet"; }).length;
  analytics.appendRow(["Marka Deneyimli", withBrandExp]);
  var highEngagement = data.filter(function(r) { return (r[22] || 0) >= 60; }).length;
  analytics.appendRow(["Yüksek Engagement (≥60)", highEngagement]);
  var cameraReady = data.filter(function(r) { return r[16] === "Çok rahatım"; }).length;
  analytics.appendRow(["Kamera Hazır Creator", cameraReady]);
  var eventReady = data.filter(function(r) { return r[13] === "Evet kesinlikle"; }).length;
  analytics.appendRow(["Etkinlik İçerik Üretici", eventReady]);

  // Style
  var topRange = analytics.getRange(1, 1, 1, 1);
  topRange.setFontSize(14);
  topRange.setFontWeight("bold");
  topRange.setFontColor("#C4869B");

  Logger.log("Analytics sheet created successfully ✨");
}
