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