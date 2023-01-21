import { useRouter } from "next/router";
import { useState } from "react";

const SearchInput = () => {
  const [key, setKey] = useState();
  const router = useRouter();

  function search() {
    if (key) {
      router.push(`/search?name=${key}`);
    }
  }

  return (
    <div className="block w-full">
      <div className="flex flex-grow rounded-md pl-4 overflow-hidden border border-primary-500 focus-within:border-primary-400 focus-within:outline-none">
        <input
          type="text"
          onChange={(e) => setKey(e.target.value)}
          autoComplete="text"
          className="w-full h-10 -ml-3 border-0 focus:outline-none focus:ring-0 placeholder-gray-500 text-gray-900 sm:text-sm"
          placeholder="Search for business"
        />

        <button
          onClick={() => search()}
          className="bg-primary-500 w-24 h-10 border border-primary-500 rounded px-6 text-white font-bold"
        >
          <span className="text-xs ">Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
