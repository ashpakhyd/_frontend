import { cn } from "@/utils/common-utils";

export const Title = ({ className, children }) => (
  <p className={cn(" leading-normal font-bold mb-7 text-base", className)}>{children}</p>
);
