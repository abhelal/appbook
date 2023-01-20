import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchInput = () => {
  const [search_key, setSearch_key] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function search() {
    setLoading(true);
    if (search_key && !loading) {
      router.push(`/search?name=${search_key}`);
    } else {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-12 flex-grow items-center rounded-md overflow-hidden border border-primary-500 focus-within:border-primary-400 focus-within:outline-none bg-white">
      <div className="h-12 w-16 flex items-center pl-2">
        <MagnifyingGlassIcon className="w-5 h-5 text-primary-500" />
      </div>
      <input
        type="text"
        onChange={(e) => setSearch_key(e.target.value)}
        autoComplete="text"
        className="w-full h-12 -ml-3 border-0 focus:outline-none focus:ring-0 placeholder-gray-500 text-gray-900 sm:text-sm"
        placeholder="Search for Business"
      />
      <button
        onClick={() => search()}
        className="bg-primary-500 w-24 h-12 border border-primary-500 rounded px-6 text-white font-bold"
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner color="white" height="5" width="5" />
          </div>
        ) : (
          <span className="text-md">Search</span>
        )}
      </button>
    </div>
  );
};

export default SearchInput;
