import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
import { formatCurrency } from "../../utils/helpers";
import Loader from "../../ui/Loader";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  const fetcherLoading = fetcher.state === "loading";
  const fetcherSubmitting = fetcher.state === "submitting";

  const priorityPrice = Math.round(order.orderPrice * 0.2 * 100) / 100;

  console.log(fetcher.state);

  return (
    <fetcher.Form method="PATCH" className="text-right">
      {fetcherLoading && <Loader />}

      <Button type="primary" disabled={fetcherSubmitting}>
        Make Priority ${formatCurrency(priorityPrice)}
      </Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export const action = async ({ request, params }) => {
  const data = { priority: true };

  await updateOrder(params.orderId, data);
  return null;
};
