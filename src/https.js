export async function fetchMeals() {
  const response = await fetch("http://localhost:3000/meals");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }

  return resData;
}

export async function updateOrder(selectedMeal) {
  //   const response = await fetch("http://localhost:3000/orders", {
  //     method: "POST",
  //     body: JSON.stringify({selectedMeal}),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // const resData = await response.json();
  // if(!response.ok){
  //   throw new Error("Failed to update meals.")
  // }
  // return resData.message;
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    body: JSON.stringify({
      selectedMeal,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update meals.");
  }
  return resData.message;
}
