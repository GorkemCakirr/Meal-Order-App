import {useEffect, useState} from "react";
import {fetchMeals} from "../https";
import Error from "./Error";

export default function Meals({addMealToCart}) {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function displayMeals() {
      try {
        const allMeals = await fetchMeals();
        setMeals(allMeals);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later",
        });
      }
    }
    displayMeals();
  }, []);
  if (error) {
    return <Error title="An error occured" message={error.message} />;
  }

  const orderMenu = meals.map((meal) => {
    return (
      <li key={meal.id} className="meal-item">
        <article>
          <img src={`http://localhost:3000/${meal.image}`} alt="" />
          <div className="meal-item-actions">
            <h3>{meal.name}</h3>
            <div className="meal-item-price">${meal.price}</div>
            <p className="meal-item-description">{meal.description}</p>
            <button onClick={() => addMealToCart(meal)} className="button">
              Add To Cart
            </button>
          </div>
        </article>
      </li>
    );
  });

  return (
    <>
      <div id="meals">{orderMenu}</div>
    </>
  );
}
