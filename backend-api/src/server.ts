import express from "express";
import cors from "cors";
import { evaluatePromotions, PromotionRule, Order } from "rules-core";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.post("/evaluate", (req, res) => {
  const order = req.body as Order;

  const rules: PromotionRule[] = [
    {
      id: "member-10-percent",
      priority: 1,
      applies: (o) => o.customer.isMember,
      applyDiscount: (o) => o.totals.subtotal * 0.1,
    },
  ];

  res.json(evaluatePromotions(rules, order));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
