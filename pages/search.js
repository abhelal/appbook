import SearchBusiness from "@components/SearchBusiness";
import Footer from "@components/Footer";
import axios from "@libs/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BusinessCard from "@components/BusinessCard";
import Spinner from "@/components/Spinner";

function Search() {
  const router = useRouter();
  const [loadingData, setLoadingData] = useState(false);
  const [businessess, setBusinessess] = useState([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (router.isReady) {
      let queryString;
      const { name, category } = router.query;
      if (name && category) {
        queryString = "name=" + name + "&" + "category=" + category;
      }

      if (name && !category) {
        queryString = "name=" + name;
      }

      if (!name && category) {
        queryString = "category=" + category;
      }

      async function getSearchItem() {
        setLoadingData(true);
        await axios
          .get(`api/v1/business/search_business?${queryString}`)
          .then((res) => setBusinessess(res.data.data));
        setLoadingData(false);
      }
      getSearchItem();
    }
  }, [router.isReady, router.query]);

  return (
    <div>
      <div className="flex flex-col min-h-screen w-full items-center">
        <div className="flex flex-col flex-grow w-full max-w-screen-2xl">
          <div className="text-2xl text-center py-4">Search Business</div>
          <div className="border-b mx-12 md:mx-28 lg:mx-36"></div>
          <div className="max-w-md px-4 py-4">
            <SearchBusiness />
          </div>
          {loadingData ? (
            <div className="flex flex-col flex-grow">
              <Spinner />
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
              {businessess.map((business, index) => (
                <BusinessCard key={index} business={business} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Search;
