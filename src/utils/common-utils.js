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

export const stateOptions = [
  { label: "Andhra Pradesh", value: "andhra_pradesh" },
  { label: "Arunachal Pradesh", value: "arunachal_pradesh" },
  { label: "Assam", value: "assam" },
  { label: "Bihar", value: "bihar" },
  { label: "Chhattisgarh", value: "chhattisgarh" },
  { label: "Goa", value: "goa" },
  { label: "Gujarat", value: "gujarat" },
  { label: "Haryana", value: "haryana" },
  { label: "Himachal Pradesh", value: "himachal_pradesh" },
  { label: "Jharkhand", value: "jharkhand" },
  { label: "Karnataka", value: "karnataka" },
  { label: "Kerala", value: "kerala" },
  { label: "Madhya Pradesh", value: "madhya_pradesh" },
  { label: "Maharashtra", value: "maharashtra" },
  { label: "Manipur", value: "manipur" },
  { label: "Meghalaya", value: "meghalaya" },
  { label: "Mizoram", value: "mizoram" },
  { label: "Nagaland", value: "nagaland" },
  { label: "Odisha", value: "odisha" },
  { label: "Punjab", value: "punjab" },
  { label: "Rajasthan", value: "rajasthan" },
  { label: "Sikkim", value: "sikkim" },
  { label: "Tamil Nadu", value: "tamil_nadu" },
  { label: "Telangana", value: "telangana" },
  { label: "Tripura", value: "tripura" },
  { label: "Uttar Pradesh", value: "uttar_pradesh" },
  { label: "Uttarakhand", value: "uttarakhand" },
  { label: "West Bengal", value: "west_bengal" },
  { label: "Andaman and Nicobar Islands", value: "andaman_nicobar" },
  { label: "Chandigarh", value: "chandigarh" },
  { label: "Dadra and Nagar Haveli and Daman and Diu", value: "dadra_nagar_haveli_daman_diu" },
  { label: "Lakshadweep", value: "lakshadweep" },
  { label: "Delhi", value: "delhi" },
  { label: "Puducherry", value: "puducherry" },
  { label: "Ladakh", value: "ladakh" },
  { label: "Jammu and Kashmir", value: "jammu_kashmir" }
];

export const woodMeasurementScales = [
  { label: "Millimeters (mm)", value: "mm" },
  { label: "Centimeters (cm)", value: "cm" },
  { label: "Meters (m)", value: "m" },
  { label: "Inches (in)", value: "in" },
  { label: "Feet (ft)", value: "ft" },
  { label: "Square Feet (ft²)", value: "sq_ft" },
  { label: "Square Meters (m²)", value: "sq_m" },
  { label: "Cubic Feet (ft³)", value: "cubic_ft" },
  { label: "Cubic Meters (m³)", value: "cubic_m" },
  { label: "Board Feet (BF)", value: "board_feet" },
  { label: "Cord", value: "cord" },
  { label: "Kilograms (kg)", value: "kg" },
  { label: "Metric Tons (t)", value: "ton" },
  { label: "Pounds (lb)", value: "lb" },
];
