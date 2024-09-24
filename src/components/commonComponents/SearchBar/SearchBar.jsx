import { useSearchParams, usePathname, useRouter } from "next/navigation";
// import { useDebouncedCallback } from "use-debounce";
import CustomInput from "../TextInput/TextInput";
import SearchBarIcon from "@/components/icons/SearchBarIcon";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const customPathname = pathname.split("/")[1];

  const handleSearchInputChange = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
      params.set("page", 1);
    } else {
      params.delete("search");
      params.set("page", 1);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const searchPlaceholders = {
    products: "Search by Name or SKU",
    categories: "Search by Name",
    brands: "Search by Name",
  };

  return (
    <CustomInput
      classNames={{
        inputWrapper: [
          "bg-white",
          "border-2 border-gray-8",
          "data-[hover=true]:bg-white",
          "group-data-[focus=true]:bg-white",
        ],
        mainWrapper: "w-full",
      }}
      isClearable
      onClear={() => handleSearchInputChange("")}
      startContentJSX={<SearchBarIcon />}
      radius="lg"
      placeholder={searchPlaceholders[customPathname]}
      defaultValue={searchParams.get("search")?.toString()}
      onChange={(e) => {
        handleSearchInputChange(e.target.value);
      }}
    />
  );
};

export default SearchBar;
