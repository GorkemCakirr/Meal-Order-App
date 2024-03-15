import {useContext} from "react";
import {MealContext} from "../store/meal-order-context";
import {useRef, useState} from "react";

export default function Form({openSuccess}) {
  const {totalPrice, closeCart} = useContext(MealContext);

  function handleFormSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    console.log(data);

    openSuccess();
  }

  return (
    <div>
      <h3>Checkout</h3>
      <p>Total Amount: ${totalPrice}</p>
      <form onSubmit={handleFormSubmit}>
        <div className="control">
          <label htmlFor="name">Full Name</label>
          <input name="name" required />
          <div></div>
          <label htmlFor="email">E-mail Address</label>
          <input name="email" required />
          <label htmlFor="name">Street</label>
          <input name="street" required />
          <div className="control-row">
            <div>
              <label bna htmlFor="name" required>
                Postal Code
              </label>
              <input type="number" name="postalCode" />
            </div>
            <div>
              <label htmlFor="name" required>
                City
              </label>
              <input name="city" />
            </div>
          </div>
          <div className="control-row">
            <button onClick={closeCart} className="button">
              Close
            </button>
            <button className="button">Submit Order</button>
          </div>
        </div>
      </form>
    </div>
  );
}
