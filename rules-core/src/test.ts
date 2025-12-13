import { evaluatePromotions, PromotionRule, Order } from "./evaluate";

const order: Order = {
  totals: {
    subtotal: 120,
    shipping: 10,
    tax: 0,
  },
  customer: {
    isMember: true,
  },
};

const rules: PromotionRule[] = [
  {
    id: "member-10-percent",
    priority: 1,
    applies: (o) => o.customer.isMember,
    applyDiscount: (o) => o.totals.subtotal * 0.1,
  },
];

const result = evaluatePromotions(rules, order);
console.log(result);
