export type Segment = "unbanked" | "recently_banked" | "vulnerable" | "functional";

export interface LegalRef {
  ref: string;
  title: string;
  quote: string;
  url: string;
}

export interface Recommendation {
  id: string;
  title: string;
  trigger: string;
  action: string;
  priority: number;
  legal?: LegalRef;
}

export interface Debt {
  institution: string;
  product: string;
  balance: number;
  interest_rate: number;
  monthly_payment: number;
  past_due: boolean;
  priority: number;
  action: string;
}

export interface Alternative {
  institution: string;
  product: string;
  cae: number;
  monthly_savings: number;
  term_months: number;
}

export interface Alert {
  id: string;
  icon: "rate" | "sernac" | "law" | "consumer";
  title: string;
  description: string;
  date_relative: string;
  source: string;
  url: string;
}

export interface IngestResult {
  anon_id: string;
  avatar: { name: string; image_url: string };
  segment: Segment;
  features: {
    total_debt: number;
    consumo_ratio: number;
    past_due_ratio: number;
    num_institutions: number;
    num_refinancings: number;
    has_mortgage: boolean;
    carga_financiera_pct: number;
    dominant_signal: string;
  };
  recommendations: Recommendation[];
  income_estimate?: number;
  monthly_payment?: number;
  debts?: Debt[];
  alternatives?: Alternative[];
  alerts?: Alert[];
  concierge_intro?: string;
}
