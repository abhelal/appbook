import { StarIcon } from "@heroicons/react/20/solid";
import CustomImage from "./CustomImage";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Reviews({ reviews }) {
  const format = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return (
    <div className="w-full px-4 pb-28 md:px-12">
      <div className="text-primary-500 text-2xl font-semibold py-4">
        Reviews
      </div>
      <div className="flex flex-col gap-4 w-full">
        {reviews?.map((review, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-12 text-sm text-gray-500 border-b-2 md:px-8 "
          >
            <div className="col-span-1 flex items-center">
              <div className="relative w-14 h-14 rounded-full bg-primary-100 overflow-hidden">
                <CustomImage
                  src={review.usr_id.avatar}
                  fill
                  className=" object-cover"
                />
              </div>
            </div>
            <div className="col-span-8 pr-4">
              <div className="font-semibold">{review.usr_id.full_name}</div>
              <div className="flex items-center text-gray-200">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      review.Stars > rating ? "text-yellow-400" : "",
                      "h-4 w-4 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="flex text-justify pb-3"> {review.reviews}</div>
            </div>
            <div className="col-span-2 flex justify-end pb-2">
              {new Date(review.creationDate).toLocaleDateString(
                undefined,
                format
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
