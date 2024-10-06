import { Button } from "@nextui-org/react";
import Loader from "../Loader/Loader";

export default function CustomButton({ className, icon, children, variant="bordered", loading = false, color="default", ...rest }) {
  const buttonClasses = `flex items-center justify-center ${className}`;
  return (
    <Button
      className={buttonClasses}
      radius="md"
      variant={variant}
      startContent={loading ? <Loader size="sm" /> : icon}
      disabled={loading}
      {...rest}
      color={color}
    >
      {loading ? "Loading..." : children} 
    </Button>
  );
}
