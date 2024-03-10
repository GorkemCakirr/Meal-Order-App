import Header from "./Header";
import Meals from "./Meals";

import Modal from "./Modal";
import {useContext, useState,useEffect} from "react";
import {MealContext} from "../store/meal-order-context";

export default function Control() {
  const [totalPrice, setTotalPrice] = useState([]);

  const {selectedMeals, decrementMeal, incrementMeal, closeCart, openCart} =
    useContext(MealContext);

  //   case "TOTAL_PRİCE":
  //     return {
  //       ...state,
  //       totalPrice: action.payload,
  //     };
  useEffect(() => {
      function mealPrice() {
        const price = selectedMeals.map((meal) => {
          let total = meal.price * meal.count;
          return total;
        });
        let lastPrice = 0;
        price.map((item) => {
          lastPrice += item;
          return lastPrice;
        });
       setTotalPrice(lastPrice)
      }

      mealPrice();
    }, [selectedMeals]);


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
  let length = selectedMeals.length;
  return (
    <>
      {length ? (
        <Modal className="cart-total">
          <div>
            <h3>Your Cart</h3>
            {order}
            <p className="cart-item">${totalPrice}</p>
            <button onClick={closeCart} className="button">
              Close
            </button>
          </div>
        </Modal>
      ) : null}

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
