import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import store from "../../store";
import Button from "../../ui/Button";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { fetchAddress, updateAddress } from "../user/userSlice";
import { formatCurrency } from "../../utils/helpers";
import { useAppDispatch, useAppSelector } from "../../utils/hook";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const dispatch = useAppDispatch();
  // const useAppDispatch = () => useDispatch<AppDispatch>();
  const totalCartPrice = useAppSelector(getTotalCartPrice);
  const formErrors = useActionData();
  // console.log(formErrors);
  const cart = useSelector(getCart);
  const [withPriority, setWithPriority] = useState(false);
  const {
    position,
    address,
    status: addressStatus,
    username,
    error: addressError,
  } = useAppSelector((state) => state.user);
  // const [inputAddress, setInputAddress] = useState(address);
  const isLoadingAddress = addressStatus === "loading";

  // console.log("here", { position, address });

  if (!cart.length) return <EmptyCart />;

  const priorityPrice = Number(withPriority) * totalCartPrice * 0.2;
  const totalPrice = totalCartPrice + priorityPrice;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && (
            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              // defaultValue={address}
              value={address}
              onChange={(e) =>
                //  setInputAddress(e.target.value)
                dispatch(updateAddress(e.target.value))
              }
              disabled={isLoadingAddress}
            />
            {addressStatus === "error" && (
              <p className="mx-1 mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[34.75px] z-50 sm:top-[3px] md:right-[4px] md:top-[4.5px]">
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoadingAddress}
              >
                get geolocation
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="size-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? "Placing order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // console.log(data.priority);
  const date = new Date();
  date.setMinutes(date.getMinutes() + 30);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
    estimatedDelivery: date.toISOString(),
  };

  // console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you";

  // console.log(errors);
  if (Object.keys(errors).length) return errors;

  const newOrder = await createOrder(order);
  // console.log(newOrder);

  // Do not overuse
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
