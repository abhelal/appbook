import { useRouter } from "next/router";
import CustomImage from "@/components/CustomImage";
import { useSelector } from "react-redux";

export default function PopularCategory() {
  const router = useRouter();
  const { categories } = useSelector((state) => state.categories);

  function onClick(category_name) {
    router.push(`/search?category=${category_name}`);
  }

  return (
    <div className="">
      <div className="text-3xl text-center w-full p-4 text-gray-500 font-semibold">
        Popular Category
      </div>

      <div className="flex flex-wrap w-full h-auto pb-10 justify-around items-center gap-x-2 gap-y-6">
        {categories?.map((category, idx) => (
          <button
            key={idx}
            onClick={() => onClick(category.category_name)}
            style={{ backgroundColor: category.category_color }}
            className="flex h-20 w-20 flex-col items-center justify-center rounded-lg shadow-md p-2 text-white"
          >
            <div className="flex flex-col justify-center items-center">
              <div className="relative w-8 h-8">
                <CustomImage
                  src={category.category_image}
                  alt=""
                  layout="fill"
                  loading="eager"
                />
              </div>
              <div className="text-center text-xs text-white">
                {category.category_name}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
