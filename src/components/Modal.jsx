import {useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import {useContext} from "react";
import {MealContext} from "../store/meal-order-context";

export default function Modal({children}) {
  const dialog = useRef();
  const {isCartOpen, closeCart} = useContext(MealContext);

  useEffect(() => {
    if (isCartOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={closeCart}>
      {isCartOpen ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
}
