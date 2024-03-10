import Control from "./components/Control";
import MealContextProvider from "./store/meal-order-context";


// export const INITIAL_STATE = {
//   selectedMeals: [],
//   isCartOpen: false,
//   totalPrice: [],
// };

function App() {
  return (
    <MealContextProvider>
      <Control />
    </MealContextProvider>
  );
}

export default App;
