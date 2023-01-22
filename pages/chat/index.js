import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "@libs/axios";
import CustomImage from "@components/CustomImage";
import { recepient } from "utils/chat";
import { useSelector } from "react-redux";
import Spinner from "@components/Spinner";
import socket from "@libs/socket";

export default function Chat() {
  const { user } = useSelector((state) => state.auth);
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
    <>
      <div className="flex flex-grow justify-center p-4">
        <div className="flex flex-col w-full justify-start items-center max-w-4xl bg-white rounded-md px-4 pb-8 shadow-lg text-gray-500">
          <div className="flex justify-between w-full max-w-xl items-center pt-3 pb-2">
            <p></p>
            <div className="tex-lg font-semibold uppercase">Chat</div>
            <button onClick={() => setShowDelete(!showDelete)}>
              <TrashIcon className={`w-6 h-6 ${showDelete ? "text-primary-500" : ""}`} />
            </button>
          </div>
          <p className="border-b w-full max-w-xl mb-3"></p>
          <div className="flex flex-col h-0 flex-grow gap-4 w-full overflow-y-auto">
            {chatRooms?.map((chat, idx) => (
              <Link
                className="flex items-center hover:bg-gray-50 text-sm border-b-2 pb-3 md:mx-8 rounded-sm"
                href={`/chat/message/?o=${recepient(chat, user)._id}&s=${user._id}&b=${
                  chat.business_id?._id
                }&on=${chat?.business_id?.business_name ?? recepient(chat, user)?.full_name}`}
                key={idx}
              >
                <div className="flex items-center p-2">
                  <div className="relative w-12 h-12 bg-primary-100 rounded-full overflow-hidden">
                    <CustomImage
                      src={chat?.business_id?.business_avatar ?? chat?.from?.avatar}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex flex-col justify-between md:flex-row relative pr-4">
                    <div className="font-semibold">
                      {chat?.business_id?.business_name ?? recepient(chat, user)?.full_name}
                    </div>
                    <div className="flex justify-between">
                      <p>{chat.time}</p>
                      {showDelete ? (
                        <button className="absolute md:static top-0 right-0 text-red-500 pl-4">
                          Delete
                        </button>
                      ) : (
                        <p className="absolute md:static top-0 right-0 pl-4 invisible">Delete</p>
                      )}
                    </div>
                  </div>
                  <div className="flex truncate max-w-xl">{chat.message}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
