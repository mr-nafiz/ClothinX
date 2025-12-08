import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryType";
import { addressType } from "./addressType";

import { brandType } from "./brandType";
import { orderType } from "./orderType";
import { productType } from "./productType";
import { reviewType } from "./reviewType";
import { userType } from "./userType";
import { couponType } from "./couponType";
import { cartType } from "./cartType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    addressType,
    brandType,
    orderType,
    productType,
    reviewType,
    userType,
    couponType,
    cartType,
  ],
};
