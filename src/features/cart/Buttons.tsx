import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

function Buttons({ pizzaId }) {
  return (
    <div className="flex items-center gap-3 sm:gap-8">
      <UpdateItemQuantity pizzaId={pizzaId} />
      <DeleteItem pizzaId={pizzaId} />
    </div>
  );
}

export default Buttons;
