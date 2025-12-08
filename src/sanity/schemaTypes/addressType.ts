import { HomeIcon } from "@sanity/icons";
import { House, LocateIcon } from "lucide-react";
import { defineField, defineType, Rule, StringRule } from "sanity";

// /schema/address.ts
// schemas/address.ts

export const addressType = defineType({
  name: "address",
  title: "Address",
  type: "document",
  icon: House,
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (rule: StringRule) => rule.required().min(2),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule: StringRule) =>
        Rule.required()
          .regex(/^01[3-9]\d{8}$/, { name: "BD Phone" })
          .error(
            "Invalid BD phone number (must be 11 digits starting with 01)"
          ),
    }),

    defineField({
      name: "division",
      title: "Division",
      type: "string",
      options: {
        list: [
          "Dhaka",
          "Chittagong",
          "Rajshahi",
          "Khulna",
          "Barisal",
          "Sylhet",
          "Rangpur",
          "Mymensingh",
        ],
      },
      validation: (rule: StringRule) => rule.required(),
    }),

    defineField({
      name: "district",
      title: "District",
      type: "string",
      validation: (rule: StringRule) => rule.required(),
    }),

    defineField({
      name: "upazila",
      title: "Upazila",
      type: "string",
      validation: (rule: StringRule) => rule.required(),
    }),

    defineField({
      name: "postcode",
      title: "Postcode",
      type: "string",
      validation: (rule: StringRule) => rule.required().length(4),
    }),

    defineField({
      name: "streetAddress",
      title: "Street Address",
      type: "text",
      validation: (rule: StringRule) => rule.required().min(5),
    }),

    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
      description: "User identifier from your authentication system",
      validation: (rule: StringRule) => rule.required(),
    }),
  ],
});
