import { toast } from "react-hot-toast";

export const handleApiError = (err, navigate) => {
  const error = err.response?.data;

  if (!error) {
    toast.error("Network error. Please try again.");
    navigate("/");
    return;
  }

  switch (error.code) {
    case "INVALID_PRODUCT":
    case "ORDER_CREATE_FAILED":
    case "PAYMENT_VERIFICATION_FAILED":
      toast.error(error.message);
      navigate("/");
      break;

    default:
      toast.error("Something went wrong.");
      navigate("/");
  }
};
