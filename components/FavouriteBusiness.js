import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useSelector } from "react-redux";
import BusinessCard from "@components/BusinessCard";

export default function FavouriteBusiness({ businessess }) {
  const { user } = useSelector((state) => state.auth);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    created() {
      setLoaded(true);
    },

    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 1.1, spacing: 10 },
      },
      "(min-width: 600px)": {
        slides: { perView: 2.1, spacing: 20 },
      },
      "(min-width: 800px)": {
        slides: { perView: 3, spacing: 20 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 4, spacing: 30 },
      },
    },
    slides: { perView: 1.1 },
  });

  function Arrow(props) {
    const disabeld = props.disabled ? "arrow--disabled" : "";
    return (
      <svg
        onClick={props.onClick}
        className={`arrow ${
          props.left ? "arrow--left" : "arrow--right"
        } ${disabeld}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    );
  }

  if (!user || !businessess) return <div className="p-8"></div>;

  if (businessess.length > 0) {
    return (
      <div className="md:p-10">
        <div className="text-gray-600 text-md lg:text-xl font-semibold pb-4">
          Your Favourite Business
        </div>
        <div className="navigation-wrapper px-8">
          <div ref={sliderRef} className="keen-slider">
            {businessess.map((business, idx) => (
              <div key={idx} className="keen-slider__slide rounded-lg">
                <BusinessCard business={business} />
              </div>
            ))}
          </div>

          {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
              />
              <Arrow
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
              />
            </>
          )}
        </div>
      </div>
    );
  }
}
