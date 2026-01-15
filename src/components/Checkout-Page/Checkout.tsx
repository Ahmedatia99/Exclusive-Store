import { useCart } from "../../hooks/useCart";
import Breadcrumbs from "../common/Breadcrumbs";
import BillingForm from "./BillingForm";
import OrderSummary from "./OrderSummary";
import EmptyCartMessage from "./EmptyCartMessage";
import { useTranslation } from "react-i18next";

// ======================
// 🔹 Checkout Component
// ======================
const Checkout = () => {
  const { t } = useTranslation();

  const { cartCount } = useCart();

  // ======================
  // 🖼 Render
  // ======================
  return (
    <main
      aria-label="Checkout page"
      className="container mx-auto px-5 my-10"
      role="main"
    >
      {/* 🧭 Breadcrumb Navigation */}
      <Breadcrumbs />

      {/* Show empty cart message if no products */}
      {cartCount() === 0 ? (
        <EmptyCartMessage />
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-25 lg:gap-20 mt-10 ">
            {/* 📝 Billing Details Section */}
            <section aria-labelledby="billing-heading">
              <h1
                id="billing-heading"
                className="text-h3 font-bold mb-5 text-gray-900"
              >
                {t("billingDetails")}
              </h1>

              {/* Billing Form with validation errors */}
              <BillingForm />
            </section>

            {/* 📦 Order Summary Section */}
            <section aria-labelledby="summary-heading">
              <h2
                id="summary-heading"
                className="text-h4 font-bold mb-5 text-gray-900"
              >
                {t("orderSummary")}
              </h2>

              <OrderSummary />
            </section>
          </div>
        </>
      )}
    </main>
  );
};

export default Checkout;
