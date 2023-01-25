import { useState, useRef } from "react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import CustomeImage from "@components/CustomImage";

export default function Avatar({ appendImage }) {
  const { user } = useSelector((state) => state.auth);
  const imageInput = useRef(null);

  const onCameraClick = () => {
    imageInput.current.click();
  };

  const [imageSrc, setImageSrc] = useState("");

  function handleOnChange(changeEvent) {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };
    if (changeEvent.target.files[0]) {
      reader.readAsDataURL(changeEvent.target.files[0]);
      appendImage(changeEvent.target.files[0]);
    }
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    const image = imageInput.current.files[0];
    const formData = new FormData();
    formData.append("image", image);
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <div className="flex justify-center items-center">
          <div className="relative w-24 h-24 m-2 ">
            {imageSrc ? (
              <img
                className="rounded-full border w-24 h-24 border-gray-100 shadow-sm overflow-hidden text-center"
                src={imageSrc}
                alt="avatar"
              />
            ) : (
              <div className="w-24 h-24 relative rounded-full border  border-gray-100 shadow-sm overflow-hidden">
                <CustomeImage
                  src={user?.avatar}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}
            <input
              type="file"
              className="hidden"
              ref={imageInput}
              onChange={handleOnChange}
              accept="image/jpg, image/jpeg"
            />
            {!imageSrc && (
              <div className="absolute top-2 right-2 h-3 w-3 border border-white rounded-full bg-green-400 z-2"></div>
            )}
            <div className="absolute bottom-2 right-0 border bg-gray-50 rounded-full z-2">
              <div className="flex justify-center items-center h-6 w-6">
                <button type="button" onClick={onCameraClick}>
                  <CameraIcon className="w-4 h-4 text-gray-400 hover:text-primary-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
