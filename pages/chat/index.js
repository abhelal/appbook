import { TrashIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import axios from "@libs/axios";
import CustomImage from "@components/CustomImage";
import { recepient } from "utils/chat";
import { useSelector } from "react-redux";
import Spinner from "@components/Spinner";
import socket from "@libs/socket";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

export default function Chat() {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);
  const [chatRooms, setChatRooms] = useState();
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    async function getChatRooms() {
      socket.on("connect", () => {
        let obj = {
          userId: user._id,
          socketId: socket.id,
          isOnline: true,
        };
        socket.emit("set-online", obj);
      });

      setLoadingData(true);
      await axios.get("/api/v1/chat/all-users/messages").then((res) => setChatRooms(res.data.data));
      setLoadingData(false);
    }
    getChatRooms();
  }, []);

  if (loadingData) return <Spinner />;

  return (
    <div className="flex flex-grow justify-center p-4">
      <div className="flex flex-col w-full justify-start items-center max-w-4xl bg-white rounded-md pb-8 shadow-lg text-gray-500">
        <div className="flex justify-between w-full max-w-xl items-center p-3 pb-2">
          <button onClick={() => router.push("/")}>
            <ArrowLeftIcon className="w-6 h-5 text-primary-500" />
          </button>
          <div className="tex-lg font-semibold">CHAT</div>
          <button onClick={() => setShowDelete(!showDelete)}>
            <TrashIcon className={`w-6 h-6 ${showDelete ? "text-primary-500" : ""}`} />
          </button>
        </div>
        <p className="border-b w-full max-w-xl mb-3"></p>
        <div className="w-full flex flex-col h-0 flex-grow overflow-y-auto scrollboxmenu px-8">
          {chatRooms?.map((chat, index) => (
            <div key={index} className="grid grid-cols-12 border-b py-2 hover:bg-gray-50">
              <div
                onClick={() =>
                  router.push(
                    `/chat/message?to=${recepient(chat, user)._id}&from=${user._id}&business_id=${
                      chat.business_id?._id
                    }&business_name=${
                      chat?.business_id?.business_name ?? recepient(chat, user)?.full_name
                    }`
                  )
                }
                className="col-span-11 px-3 cursor-pointer"
              >
                <div className="flex gap-3 justify-between items-center w-full">
                  <div className="relative flex justify-center items-center shrink-0 w-14 h-14 border bg-gray-100 rounded-full overflow-hidden">
                    <CustomImage
                      src={chat?.business_id?.business_avatar ?? chat?.from?.avatar}
                      alt="avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-full h-12">
                    <div className="text-sm font-semibold max-w-[6rem] lg:max-w-xs truncate">
                      {chat?.business_id?.business_name ?? recepient(chat, user)?.full_name}
                    </div>
                    <div className="flex text-xs truncate max-w-xl">{chat.message}</div>
                  </div>
                  <div className="shrink-0 whitespace-nowrap text-xs">{chat.time}</div>
                </div>
              </div>
              <div className="col-span-1 flex justify-center items-center">
                {showDelete && <button className="text-red-500 text-xs">Delete</button>}
              </div>
            </div>
          ))}

          {chatRooms?.length < 1 ? (
            <div className="flex flex-col flex-grow items-center justify-center">
              <p className="text-primary-500 text-2xl font-semibold py-2">Oops!</p>
              <p className="font-medium">You do not have any message</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
