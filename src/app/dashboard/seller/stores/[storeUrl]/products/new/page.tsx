import { db } from "@/lib/db";
import { getAllCategories } from "@/queries/category";

export default async function SellerNewProductsPage({
    params,
}: {
  params: { storeUrl: string };
}) {
    const categories = await getAllCategories();
    return(
        <div className="w-full">
      {/* <ProductDetails
        categories={categories}
        storeUrl={params.storeUrl}
        // offerTags={offerTags}
        // countries={countries}
      /> */}
    </div>
    )
}