import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,

  fields: [
    // Basic Fields
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 100 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: "discountPrice",
      title: "Discount Price",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "discountPercentage",
      title: "Discount Percentage",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [{ type: "image" }],
      options: { layout: "grid" },
      validation: (Rule) => Rule.required().min(1),
    }),

    // Category
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }],
    }),

    // -------------------------------------
    // 🔥 Variants — Color
    // -------------------------------------
    defineField({
      name: "colorVariants",
      title: "Color Variants",
      type: "array",
      of: [
        {
          type: "object",
          name: "colorVariant",
          fields: [
            defineField({
              name: "color",
              title: "Color",
              type: "string",
              options: {
                list: [
                  "Black",
                  "White",
                  "Red",
                  "Blue",
                  "Green",
                  "Yellow",
                  "Grey",
                  "Pink",
                ],
              },
            }),

            defineField({
              name: "stock",
              title: "Stock",
              type: "number",
              validation: (Rule) => Rule.min(0).required(),
            }),

            defineField({
              name: "additionalPrice",
              title: "Additional Price",
              type: "number",
              validation: (Rule) => Rule.min(0),
            }),
          ],
          preview: {
            select: { title: "color", stock: "stock" },
            prepare({ title, stock }) {
              return {
                title: `${title}`,
                subtitle: `Stock: ${stock}`,
              };
            },
          },
        },
      ],
    }),

    // -------------------------------------
    // 🔥 Variants — Size Labels (S, M, L…)
    // -------------------------------------
    defineField({
      name: "sizeVariants",
      title: "Size Label Variants",
      type: "array",
      of: [
        {
          type: "object",
          name: "sizeVariant",
          fields: [
            defineField({
              name: "sizeLabel",
              title: "Size Label",
              type: "string",
              options: {
                list: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
              },
            }),

            defineField({
              name: "stock",
              title: "Stock",
              type: "number",
              validation: (Rule) => Rule.min(0).required(),
            }),

            defineField({
              name: "additionalPrice",
              title: "Additional Price",
              type: "number",
              validation: (Rule) => Rule.min(0),
            }),
          ],
          preview: {
            select: { title: "sizeLabel", stock: "stock" },
            prepare({ title, stock }) {
              return {
                title,
                subtitle: `Stock: ${stock}`,
              };
            },
          },
        },
      ],
    }),

    // -------------------------------------
    // 🔥 Variants — Inches (28, 30…)
    // -------------------------------------
    defineField({
      name: "sizeInchesVariants",
      title: "Size (In Inches)",
      type: "array",
      of: [
        {
          type: "object",
          name: "inchesVariant",
          fields: [
            defineField({
              name: "sizeInches",
              title: "Inches",
              type: "number",
              description: "Example: 28, 30, 32, 34",
              validation: (Rule) => Rule.min(0),
            }),

            defineField({
              name: "stock",
              title: "Stock",
              type: "number",
              validation: (Rule) => Rule.min(0).required(),
            }),

            defineField({
              name: "additionalPrice",
              title: "Additional Price",
              type: "number",
              validation: (Rule) => Rule.min(0),
            }),
          ],

          preview: {
            select: { title: "sizeInches", stock: "stock" },
            prepare({ title, stock }) {
              return {
                title: `${title} inches`,
                subtitle: `Stock: ${stock}`,
              };
            },
          },
        },
      ],
    }),

    // -------------------------------------
    // Other fields
    // -------------------------------------
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.min(0).max(5),
    }),

    defineField({
      name: "stock",
      title: "Total Stock",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "isNew",
      title: "New Product",
      type: "boolean",
    }),

    defineField({
      name: "isFeatured",
      title: "Featured Product",
      type: "boolean",
    }),

    defineField({
      name: "totalSales",
      title: "Total Sales",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "isHotDeal",
      title: "Hot Deal",
      type: "boolean",
    }),

    defineField({
      name: "isBestSelling",
      title: "Best Selling",
      type: "boolean",
    }),

    // SEO
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
    }),

    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
    }),
  ],

  preview: {
    select: {
      title: "name",
      price: "price",
      images: "images",
    },
    prepare({ title, price, images }) {
      return {
        title,
        subtitle: `৳${price}`,
        media: images?.[0],
      };
    },
  },
});
