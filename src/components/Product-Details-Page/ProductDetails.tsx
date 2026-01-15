import Breadcrumbs from "./../common/Breadcrumbs";
import HeroProductDetails from "./HeroProductDetails";
import BestProducts from "@/components/Home-Page/Best-Selling-Products-Section/BestProducts";

const ProductDetails = () => {
  return (
    <div className="px-3 md:px-5">
      <Breadcrumbs />
      <HeroProductDetails />
      <BestProducts />
    </div>
  );
};

export default ProductDetails;
