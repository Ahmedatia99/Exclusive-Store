import { useWishlist } from "@/hooks/WishListContext/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useProducts } from "../../hooks/useProducts";
import WishlistButtons from "./WishlistButtons";
import ConfirmModal from "./ConfirmModal";
import { toCartProduct } from "@/utils/ProductDTO";
import { LoadingSpinner } from "@/components/common/Loading";

function FavouriteActions() {
  const { wishlist, clearWishlist } = useWishlist();
  const { addManyToCart } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const { products, loading, error } = useProducts();
  //handel loading
  if (loading) return <LoadingSpinner fullScreen={false} size={25} />;
  //handel error
  if (error)
    return <p className="text-red-500">{t("Failed to load products")}</p>;

  //filtering data by id
  const favouriteProducts = products.filter((p) => wishlist.includes(p.id));

  const handleConfirm = () => {
    if (favouriteProducts.length === 0) return;

    const productsToAdd = favouriteProducts.map(
      (product) => toCartProduct(product) // used cartDTO type
    );

    addManyToCart(productsToAdd);
    clearWishlist();
    setShowModal(false);
    navigate("/cart");
  };

  return (
    <>
      <WishlistButtons
        wishlist={wishlist}
        clearWishlist={clearWishlist}
        onMoveAll={() => setShowModal(true)}
      />

      <ConfirmModal
        show={showModal}
        count={favouriteProducts.length}
        onCancel={() => setShowModal(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default FavouriteActions;
