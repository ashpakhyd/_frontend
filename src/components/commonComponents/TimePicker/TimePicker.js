import { TimeInput } from "@nextui-org/react";
import { ClockCircleLinearIcon } from "./ClockCircleLinearIcon";

const TimePicker = ({
  label = "Time",
  labelPlacement = "outside",
  isRequired = true,
  ...rest
}) => {
  const formatTime = (timeValue) => {
    if (timeValue !== undefined) {
      const hour = ((timeValue.hour + 11) % 12) + 1; // Convert to 12-hour format
      const period = timeValue.hour >= 12 ? "PM" : "AM";
      return `${hour}:${String(timeValue.minute).padStart(2, "0")} ${period}`;
    }
  };
  return (
    <div className="w-full flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <TimeInput
          label={label}
          labelPlacement={labelPlacement}
          // defaultValue={value}
          endContent={
            <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          isRequired={isRequired}
          classNames={{
            base: [""],
            inputWrapper: [
              "rounded-md bg-white hover:bg-white hover:border-default-400 ",
              "data-[hover=true]:bg-white border-2 border-gray-1",
              "data-[focus=true]:bg-white border-2 border-gray-1",
            ],
          }}
          {...rest}
        />
      </div>
    </div>
  );
};
export default TimePicker;
