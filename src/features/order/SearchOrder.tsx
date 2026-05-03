import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    if (!data.query) return;
    navigate(`/order/${data.query}`);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Search order #"
        {...register("query")}
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
