import NoImage from "@/assets/images/no-image.png";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isValid = (name, errors) => {
  if (!name || !errors) return;
  return errors[name] ? true : false;
};

export function capitalize(str) {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
}

export const getThumbnailUrl = (productImages) => {
  if (productImages && productImages.length > 0) {
    const thumbnailImage = productImages.find(
      (image) => image?.thumbnail
    )?.thumbnail;

    if (thumbnailImage) {
      return thumbnailImage;
    }
  }
  return NoImage.src;
};

export function createLabelValueArray(arr, labelKey, valueKey) {
  if (!arr) return [];
  return arr.map((item) => ({
    label: item[labelKey],
    value: item[valueKey],
  }));
}

export const formatTime = (timeValue) => {
  if (timeValue !== undefined) {
    const hour = ((timeValue.hour + 11) % 12) + 1; // Convert to 12-hour format
    const period = timeValue.hour >= 12 ? "PM" : "AM";
    return `${hour}:${String(timeValue.minute).padStart(2, "0")} ${period}`;
  }
};

export function formatDateTimeUS(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}
