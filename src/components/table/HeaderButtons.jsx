import Filters from "./Filters";

const HeaderButtons = ({ headerButtons, showFilters, tableLabel }) => {
  return (
    <div className=" pb-3 bg-mainContainer">
      <div className="flex justify-between items-center">
        {showFilters && <Filters />}
        {!showFilters && tableLabel && <label className="text-font24  leading-lineHeight36 font-bold flex-start">{tableLabel}</label>}

        <div className="flex gap-3.5 pr-2 flex-1 justify-end">
          {headerButtons}
        </div>
      </div>
    </div>
  );
};

export default HeaderButtons;
