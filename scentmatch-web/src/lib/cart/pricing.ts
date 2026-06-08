export interface PricedCartItem {
  price: number;
  quantity: number;
}

export interface PromoSummary {
  code: string;
  isApplied: boolean;
  message: string;
}

export interface CartPricingSummary {
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  promo: PromoSummary;
}

const TAX_RATE = 0.06;
const SHIPPING_FEE = 15;
const FREE_SHIPPING_THRESHOLD = 350;
const PROMO_CODE = "SCENT20";
const PROMO_RATE = 0.2;

function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function normalizePromoCode(code?: string) {
  return code?.trim().toUpperCase() ?? "";
}

export function calculateCartPricing(items: PricedCartItem[], promoCode?: string): CartPricingSummary {
  const subtotal = roundMoney(
    items.reduce((acc, item) => {
      if (!Number.isFinite(item.price) || !Number.isFinite(item.quantity) || item.quantity <= 0) {
        return acc;
      }

      return acc + item.price * item.quantity;
    }, 0),
  );
  const code = normalizePromoCode(promoCode);
  const isApplied = code === PROMO_CODE && subtotal > 0;
  const discount = isApplied ? roundMoney(subtotal * PROMO_RATE) : 0;
  const taxableSubtotal = roundMoney(subtotal - discount);
  const tax = roundMoney(taxableSubtotal * TAX_RATE);
  const shipping = subtotal === 0 || taxableSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = roundMoney(taxableSubtotal + tax + shipping);

  return {
    subtotal,
    discount,
    tax,
    shipping,
    total,
    promo: {
      code,
      isApplied,
      message: getPromoMessage(code, isApplied),
    },
  };
}

function getPromoMessage(code: string, isApplied: boolean) {
  if (isApplied) {
    return "SCENT20 applied: 20% off your first artisan allocation.";
  }

  if (!code) {
    return "Add SCENT20 for 20% off your first artisan allocation.";
  }

  return `${code} is not active for this prototype. Use SCENT20.`;
}
