/* ============================================================
   ROOTED & RADIANT — SITE CONFIG
   Edit ONLY this file to connect your real accounts.
   The site will still run without them, just with reduced
   functionality (see notes on each setting).
   ============================================================ */

const CONFIG = {

  // ---- 1. WHERE BOOKING NOTIFICATIONS GET EMAILED ----------
  // The address that gets an email every time someone reserves.
  // Uses formsubmit.co — a free service, no backend needed.
  // Your FIRST booking will trigger a one-time "confirm your
  // email" message from formsubmit.co — click it once and
  // every reservation after that arrives automatically.
  STYLIST_EMAIL: "mihlali.ncayo@icloud.com",

  // ---- 2. GOOGLE MAPS (live address search + pin) -----------
  // Get a key at https://console.cloud.google.com/google/maps-apis
  // Enable: "Places API" and "Maps JavaScript API".
  // Without a real key, the address field still works as a
  // normal text box — it just won't autocomplete or show a pin.
  GOOGLE_MAPS_API_KEY: "YOUR_GOOGLE_MAPS_API_KEY",

  // ---- 3. PAYFAST (deposit payments) -------------------------
  // From your PayFast merchant dashboard: Settings > Integration.
  // Keep MODE as "sandbox" while testing, switch to "live" once
  // your real merchant account is approved.
  PAYFAST_MODE: "sandbox", // "sandbox" or "live"
  PAYFAST_MERCHANT_ID: "10000100",
  PAYFAST_MERCHANT_KEY: "46f0cd694581a",

  // Where PayFast sends the client after paying / cancelling.
  // Point these at pages on your live site once it's hosted.
  PAYFAST_RETURN_URL: "https://rootedandradiant.co.za/thank-you.html",
  PAYFAST_CANCEL_URL: "https://rootedandradiant.co.za/book.html",
  PAYFAST_NOTIFY_URL: "https://rootedandradiant.co.za/payfast-notify",

  // ---- 4. BUSINESS BASICS ------------------------------------
  BUSINESS_NAME: "Rooted & Radiant",
  BUSINESS_CITY: "Pretoria",
  BUSINESS_PHONE: "072 703 1053",

  // ---- 5. PORTFOLIO OWNER SIGN-IN ----------------------------
  // A simple password so only you can add/remove portfolio photos
  // and videos — visitors can only browse, never upload.
  // NOTE: this is a light deterrent, not real security — anyone
  // who views this file's source could read the password. It's
  // enough to stop casual visitors from touching your portfolio,
  // but for a fully secure setup later you'd want a real login
  // system with a backend. Change this to whatever you like.
  OWNER_PASSCODE: "crownedandrooted2026",
};

// Make sure CONFIG is reachable as window.CONFIG — a plain `const` at the top
// of a script doesn't automatically attach to `window`, which was silently
// breaking the studio sign-in check. This line is the fix.
window.CONFIG = CONFIG;
