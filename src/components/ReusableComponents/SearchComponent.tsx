import { useState } from "react";
import { GrSearch } from "react-icons/gr";
import FormField from "./FormField";

interface SearchComponentProps<T> {
  className?: string;
  masterState: T[];
  setState: React.Dispatch<React.SetStateAction<T[]>>;
  filterFields: (item: T) => string[];
}

const SearchComponent = <T,>({
  masterState,
  setState,
  className,
  filterFields,
}: SearchComponentProps<T>) => {
  const [search, setSearch] = useState<string>("");
  const [searchTimeout, setSearchTimeout] = useState<number | undefined>();

  const filterPrompts = (searchText: string) => {
    console.log("Executing filterPrompts");
    const regex = new RegExp(searchText, "i");
    return masterState.filter((item) =>
      filterFields(item).some((field) => regex.test(field))
    );
  };

  const handleSearch = (searchText: string) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearch(searchText);
    setSearchTimeout(
      setTimeout(() => {
        const filteredResults = filterPrompts(searchText);
        setState(filteredResults);
      }, 200)
    );
  };

  return (
    <div className="flex-center mt-4 w-full flex-col ">
      <div className=" w-72 lg:w-84 xl:w-md  flex flex-row justify-center items-center flex-wrap">
        <FormField
          placeholder="Search for a product ....."
          value={search}
          setValue={(_, value) => handleSearch(value as string)}
          name="search"
          type="text"
          key={"search"}
          className={`w-full flex-center flex flex-row py-3 px-4 rounded-lg border border-gray-500 focus:outline-none ${className} pr-11`}
          divClassName="w-64 flex-center flex "
          iconPosition="right"
          iconComponent={
            <GrSearch
              size={16}
              className="cursor-pointer"
              onClick={() => handleSearch(search)}
            />
          }
          iconFromTop="top-4"
        />
      </div>
    </div>
  );
};

export default SearchComponent;
