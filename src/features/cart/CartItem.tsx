import { formatCurrency } from "../../utils/helpers";
import Buttons from "./Buttons";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const disabledStyle =
    "bg-stone-300 shadow-none hover:bg-stone-300 cursor-default";

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Buttons pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
