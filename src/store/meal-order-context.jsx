import {createContext, useReducer, useEffect} from "react";
import {updateOrder} from "../https";

export const INITIAL_STATE = {};

function mealOrderReducer(state, action) {
  switch (action.type) {
    case "ADD_MEAL":
      state.selectedMeals.map(meal => {
        if(meal.id === action.payload.id){
          return {
            ...state
          }

          }else{
            state.selectedMeals.push(action.payload)
            return{
              ...state,
            }
        }
      })


    case "ERROR":
      return {
        ...state,
      };

    case "OPEN_CART":
      return {
        ...state,
        isCartOpen: true,
      };

    case "CLOSE_CART":
      return {
        ...state,
        isCartOpen: false,
      };

    case "INCREMENT":
      let counterInc = state.selectedMeals[action.payload].count;
      counterInc += 1;

      return {
        ...state,
        selectedMeals,
      };

    case "DECREMENT":
      let counterDec = state.selectedMeals[action.payload].count;
      counterDec -= 1;
      return {
        ...state,
      };
    case "DELETE_MEAL":
      state.selectedMeals.splice(action.payload, 1);

      return {
        ...state,
        selectedMeals,
      };
  }
}

export const MealContext = createContext({
  selectedMeals: [],
  isCartOpen: false,
  totalPrice: [],
  addMealToCart: () => {},
  handleMealPrice: () => {},
  openCart: () => {},
  closeCart: () => {},
  incrementMeal: () => {},
  decrementMeal: () => {},
});

export default function MealContextProvider({children}) {
  const [state, dispatch] = useReducer(mealOrderReducer, {
    selectedMeals: [],
    isCartOpen: false,
    totalPrice: [],
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
    console.log("açıldı")
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
  const ctxValue = {
    selectedMeals: state.selectedMeals,
    isCartOpen: state.isCartOpen,
    totalPrice: state.isCartOpen,
    addMealToCart: addMealToCart,
    openCart: openCart,
    closeCart: closeCart,
    incrementMeal: incrementMeal,
    decrementMeal: decrementMeal,
  };
  return (
    <MealContext.Provider value={ctxValue}>{children}</MealContext.Provider>
  );
}
