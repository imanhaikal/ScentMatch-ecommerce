import type { PrototypeOrderSummary } from "@/lib/checkout/order";
import type { ScentQuizAnswers } from "@/lib/scentmatch/matcher";

export interface AccountUser {
  id: string;
  name: string;
  email: string;
  memberSince: string;
  status: string;
}

export interface StoredAccountUser extends AccountUser {
  passwordHash: string;
  scentProfile: SavedScentProfile | null;
  orders: AccountOrder[];
}

export interface AccountSession {
  userId: string;
  expiresAt: string;
}

export interface SavedScentProfile {
  answers: ScentQuizAnswers;
  summary: string;
  topMatch: {
    id: string;
    name: string;
    score: number;
  } | null;
  savedAt: string;
}

export interface OrderFeedback {
  rating: number;
  submittedAt: string;
}

export type AccountOrder = PrototypeOrderSummary & {
  feedback?: OrderFeedback;
};

export interface AccountSnapshot {
  user: AccountUser;
  scentProfile: SavedScentProfile | null;
  orders: AccountOrder[];
}

export interface AccountDatabase {
  users: StoredAccountUser[];
}
