import React, { useState } from "react";
import Image from "next/image";

const ImageSlider = ({ productImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + productImages.length) % productImages.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-[35%] flex justify-center items-center rounded-lg border-2 border-gray-9 overflow-hidden bg-mainContainer">
      {/* Image Slides */}
      {productImages.map((image, index) => (
        <div
          key={index}
          className={`absolute transition-opacity duration-500 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={`Product Image ${index + 1}`}
            width={200}
            height={200}
            className="w-[220px] max-h-[225px] object-contain rounded-lg"
          />
        </div>
      ))}

      {/* Navigation Arrows */}
      {productImages.length > 1 && (
        <>
          <span
            className="cursor-pointer absolute left-0 z-10 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
            onClick={prevSlide}
          >
            &#10094;
          </span>
          <span
            className="cursor-pointer absolute right-0 z-10 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
            onClick={nextSlide}
          >
            &#10095;
          </span>
        </>
      )}

      {/* Dots Navigation */}
      {productImages.length > 1 && (
        <div className="absolute bottom-2 flex space-x-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`cursor-pointer bg-gray-9 w-2 h-2 rounded-full`}
              onClick={() => goToSlide(index)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
