import {useState} from "react";
import Control from "./components/Control";
import MealContextProvider from "./store/meal-order-context";

// export const INITIAL_STATE = {
//   selectedMeals: [],
//   isCartOpen: false,
//   totalPrice: [],
// };

function App() {
  const [totalPrice, setTotalPrice] = useState();
  return (
    <MealContextProvider>
      <Control totalPrice={totalPrice} />
    </MealContextProvider>
  );
}

export default App;
