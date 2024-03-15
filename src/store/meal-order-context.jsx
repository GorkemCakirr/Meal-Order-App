import {createContext, useReducer, useEffect} from "react";
import {updateOrder} from "../https";

export const INITIAL_STATE = {};

function mealOrderReducer(state, action) {
  switch (action.type) {
    case "ADD_MEAL":
      const idArray = state.selectedMeals.map((meal) => {
        return meal.id;
      });

      if (idArray.includes(action.payload.id)) {
        return {
          ...state,
        };
      } else {
        const newMeal = state.selectedMeals;
        newMeal.push(action.payload);
        let price = state.totalPrice;
        price = newMeal.reduce((meal) => {
          let total = meal.price * meal.count;
          return total;
        });

        console.log(price);
        console.log(typeof price);
        return {
          ...state,
          selectedMeals: newMeal,
          totalPrice: price,
        };
      }

    // if (state.selectedMeals.length) {
    //   state.selectedMeals.map((meal) => {
    //     if (meal.id === action.payload.id) {
    //       return;
    //     } else {
    //       const newMeal = state.selectedMeals;
    //       newMeal.push(action.payload);
    //       return {
    //         ...state,
    //         selectedMeals: newMeal,
    //       };
    //     }
    //   });
    // } else {
    //   const newMeal = state.selectedMeals;
    //   newMeal.push(action.payload);
    //   return {
    //     ...state,
    //     selectedMeals: newMeal,
    //   };
    // }

    case "ERROR":
      console.log(action.payload.message);
      return {
        ...state,
      };

    case "OPEN_CART":
      let open;

      if (state.selectedMeals.length > 0) {
        open = true;
      } else {
        open = false;
      }

      return {
        ...state,
        isCartOpen: open,
      };
    case "NULL_CART":
      let convertNull = state.isCheckoutOpen;
      convertNull = null;
      return {
        ...state,
        isCheckoutOpen: convertNull,
      };

    case "CLOSE_CART":
      return {
        ...state,
        isCartOpen: false,
        isCheckoutOpen: false,
      };

    case "INCREMENT":
      let counterInc = state.selectedMeals;
      counterInc[action.payload].count += 1;
      console.log(counterInc);
      return {
        ...state,
        selectedMeals: counterInc,
      };

    case "DECREMENT":
      let counterDec = state.selectedMeals;
      counterDec[action.payload].count -= 1;

      return {
        ...state,
        selectedMeals: counterDec,
      };
    case "DELETE_MEAL":
      const deletedState = state.selectedMeals;
      deletedState.splice(action.payload, 1);

      return {
        ...state,
        selectedMeals: deletedState,
      };
    case "CALCULATE_PRICE":
      const price = state.selectedMeals.map((meal) => {
        let total = meal.price * meal.count;
        return total;
      });
      const lastPrice = price.reduce((total, num) => total + num, 0);
      console.log(lastPrice);
      return {
        ...state,
        totalPrice: lastPrice,
      };

    case "OPEN_CHECKOUT":
      
      let openCheckout = state.isCheckoutOpen;
      openCheckout = true;

      return {
        ...state,
        isCheckoutOpen: openCheckout,
      };
  }
}

export const MealContext = createContext({
  selectedMeals: [],
  isCartOpen: false,
  totalPrice: [],
  addMealToCart: () => {},
  openCart: () => {},
  closeCart: () => {},
  incrementMeal: () => {},
  decrementMeal: () => {},
  handleCheckout: () => {},
  convertNull: () => {},
});

export default function MealContextProvider({children}) {
  const [state, dispatch] = useReducer(mealOrderReducer, {
    selectedMeals: [],
    isCartOpen: false,
    totalPrice: 0,
    isCheckoutOpen: false,
  });
  async function addMealToCart(meal) {
    // setSelectedMeals((prevSelectedMeals) => {
    //   if (prevSelectedMeals.some((food) => food.id === meal.id)) {
    //     return prevSelectedMeals;
    //   }

    //   return [meal, ...prevSelectedMeals];
    // });

    dispatch({
      type: "ADD_MEAL",
      payload: meal,
    });
    dispatch({
      type: "CALCULATE_PRICE",
    });

    try {
      await updateOrder(meal);
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error,
      });
    }
  }

  function openCart() {
    dispatch({
      type: "OPEN_CART",
    });
  }
  function closeCart() {
    dispatch({
      type: "CLOSE_CART",
    });
  }

  function incrementMeal(index) {
    // setSelectedMeals((prevSelectedMeals) => {
    //   selectedMeals[index].count = selectedMeals[index].count + 1;
    //   return [...prevSelectedMeals];
    // });
    dispatch({
      type: "INCREMENT",
      payload: index,
    });
    dispatch({
      type: "CALCULATE_PRICE",
    });
  }
  function decrementMeal(index) {
    if (state.selectedMeals[index].count > 1) {
      // setSelectedMeals((prevSelectedMeals) => {
      //   selectedMeals[index].count = selectedMeals[index].count - 1;
      //   return [...prevSelectedMeals];
      // });
      dispatch({
        type: "DECREMENT",
        payload: index,
      });
      dispatch({
        type: "CALCULATE_PRICE",
      });
    } else {
      // setSelectedMeals((prevSelectedMeals) => {
      //   selectedMeals.splice(index, 1);
      //   return [...prevSelectedMeals];
      // });
      dispatch({
        type: "DELETE_MEAL",
        payload: index,
      });
    }
  }
  function handleCheckout() {
    dispatch({
      type: "OPEN_CHECKOUT",
    });

    console.log("dgssgd");
  }

  function convertNull() {
    dispatch({
      type: "NULL_cART",
    });
  }

  const ctxValue = {
    selectedMeals: state.selectedMeals,
    isCartOpen: state.isCartOpen,
    totalPrice: state.totalPrice,
    isCheckoutOpen: state.isCheckoutOpen,
    addMealToCart: addMealToCart,
    openCart: openCart,
    closeCart: closeCart,
    incrementMeal: incrementMeal,
    decrementMeal: decrementMeal,
    handleCheckout: handleCheckout,
    convertNull: convertNull,
  };
  return (
    <MealContext.Provider value={ctxValue}>{children}</MealContext.Provider>
  );
}
