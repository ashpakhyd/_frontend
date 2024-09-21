import { cn } from "@/utils/common-utils";

const Container = ({ children, className }) => {
  return (
    <div
      className={cn(
        "mb-4 p-6 px-7 pb-7 rounded-xl shadow-md bg-white",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
