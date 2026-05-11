import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
import Button from "../../ui/Button";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch(deleteItem(pizzaId));

  const handleDeleteClick = () => {
    dispatch(deleteItem(pizzaId));
  };
  return (
    <Button type="small" onClick={handleDeleteClick}>
      Delete
    </Button>
  );
}

export default DeleteItem;
