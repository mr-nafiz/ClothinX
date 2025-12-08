// schemas/cart.ts

import { ShoppingBag } from "lucide-react";
import {
  defineField,
  defineType,
  StringRule,
  ReferenceRule,
  NumberRule,
} from "sanity";

export const cartType = defineType({
  name: "cart",
  title: "Cart",
  type: "document",
  icon: ShoppingBag,
  fields: [
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
      validation: (Rule: StringRule) => Rule.required(),
    }),

    defineField({
      name: "items",
      title: "Items",
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
              validation: (Rule: NumberRule) => Rule.min(1).required(),
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
  ],
});
