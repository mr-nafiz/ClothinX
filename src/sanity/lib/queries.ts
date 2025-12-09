// lib/sanity/queries.ts
export const featuredQuery = `*[_type == "product" && isFeatured == true]{
_id,
name,
slug,
price,
discountPrice,
images,
rating,
stock,
category->{
  name,
  slug
},
isNew,
isHotDeal
}[0...12]`;

export const newArrivalsQuery = `*[_type == "product" && isNew == true]{
  _id,
  name,
  slug,
  price,
  discountPrice,
  images,
  rating,
  stock,
category->{
  name,
  slug
},
  isNew,
isHotDeal
}[0...12]`;

export const hotDealsQuery = `*[_type == "product" && (isHotDeal == true || discountPrice < price)]{
  _id,
  name,
  slug,
  price,
  discountPrice,
  images,
  rating,
  stock,
category->{
  name,
  slug
},
  isNew,
isHotDeal
}[0...12]`;

export const bestSellingQuery = `*[_type == "product" && isBestSelling == true] | order(totalSales desc){
  _id,
  name,
  slug,
  price,
  discountPrice,
  images,
  rating,
  stock,
category->{
  name,
  slug
},
  isNew,
isHotDeal
}[0...12]`;

export const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0]
`;
