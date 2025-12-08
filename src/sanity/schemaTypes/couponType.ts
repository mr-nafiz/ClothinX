// schemas/coupon.ts
import { TicketPercent } from "lucide-react";
import { defineField, defineType, NumberRule, Rule, StringRule } from "sanity";

export const couponType = defineType({
  name: "coupon",
  title: "Coupon",
  type: "document",
  icon: TicketPercent,
  fields: [
    defineField({
      name: "code",
      title: "Coupon Code",
      type: "string",
      validation: (Rule: StringRule) => Rule.required().uppercase(),
    }),

    defineField({
      name: "discountType",
      title: "Discount Type",
      type: "string",
      options: {
        list: ["percentage", "fixed"],
      },
      validation: (Rule: StringRule) => Rule.required(),
    }),

    defineField({
      name: "discountValue",
      title: "Discount Amount",
      type: "number",
      validation: (Rule: NumberRule) => Rule.required().positive(),
    }),

    defineField({
      name: "expiresAt",
      title: "Expires At",
      type: "datetime",
    }),

    defineField({
      name: "minOrder",
      title: "Minimum Order Value",
      type: "number",
    }),

    defineField({
      name: "maxUses",
      title: "Maximum Uses",
      type: "number",
    }),

    defineField({
      name: "currentUses",
      title: "Current Uses",
      type: "number",
      initialValue: 0,
    }),
  ],
});
