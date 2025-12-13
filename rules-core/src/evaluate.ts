// ---- Types ----

export type Order = {
  totals: {
    subtotal: number;
    shipping: number;
    tax: number;
  };
  customer: {
    isMember: boolean;
  };
};

export type PromotionRule = {
  id: string;
  priority: number;
  applies: (order: Order) => boolean;
  applyDiscount: (order: Order) => number;
};

// ---- Engine ----

export function evaluatePromotions(
  rules: PromotionRule[],
  order: Order
) {
  const sorted = [...rules].sort((a, b) => a.priority - b.priority);

  for (const rule of sorted) {
    if (rule.applies(order)) {
      const discount = rule.applyDiscount(order);
      return {
        applied: true,
        ruleId: rule.id,
        discount,
      };
    }
  }

  return {
    applied: false,
    discount: 0,
  };
}
