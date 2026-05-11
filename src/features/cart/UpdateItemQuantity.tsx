import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  decreaseItemQuantity,
  getCurrentQuantityById,
  increaseItemQuantity,
} from "./cartSlice";

function UpdateItemQuantity({ pizzaId }) {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  const handleIncreaseClick = () => {
    dispatch(increaseItemQuantity(pizzaId));
  };
  const handleDecreaseClick = () => {
    dispatch(decreaseItemQuantity(pizzaId));
  };

  {
    /* <button
            onClick={handleIncreaseClick}
            className="text-md flex h-2 items-center rounded-full bg-green-400 px-1 pb-3 pt-2 font-bold shadow-md hover:bg-green-300"
          >
            &#43;
          </button> */
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
      <Button type="round" onClick={handleDecreaseClick}>
        -
      </Button>
      <span className="w-2 text-sm font-medium">{currentQuantity}</span>
      <Button type="round" onClick={handleIncreaseClick}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
