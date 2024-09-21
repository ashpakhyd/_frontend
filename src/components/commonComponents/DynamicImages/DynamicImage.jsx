import Image from "next/image";
import { useState } from "react";

export default function DynamicImage({
  alt,
  containerClass,
  width,
  height,
  src,
  className,
  ...rest
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const imageStyle = {
    filter: isLoaded ? "blur(0)" : "blur(10px)",
    transition: "filter 0.3s ease-out",
  };

  return (
    <Image
      {...rest}
      src={src}
      alt={alt || "Alternative"}
      width={width}
      height={height}
      className={className}
      style={imageStyle}
      onLoad={() => setIsLoaded(true)}
    />
  );
}
