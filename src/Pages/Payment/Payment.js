import React, { useContext, useState } from "react";
import classes from "../Payment/payment.module.css";
import Layout from "../../Components/LayOut/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/Firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/ActionType";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  // console.log(user);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e);
    e.error?.message ? setCardError(e?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // 1   //backed || functions -----> contact yo the  client secret

      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      //2    //client side (react side  confirmation)

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log(paymentIntent);

      //3   // after confirmation ---> firestore database save, clear basket

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      //empty basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <Layout>
      {/* {header} */}
      <div className={classes.Payment_header}>Checkout ({totalItem}) items</div>

      {/* {payment method} */}

      <section className={classes.Payment}>
        {/* {address} */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
        </div>

        <div>{user?.email}</div>
        <div>123 React Lane</div>
        <div>Chicago, IL</div>

        <hr />

        {/* {product} */}
        <div className={classes.flex}>
          <h3>Review item and Delivery</h3>
          <div>
            {basket?.map((item, i) => (
              <ProductCard key={i} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* {card form} */}
        <div className={classes.flex}>
          <h3> Payment method</h3>
          <div div className={classes.Payment_card_container}>
            <div className={classes.Payment_details}>
              <form onSubmit={handlePayment}>
                {/* {error} */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                {/* {card element} */}
                <CardElement onChange={handleChange} />

                {/* {price} */}
                <div className={classes.Payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p> Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>

                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
