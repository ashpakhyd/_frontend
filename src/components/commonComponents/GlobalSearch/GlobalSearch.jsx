import React, { useState } from 'react';

const GlobalSearch = ({ data, searchFields, onSearch, placeholder, className }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterData = () => {
    if (!searchQuery) return data;

    return data.filter((item) =>
      searchFields.some((field) =>
        item[field].toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  React.useEffect(() => {
    onSearch(filterData());
  }, [searchQuery, data]);

  return (
   <div>
     <input
      type="text"
      placeholder={placeholder}
      value={searchQuery}
      onChange={handleSearchChange}
      className={`p-2 border border-gray-300 rounded ${className}`}
    />
   </div>
  );
};

export default GlobalSearch;
