import CustomButton from "../Button/Button";

const SaveCancelBtn = () => {
  return (
    <div className="flex gap-3.5">
      <CustomButton className=" py-2 px-6 border border-gray-light rounded-lg bg-white text-black font-semibold">
        Cancel
      </CustomButton>
      <CustomButton
        className=" bg-primaryBtn text-white py-2 px-7 rounded-lg border-none"
        type="submit"
      >
        Save
      </CustomButton>
    </div>
  );
};

export default SaveCancelBtn;
