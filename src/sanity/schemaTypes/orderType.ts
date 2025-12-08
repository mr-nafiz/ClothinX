import { BasketIcon } from "@sanity/icons";
import {
  defineArrayMember,
  defineField,
  defineType,
  NumberRule,
  ReferenceRule,
  Rule,
  StringRule,
} from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
      validation: (Rule: StringRule) => Rule.required(),
    }),

    defineField({
      name: "items",
      title: "Order Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
              validation: (Rule: ReferenceRule) => Rule.required(),
            }),

            defineField({
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule: NumberRule) => Rule.required().min(1),
            }),

            defineField({
              name: "variant",
              title: "Variant",
              type: "object",
              fields: [
                defineField({ name: "color", type: "string", title: "Color" }),
                defineField({
                  name: "sizeInches",
                  type: "string",
                  title: "Size (In Inches)",
                }),
                defineField({
                  name: "sizeLabel",
                  type: "string",
                  title: "Size Label",
                }),
              ],
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "address",
      title: "Shipping Address",
      type: "reference",
      to: [{ type: "address" }],
      validation: (Rule: ReferenceRule) => Rule.required(),
    }),

    defineField({
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
      validation: (Rule: NumberRule) => Rule.required(),
    }),

    defineField({
      name: "paymentStatus",
      title: "Payment Status",
      type: "string",
      options: {
        list: ["pending", "paid", "failed"],
      },
      initialValue: "pending",
    }),

    defineField({
      name: "orderStatus",
      title: "Order Status",
      type: "string",
      options: {
        list: ["processing", "shipped", "delivered", "cancelled"],
      },
      initialValue: "processing",
    }),

    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
