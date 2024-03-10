import Header from "./components/Header";
import Meals from "./components/Meals";
import {useState, useReducer, useEffect} from "react";
import Modal from "./components/Modal";
import {updateOrder} from "./https";
import {INITIAL_STATE} from "./store/meal-order-context";

// export const INITIAL_STATE = {
//   selectedMeals: [],
//   isCartOpen: false,
//   totalPrice: [],
// };

function mealOrderReducer(state, action) {
  switch (action.type) {
    case "ADD_MEAL":
      const addedMeal = state.selectedMeals;
      addedMeal.push(action.payload);
      return {
        ...state,
        selectedMeals: addedMeal,
      };

    case "ERROR":
      return {
        ...state,
      };

    case "TOTAL_PRİCE":
      return {
        ...state,
        totalPrice: action.payload,
      };

    case "OPEN_CART":
      debugger;
      if (state.selectedMeals.length === 0) {
        return {
          ...state,
          isCartOpen: false,
        };
      } else {
        return {
          ...state,
          isCartOpen: true,
        };
      }

    case "CLOSE_CART":
      return {
        ...state,
        isCartOpen: false,
      };

    case "INCREMENT":
      let counterInc = state.selectedMeals;
      counterInc[action.payload].count += 1;

      return {
        ...state,
      };

    case "DECREMENT":
      let counterDec = state.selectedMeals[action.payload].count;
      counterDec -= 1;
      return {
        ...state,
        selectedMeals: counterDec,
      };
    case "DELETE_MEAL":
      const deleteMeal = state.selectedMeals;
      // state.selectedMeals.splice(action.payload, 1);
      deleteMeal.splice(action.payload, 1);

      return {
        ...state,
        selectedMeals: deleteMeal,
      };
  }
}

function App() {
  const [state, dispatch] = useReducer(mealOrderReducer, INITIAL_STATE);
  // const [selectedMeals, setSelectedMeals] = useState([]);
  // const [totalPrice, setTotalPrice] = useState([]);

  // const [isCartOpen, setIsCartOpen] = useState(false);

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

  useEffect(() => {
    function mealPrice() {
      const price = state.selectedMeals.map((meal) => {
        let total = meal.price * meal.count;
        return total;
      });
      let lastPrice = 0;
      price.map((item) => {
        lastPrice += item;
        return lastPrice;
      });
      dispatch({
        type: "TOTAL_PRİCE",
        payload: lastPrice,
      });
    }

    mealPrice();
  }, []);

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

  const selectedOrder = state.selectedMeals;

  const order = selectedOrder.map((meal) => {
    let index = selectedOrder.indexOf(meal);
    let count = selectedOrder[index].count;
    console.log(meal.id);

    return (
      <li className="cart-item" key={index}>
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
  let length = state.selectedMeals.length;
  console.log(length);
  return (
    <>
      {length ? (
        <Modal
          className="cart-total"
          open={state.isCartOpen}
          onClose={closeCart}
        >
          <div>
            <h3>Your Cart</h3>
            {order}
            <p className="cart-item">${state.totalPrice}</p>
            <button onClick={closeCart} className="button">
              Close
            </button>
          </div>
        </Modal>
      ) : null}

      <div id="main-header">
        <Header />
        <button onClick={openCart} className="button">
          Cart ({state.selectedMeals.length})
        </button>
      </div>
      <Meals addMealToCart={addMealToCart} />
    </>
  );
}

export default App;
