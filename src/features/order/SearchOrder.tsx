import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data);
        if(!data.query) return
        navigate(`/order/${data.query}`);
        reset()
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="Search order #" {...register("query")} />
        </form>
    );
}

export default SearchOrder;
