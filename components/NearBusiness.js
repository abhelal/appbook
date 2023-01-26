import { useEffect, useState } from "react";
import BusinessCard from "@components/BusinessCard";
import axios from "@/libs/axios";
import { useSelector } from "react-redux";

export default function NearBusiness() {
  const { coordinates } = useSelector((state) => state.location);
  const [neartome, setNearToMe] = useState([]);

  useEffect(() => {
    if (coordinates) {
      axios
        .post("/api/v2/business/business_range", {
          rows: 100,
          start: 0,
          longitude: coordinates?.lng,
          latitude: coordinates?.lat,
          range: 10,
        })
        .then((res) => setNearToMe(res.data.data));
    }
  }, [coordinates]);

  if (neartome.length > 0) {
    return (
      <div>
        <div className="text-gray-600 text-md lg:text-xl font-semibold p-4">Business Around Me</div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
          {neartome.map((business, idx) => (
            <div key={idx}>
              <BusinessCard business={business} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
