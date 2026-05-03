import { Link, useNavigate } from "react-router-dom";

function LinkButton({ to, children, className, ...rest }) {
  const navigate = useNavigate();
  const newClassName =
    "text-sm text-blue-500 hover:text-blue-600 hover:underline" +
    " " +
    (className || "");

  if (to === "-1")
    return (
      <button onClick={() => navigate(-1)} className={newClassName} {...rest}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={newClassName} {...rest}>
      {children}
    </Link>
  );
}

export default LinkButton;
