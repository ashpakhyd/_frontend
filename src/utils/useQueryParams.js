import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const currentRoute = usePathname();
  const router = useRouter();

  const getParam = (param, defaultValue = "") =>
    searchParams.get(param) || defaultValue;

  const limit = Number(getParam("limit", 10));
  const page = Number(getParam("page", 1));
  const sortField = getParam("sortField");
  const sortOrder = getParam("sortOrder");
  const filterBy = getParam("filterBy");
  const filterValue = getParam("filterValue");
  const search = getParam("search");

  const setQueryParams = (params) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    router.push(`${currentRoute}?${newParams.toString()}`);
  };

  return {
    limit,
    page,
    sortField,
    sortOrder,
    filterBy,
    filterValue,
    search,
    setQueryParams,
  };
};
