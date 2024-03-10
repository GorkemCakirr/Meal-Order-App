// import {useReducer} from "react";

// export const INITIAL_STATE = {
//   selectedMeals: [],
//   totalPrice: [],
//   isCartOpen: false,
// };

// export default function mealOrderReducer(state, action) {
//   switch (action.type) {
//     case "ADD_MEAL":
//       state.selectedMeals.push(action.payload);
//       return {
//         ...state,
//       };

//     case "ERROR":
//       return {
//         ...state,
//       };

//     case "TOTAL_PRİCE":
//       return {
//         ...state,
//         totalPrice: action.payload,
//       };

//     case "OPEN_CART":
//       return {
//         ...state,
//         isCartOpen: true,
//       };

//     case "CLOSE_CART":
//       return {
//         ...state,
//         isCartOpen: false,
//       };

//     case "INCREMENT":
//       let counterInc = state.selectedMeals[action.payload].count;
//       counterInc += 1;

//       return {
//         ...state,
//         selectedMeals,
//       };

//     case "DECREMENT":
//       let counterDec = state.selectedMeals[action.payload].count;
//       counterDec -= 1;
//       return {
//         ...state,
//         selectedMeals,
//       };
//     case "DELETE_MEAL":
//       state.selectedMeals.splice(action.payload, 1);

//       return {
//         ...state,
//         selectedMeals,
//       };
//   }
// }
