import Header from "./Header";
import Meals from "./Meals";
import Form from "./Form";
import Modal from "./Modal";
import {useContext, useState} from "react";
import {MealContext} from "../store/meal-order-context";

export default function Control() {
  const [formIsFinished, setFormIsFinished] = useState(false);
  function finishForm() {
    setFormIsFinished(true);
  }

  const {
    selectedMeals,
    totalPrice,
    isCheckoutOpen,
    isCartOpen,
    decrementMeal,
    incrementMeal,
    closeCart,
    openCart,
    handleCheckout,
  } = useContext(MealContext);

  const order = selectedMeals.map((meal) => {
    let index = selectedMeals.indexOf(meal);
    let count = selectedMeals[index].count;

    return (
      <li className="cart-item" key={meal.id}>
        <p>
          {meal.name} {count} x {meal.price}
        </p>
        <div className="cart-item-actions">
          <button onClick={() => decrementMeal(index)}>-</button>
          {count}
          <button onClick={() => incrementMeal(index)}>+</button>
        </div>
      </li>
    );
  });

  function handleCloseCart() {
    closeCart();
    setFormIsFinished(false);
  }

  let modal;

  if (isCartOpen) {
    if (isCheckoutOpen) {
      modal = (
        <Modal className="cart-total">
          {formIsFinished ? (
            <div>
              <h3>Success!</h3>
              <p>Your order was submitted succesfully.</p>
              <p>
                We will get back to you with more details via email within the
                next few minutes
              </p>
              <button onClick={handleCloseCart} className="button">
                Okay
              </button>
            </div>
          ) : (
            <Form openSuccess={finishForm} />
          )}
        </Modal>
      );
    } else {
      modal = (
        <Modal className="cart-total">
          <div>
            <h3>Your Cart</h3>
            {order}
            <p className="cart-item">${totalPrice}</p>
            <button onClick={closeCart} className="button">
              Close
            </button>
            <button onClick={handleCheckout} className="button">
              Go to Checkout
            </button>
          </div>
        </Modal>
      );
    }
  } else {
    null;
  }

  return (
    <>
      {modal}
      <div id="main-header">
        <Header />
        <button onClick={openCart} className="button">
          Cart ({selectedMeals.length})
        </button>
      </div>
      <Meals />
    </>
  );
}
