// import {
//   getAllStoreProducts,
//   getProductPageData,
//   getProducts,
//   getRatingStatistics,
//   getShippingDetails,
//   retrieveProductDetails,
// } from "@/queries/product";
// import {
//   getAllStores,
//   getStoreDefaultShippingDetails,
//   getStoreOrders,
//   getStorePageDetails,
// } from "@/queries/store";
// import { getAllSubCategories } from "@/queries/subCategory";
import {
  Prisma,
} from "@prisma/client";

import { getAllSubCategories } from "@/queries/subCategory";

// import { getHomeFeaturedCategories } from "@/queries/home";

export interface DashboardSidebarMenuInterface {
  label: string;
  icon: string;
  link: string;
}
// SubCategory + parent category
export type SubCategoryWithCategoryType = Prisma.PromiseReturnType<
  typeof getAllSubCategories
>[0];

// Product + variant
export type ProductWithVariantType = {
  productId: string;
  variantId: string;
  name: string;
  description: string;
  variantName: string;
  variantDescription: string;
  images: { id?: string; url: string }[];
  variantImage: string;
  categoryId: string;
  offerTagId: string;
  subCategoryId: string;
  isSale: boolean;
  saleEndDate?: string;
  brand: string;
  sku: string;
  weight: number;
  colors: { id?: string; color: string }[];
  sizes: {
    id?: string;
    size: string;
    quantity: number;
    price: number;
    discount: number;
  }[];
  product_specs: { id?: string; name: string; value: string }[];
  variant_specs: { id?: string; name: string; value: string }[];
  keywords: string[];
  questions: { id?: string; question: string; answer: string }[];
  freeShippingForAllCountries: boolean;
  freeShippingCountriesIds: { id?: string; label: string; value: string }[];
  createdAt: Date;
  updatedAt: Date;
};
