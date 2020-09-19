import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100; //Tried_stripe_need_price_in_cents
  const publishableKey =
    "pk_test_51HTAtuCGg28WI1h5RBL3fiM9R1KYQsMYJzGxsV32x89N8RawLRjV9T2AJIfzPoKA7lzEOnGy4d0NO4oKHmOSeN6P00bbxxBNuK";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Succesful!");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
