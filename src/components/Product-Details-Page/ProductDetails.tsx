import Breadcrumbs from "./../common/Breadcrumbs";
import HeroProductDetails from "./HeroProductDetails";
import BestProducts from "@/components/Home-Page/Best-Selling-Products-Section/BestProducts";
import SEO from "@/components/common/SEO";
import { useProductByID } from "@/hooks/productsCustomHook/useProductById";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const { product } = useProductByID(Number(id));

  // Check if product is in stock by checking colors quantity
  const isInStock = product?.colors.some(color => color.quantity > 0) ?? false;

  return (
    <>
      {product && (
        <SEO
          title={product.title}
          description={product.description || `Shop ${product.title} at Exclusive. ${product.discountPrice ? `Special price: $${product.discountPrice}` : `Price: $${product.price}`}`}
          keywords={`${product.title}, ${product.category || 'product'}, exclusive deals, online shopping`}
          type="product"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.title,
            "description": product.description || product.title,
            "image": product.mainImgSRC,
            "offers": {
              "@type": "Offer",
              "price": product.discountPrice || product.price,
              "priceCurrency": "USD",
              "availability": isInStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            },
            "aggregateRating": product.avgRate ? {
              "@type": "AggregateRating",
              "ratingValue": product.avgRate,
              "reviewCount": product.ratingCount
            } : undefined
          }}
        />
      )}
      <div className="px-3 md:px-5">
        <Breadcrumbs />
        <HeroProductDetails />
        <BestProducts />
      </div>
    </>
  );
};

export default ProductDetails;
