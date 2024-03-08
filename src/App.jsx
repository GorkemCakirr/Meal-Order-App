import Header from "./components/Header";
import Meals from "./components/Meals";
import {useState, useRef, useEffect} from "react";
import Modal from "./components/Modal";
import {updateOrder} from "./https";

function App() {
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);


  async function addMealToCart(meal) {
 
      setSelectedMeals((prevSelectedMeals) => {
        if (prevSelectedMeals.some((food) => food.id === meal.id)) {
          return prevSelectedMeals;
        }

        return [meal, ...prevSelectedMeals];
      });
      try {
      await updateOrder(meal);
    } catch (error) {
      setErrorUpdatingMeals({
        message: error.message || "Failed to update meals.",
      });
      setSelectedMeals(selectedMeals);
    }
  }


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
      setTotalPrice(lastPrice.toFixed(2));
    }

    mealPrice();
  }, [selectedMeals]);

  console.log(totalPrice);

  function openCart() {
    setIsCartOpen(true);
  }
  function closeCart() {
    setIsCartOpen(false);
  }

  function incrementMeal(index) {
    console.log(selectedMeals[index].count);
    setSelectedMeals((prevSelectedMeals) => {
      selectedMeals[index].count = selectedMeals[index].count + 0.5;
      return [...prevSelectedMeals];
    });
  }
  function decrementMeal(index) {
    if (selectedMeals[index].count > 1) {
      setSelectedMeals((prevSelectedMeals) => {
        selectedMeals[index].count = selectedMeals[index].count - 0.5;
        return [...prevSelectedMeals];
      });
    } else {
      setSelectedMeals((prevSelectedMeals) => {
        selectedMeals.splice(index,1)
        return [...prevSelectedMeals];
      });
    }
  }

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

  return (
    <>
      <Modal className="cart-total" open={isCartOpen} onClose={closeCart}>
        <div>
          <h3>Your Cart</h3>
          {order}
          <p className="cart-item">${totalPrice}</p>
          <button onClick={closeCart} className="button">Close</button>
        </div>
      </Modal>

      <div id="main-header">
        <Header />
        <button onClick={openCart} className="button">
          Cart ({selectedMeals.length})
        </button>
      </div>
      <Meals addMealToCart={addMealToCart} />
    </>
  );
}

export default App;
