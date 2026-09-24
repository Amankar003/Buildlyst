/**
 * Centralized Pricing Configuration for Buildlyst Project Scoping Assistant.
 *
 * All pricing is rules-based and deterministic — Groq never generates prices.
 * Groq only provides: recommended solution name + complexity ("low" | "medium" | "high").
 *
 * To update pricing, edit the constants below. No other files need to change.
 */

// ── Solution Base Pricing (INR) ─────────────────────────────
// Maps each Groq-recommended solution name → [minINR, maxINR]

export const SOLUTION_PRICING: Record<string, [number, number]> = {
  // AI Agents & Automation (₹80,000 – ₹2,00,000+)
  "WhatsApp AI Qualification Agent":   [80_000,  1_20_000],
  "Lead Intelligence + CRM Automation": [90_000, 1_40_000],
  "Full AI Sales Workflow":            [1_00_000, 1_60_000],
  "Customer Support Agent":            [85_000,  1_40_000],
  "Sales/Revenue Agent":               [1_00_000, 1_50_000],
  "Autonomous AI Agent":               [1_20_000, 2_00_000],
  "Workflow Automation":               [80_000,  1_30_000],

  // Generative AI & RAG (₹70,000 – ₹1,80,000+)
  "RAG / Knowledge Assistant":         [80_000, 1_50_000],
  "AI Document Processing":            [70_000, 1_30_000],
  "Custom LLM Pipeline":               [1_00_000, 1_80_000],

  // Machine Learning & Predictive AI (₹60,000 – ₹1,40,000+)
  "Predictive ML System":              [80_000, 1_40_000],
  "Computer Vision":                   [1_00_000, 1_40_000],
  "Data Analytics Model":              [60_000, 1_00_000],

  // Data Engineering & Analytics (₹40,000 – ₹1,20,000+)
  "Data Pipeline":                     [40_000,  80_000],
  "Unified Data Pipeline":             [60_000, 1_00_000],
  "Data Warehouse / Analytics":        [80_000, 1_20_000],
  "AI Insight Dashboard":              [70_000, 1_20_000],

  // AI Product Engineering (₹30,000 – ₹1,00,000+)
  "Business Website":                  [30_000,  50_000],
  "CMS + Marketing Site":              [30_000,  60_000],
  "Web Application Build":             [50_000,  90_000],
  "E-commerce Platform":               [60_000, 1_00_000],
  "Custom E-Commerce Platform":        [60_000, 1_00_000],
  "SaaS Platform":                     [80_000, 1_00_000],

  // Catch-all / fallback solutions
  "Custom System Architecture":        [50_000, 1_00_000],
  "Tech Stack Consultation":           [30_000,  50_000],
  "Custom Solution":                   [50_000, 1_00_000],
};

export const DEFAULT_SOLUTION_RANGE: [number, number] = [50_000, 1_00_000];


// ── Integration Cost Groups (INR) ───────────────────────────
// Each integration belongs to a tier with a fixed cost increment [min, max].

type IntegrationTier = "simple" | "medium" | "complex";

interface IntegrationTierConfig {
  addMin: number;
  addMax: number;
}

export const INTEGRATION_TIER_COSTS: Record<IntegrationTier, IntegrationTierConfig> = {
  simple:  { addMin: 5_000,  addMax: 10_000 },
  medium:  { addMin: 10_000, addMax: 20_000 },
  complex: { addMin: 20_000, addMax: 35_000 },
};

export const INTEGRATION_TIER_MAP: Record<string, IntegrationTier> = {
  // Simple
  "Google Sheets": "simple",
  "Email":         "simple",
  "Analytics":     "simple",
  "Website":       "simple",

  // Medium
  "CRM":             "medium",
  "Calendar":        "medium",
  "Helpdesk":        "medium",
  "Payment Gateway": "medium",
  "WhatsApp":        "medium",
  "Cloud":           "medium",

  // Complex
  "Custom API":      "complex",
  "Custom Database": "complex",
  "ERP":             "complex",
  "APIs":            "complex",
  "Database":        "complex",
  "Internal tools":  "complex",
  "Other":           "complex",
};


// ── Complexity Adjustment (INR, additive) ───────────────────

export const COMPLEXITY_ADJUSTMENT: Record<string, { addMin: number; addMax: number }> = {
  low:    { addMin: 0,      addMax: 0 },
  medium: { addMin: 10_000, addMax: 15_000 },
  high:   { addMin: 25_000, addMax: 40_000 },
};


// ── Timeline Adjustment (INR, additive) ─────────────────────

export const TIMELINE_ADJUSTMENT: Record<string, { addMin: number; addMax: number }> = {
  "2–4 weeks":  { addMin: 15_000, addMax: 20_000 },
  "1–2 months": { addMin: 5_000,  addMax: 10_000 },
  "2–3 months": { addMin: 0,      addMax: 0 },
  "Flexible":   { addMin: 0,      addMax: 0 },
};


// ── Caps & Conversion ───────────────────────────────────────

/** Threshold where we display custom enterprise quote */
export const ENTERPRISE_THRESHOLD_INR = 5_00_000;

/** Total integration add-on cap. */
export const INTEGRATION_CAP_INR = 1_50_000;

/** Fixed divisor for INR → USD (no external API). */
export const INR_TO_USD_DIVISOR = 83;

/** After the first N integrations, subsequent ones are charged at this fraction. */
const DIMINISHING_RETURN_THRESHOLD = 3;
const DIMINISHING_RETURN_FACTOR = 0.6;


// ── Main Pricing Function ───────────────────────────────────

export interface PricingInput {
  solutionName: string;
  integrations: string[];
  complexity: string;       // "low" | "medium" | "high"
  timeline: string;
  currency: "INR" | "USD";
}

export interface PricingResult {
  minINR: number;
  maxINR: number;
  min: number;              // in selected currency
  max: number;              // in selected currency
  formatted: string;        // e.g. "₹1.2L – ₹2.5L" or "$1,400 – $3,000"
}

export function calculateEstimatedInvestment(input: PricingInput): PricingResult {
  // 1. Solution base range
  const [baseMin, baseMax] = SOLUTION_PRICING[input.solutionName] ?? DEFAULT_SOLUTION_RANGE;

  // 2. Integration increments (with diminishing returns after threshold)
  let intAddMin = 0;
  let intAddMax = 0;
  const integrations = input.integrations.filter(Boolean);

  integrations.forEach((name, idx) => {
    const tier = INTEGRATION_TIER_MAP[name] ?? "complex";
    const costs = INTEGRATION_TIER_COSTS[tier];
    const factor = idx < DIMINISHING_RETURN_THRESHOLD ? 1 : DIMINISHING_RETURN_FACTOR;
    intAddMin += Math.round(costs.addMin * factor);
    intAddMax += Math.round(costs.addMax * factor);
  });

  // Cap integration add-on
  intAddMin = Math.min(intAddMin, INTEGRATION_CAP_INR);
  intAddMax = Math.min(intAddMax, INTEGRATION_CAP_INR);

  // 3. Complexity adjustment
  const complexKey = (input.complexity || "medium").toLowerCase();
  const complexAdj = COMPLEXITY_ADJUSTMENT[complexKey] ?? COMPLEXITY_ADJUSTMENT["medium"];

  // Anti-Double Charging Logic:
  // If a project has many integrations, it inherently requires complexity.
  // We reduce the explicit technical complexity penalty by 50% if they already have 2+ integrations
  // to avoid double-charging for the exact same underlying effort.
  let effectiveComplexAdj = { ...complexAdj };
  if (integrations.length >= 2) {
    effectiveComplexAdj.addMin = Math.round(effectiveComplexAdj.addMin * 0.5);
    effectiveComplexAdj.addMax = Math.round(effectiveComplexAdj.addMax * 0.5);
  }

  // 4. Timeline adjustment
  const timeAdj = TIMELINE_ADJUSTMENT[input.timeline] ?? { addMin: 0, addMax: 0 };

  // 5. Sum everything
  let totalMin = baseMin + intAddMin + effectiveComplexAdj.addMin + timeAdj.addMin;
  let totalMax = baseMax + intAddMax + effectiveComplexAdj.addMax + timeAdj.addMax;

  // 7. Ensure min < max
  if (totalMin > totalMax) {
    totalMax = totalMin;
  }

  const minINR = totalMin;
  const maxINR = totalMax;

  // 8. Output Formatting and Caps
  let min: number;
  let max: number;
  let formatted: string;

  if (input.currency === "USD") {
    min = Math.round(minINR / INR_TO_USD_DIVISOR);
    max = Math.round(maxINR / INR_TO_USD_DIVISOR);
    const usdThreshold = Math.round(ENTERPRISE_THRESHOLD_INR / INR_TO_USD_DIVISOR);
    
    if (max > usdThreshold) {
      formatted = `$${usdThreshold.toLocaleString("en-IN")}+ — Custom Enterprise Quote`;
    } else {
      formatted = `$${min.toLocaleString("en-IN")} – $${max.toLocaleString("en-IN")}`;
    }
  } else {
    min = minINR;
    max = maxINR;
    
    if (maxINR > ENTERPRISE_THRESHOLD_INR) {
      formatted = `₹5L+ — Custom Enterprise Quote`;
    } else {
      formatted = `${formatINR(minINR)} – ${formatINR(maxINR)}`;
    }
  }

  return { minINR, maxINR, min, max, formatted };
}


// ── Formatting Helpers ──────────────────────────────────────

function formatINR(num: number): string {
  if (num >= 1_00_000) {
    const lakhs = num / 1_00_000;
    // Show "₹1L" for whole numbers, "₹1.2L" for decimals
    return lakhs % 1 === 0 ? `₹${lakhs}L` : `₹${lakhs.toFixed(1)}L`;
  }
  return `₹${Math.round(num / 1000)}K`;
}
