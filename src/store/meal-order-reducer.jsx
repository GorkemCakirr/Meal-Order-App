import {useReducer} from "react";

async function mealOrderReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedMeals = [...state.selectedMeals];
    try {
      await updateOrder(action.payload);
    } catch (error) {
      return updatedMeals;
    }

    if (updatedMeals.some((food) => food.id === action.payload.id)) {
      return updatedMeals;
    } else {
      updatedMeals.push(action.payload);
      return {
        ...state,
        selectedMeals: updatedMeals,
      };
    }
  }
  if (action.type === "CALCULATE_PRICE") {
    const price = state.selectedMeals.map((meal) => {
      let total = meal.price * meal.count;
      return total;
    });
    let lastPrice = 0;
    lastPrice = price.map((item) => {
      lastPrice += item;
      return lastPrice;
    });

    //   setTotalPrice(lastPrice.toFixed(2));
    return {
      ...state,
      totalPrice: lastPrice.toFixed(2),
    };
  }

  if (action.type === "INCREMENT") {
    const updatedCount = [...state.selectedMeals];
    updatedCount[payload].count = updatedCount[payload].count + 1;

    return {
      ...state,
      selectedMeals: updatedCount,
    };
  }

  if (action.type === "DECREMENT") {
    const updatedCount = [...state.selectedMeals];

    if (updatedCount[payload].count > 1) {
      updatedCount[payload].count = updatedCount[payload].count - 1;
      return updatedCount;
    } else {
      updatedCount.splice(payload, 1);
      return updatedCount;
    }
  }
  if (action.type === "TOTAL_PRICE") {
    const updatedMeals = [...state.selectedMeals];
    const order = updatedMeals.map((meal) => {
      let index = updatedMeals.indexOf(meal);
      let count = updatedMeals[index].count;

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
  }
  if (action.type === "OPEN_CART") {
    let openCart = state.isCartOpen;
    openCart === true;
    return {
      ...state,
      isCartOpen: openCart,
    };
  }
  if (action.type === "CLOSE_CART") {
    let closeCart = state.isCartOpen;
    closeCart === false;
    return {
      ...state,
      isCartOpen: closeCart,
    };
  }
}

export default function Reducer() {
  const [mealOrderState, mealOrderDispatch] = useReducer(mealOrderReducer, {
    selectedMeals: [],
    totalPrice: [],
    isCartOpen: [],
  });

  async function addMealToCart(meal) {
    mealOrderDispatch({
      type: "ADD_ITEM",
      payload: meal,
    });
  }

  function mealPrice() {
    mealOrderDispatch({
      type: "CALCULATE_PRICE",
    });
  }

  function incrementMeal(index) {
    mealOrderDispatch({
      type: "INCREMENT",
      payload: index,
    });
  }
  function decrementMeal(index) {
    mealOrderDispatch({
      type: "DECREMENT",
      payload: index,
    });
  }
  function totalPrice() {
    mealOrderDispatch({
      type: "TOTAL_PRICE",
    });
  }

  function openCart() {
    mealOrderDispatch({
      type: "OPEN_CART",
    });
  }
  function closeCart() {
    mealOrderDispatch({
      type: "CLOSE_CART",
    });
  }
}
