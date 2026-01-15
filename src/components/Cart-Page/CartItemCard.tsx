import { Button } from "@/components/ui/button";
import { TiDelete } from "react-icons/ti";
import CartProduct from "./CartProduct";
import CartQuantity from "./CartQuantity";
import { useCart } from "../../hooks/useCart";
import { useTranslation } from "react-i18next";
import type { cartProduct } from "@/types/cart";
type CartProductProps = {
  item: cartProduct;
};
function CartItemCard({ item }: CartProductProps) {
  const { deleteFromCart } = useCart();
  const { t } = useTranslation();

  const total = (item.price * item.quantity)
    .toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    })
    .replace(/^(\D+)/, "");

  return (
    <article
      className="overflow-hidden border border-gray-200 relative grid sm:grid-cols-4 gap-3 grid-cols-1 items-center mt-7 shadow-md transition duration-300 hover:scale-[0.99] p-3 md:p-6 rounded-md"
      aria-label={`Product: ${item.title}`}
    >
      <Button
        onClick={() => deleteFromCart(item.key)}
        aria-label={`Remove ${item.title} from cart`}
        className="absolute left-0 top-0 bg-transparent flex justify-center items-center"
      >
        <TiDelete className="text-h1 text-main" />
      </Button>

      <CartProduct item={item} />

      <h4 className="text-body md:text-h4 text-center font-semibold">
        <span className="text-main sm:hidden">{t("price")}: </span>${item.price}
      </h4>

      <div className="flex sm:justify-center justify-between items-center gap-5">
        <span className="max-sm:flex gap-3 sm:justify-end justify-center font-semibold text-body md:text-h4 hidden">
          <span className="sm:hidden text-main font-semibold">
            {t("total")}:
          </span>{" "}
          ${total}
        </span>
        <CartQuantity item={item} />
      </div>

      <span className="flex justify-center font-semibold text-body-sm md:text-body max-sm:hidden">
        <span className="sm:hidden text-main font-semibold">
          {" "}
          {t("total")}:
        </span>{" "}
        ${total}
      </span>
    </article>
  );
}

export default CartItemCard;
