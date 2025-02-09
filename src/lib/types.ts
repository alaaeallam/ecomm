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
// import {
//   Cart,
//   CartItem,
//   Color,
//   FreeShipping,
//   FreeShippingCountry,
//   Prisma,
//   ProductVariantImage,
//   Review,
//   ReviewImage,
//   ShippingAddress,
//   ShippingRate,
//   Size,
//   User,
//   Country as CountryPrisma,
//   Coupon,
//   Store,
//   OrderGroup,
//   OrderItem,
//   Category,
//   SubCategory,
//   ShippingFeeMethod,
// } from "@prisma/client";
// import countries from "@/data/countries.json";
// import { getOrder } from "@/queries/order";
// import {
//   getUserOrders,
//   getUserPayments,
//   getUserWishlist,
// } from "@/queries/profile";
import { string } from "zod";
// import { getHomeFeaturedCategories } from "@/queries/home";

export interface DashboardSidebarMenuInterface {
  label: string;
  icon: string;
  link: string;
}
