import { calculateCartPricing, type CartPricingSummary } from "../cart/pricing";

export interface PrototypeOrderItem {
  id: string;
  variantId: string;
  name: string;
  artisan: string;
  price: number;
  image: string;
  quantity: number;
}

export interface PrototypeAddress {
  name: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
}

export interface CreatePrototypeOrderInput {
  items: PrototypeOrderItem[];
  shipping: PrototypeAddress;
  billingSameAsShipping: boolean;
  paymentMethod: string;
  promoCode?: string;
  now?: Date;
}

export interface PrototypeOrderSummary {
  reference: string;
  createdAt: string;
  customerEmail: string;
  shipping: PrototypeAddress;
  billingSameAsShipping: boolean;
  paymentMethod: string;
  items: PrototypeOrderItem[];
  pricing: CartPricingSummary;
}

export const PROTOTYPE_ORDER_STORAGE_KEY = "scentmatch:prototype-order:v1";

export function formatOrderReference(date = new Date()) {
  const timestamp = date.toISOString().replace(/[-:]/g, "").slice(0, 15).replace("T", "-");
  return `SM-${timestamp}`;
}

export function createPrototypeOrder(input: CreatePrototypeOrderInput): PrototypeOrderSummary {
  const items = input.items.filter((item) => item.quantity > 0);

  if (items.length === 0) {
    throw new Error("Cannot create a prototype order without cart items.");
  }

  const now = input.now ?? new Date();

  return {
    reference: formatOrderReference(now),
    createdAt: now.toISOString(),
    customerEmail: input.shipping.email,
    shipping: input.shipping,
    billingSameAsShipping: input.billingSameAsShipping,
    paymentMethod: input.paymentMethod,
    items,
    pricing: calculateCartPricing(items, input.promoCode),
  };
}
