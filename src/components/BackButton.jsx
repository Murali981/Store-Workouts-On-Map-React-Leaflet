import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault(); // Here we are writing the "e.preventDefault()" because this Button component is inside the <form> so whenever
        // we click on the button it will automatically submit the form by reloading the page. So this is the reason we are preventing the
        // default submission of the form by writing "e.preventDefault()"
        navigate(-1); // Here "-1" takes one step back to your previous page from where you came from
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
