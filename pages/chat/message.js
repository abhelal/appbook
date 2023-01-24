import { PlusIcon } from "@heroicons/react/20/solid";
import { PaperAirplaneIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import CustomImage from "@components/CustomImage";
import { useEffect, useRef, useState } from "react";
import axios from "@libs/axios";
import { useSelector } from "react-redux";
import { groupMsg } from "utils/chat";
import moment from "moment";
import { useRouter } from "next/router";
import socket from "@libs/socket";

export default function message() {
  const imageInput = useRef(null);
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { to, from, business_id, business_name } = router.query;
  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("receive-message", (data) => setNewChat(data));
    async function getChat() {
      await axios
        .get(
          `/api/v1/chat/getAllMessages?from=${from}&to=${to}&business_id=${business_id}`
        )
        .then((res) => setChats([...res.data.msgs]));
    }
    if (router.isReady) getChat();
  }, [router.isReady]);

  useEffect(() => {
    if (newChat) setChats([...chats, newChat]);
  }, [newChat]);

  useEffect(() => {
    if (!user) router.push("/");
  }, [user]);

  function sendMessage(img) {
    const newmessage = {
      message_id: socket.id,
      business_id: business_id,
      from: user._id,
      to: to,
      sent: true,
      recieve: false,
      avatar: user.avatar,
      message: message,
      image: img,
      createdAt: new Date(),
    };
    socket.emit("send-message", newmessage);
    setMessage("");
  }

  async function handleOnChange(changeEvent) {
    const image = changeEvent.target.files[0];
    let formData = new FormData();
    image && formData.append("images", image);
    await axios
      .post("/api/v1/chat/upload", formData)
      .then((res) => {
        imageInput.current.value = null;
        sendMessage(res.data.url);
      })
      .catch((e) => console.log(e));
  }
  if (!user) return null;
  else
    return (
      <>
        <div className="flex felx-col h-0 flex-grow w-full justify-center">
          <div className="flex flex-col w-full max-w-3xl p-4">
            <div className="flex justify-between w-full max-w-3xl items-center">
              <button onClick={() => router.push("/chat")}>
                <ArrowLeftIcon className=" text-primary-500 w-5 h-5" />
              </button>
              <div className="tex-lg font-semibold">{business_name}</div>

              <div className="flex justify-center items-center w-6 h-6 bg-white border border-primary-500 rounded-md shadow text-white">
                <button onClick={() => imageInput.current.click()}>
                  <PlusIcon className="w-5 h-5 text-primary-500" />
                </button>
                <input
                  type="file"
                  className="hidden"
                  ref={imageInput}
                  onChange={handleOnChange}
                  accept="image/png, image/jpg, image/jpeg"
                />
              </div>
            </div>
            <p className="border-b w-full max-w-3xl m-3"></p>
            <div className="flex relative h-0 flex-grow flex-col-reverse gap-4 w-full overflow-y-auto scrollboxmenu px-4">
              {groupMsg(chats).map((day, index) => (
                <div key={index}>
                  <p className="sticky z-20 top-1 text-sm font-semibold text-center py-2">
                    <span className="bg-white px-4 py-1 rounded-full">
                      {day.date}
                    </span>
                  </p>
                  {day.chats?.map((chat, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        chat._id != user?._id ? "justify-end" : "justify-start"
                      } w-full`}
                    >
                      <div
                        className={`flex ${
                          chat._id === user?._id ? "flex-row-reverse" : ""
                        } w-full justify-start items-center max-w-xs lg:max-w-md`}
                      >
                        <div className="w-full h-auto max-h-96">
                          {chat.image ? (
                            <div className="relative z-0 h-80 w-auto rounded-lg overflow-hidden my-4">
                              <CustomImage
                                src={chat.image}
                                alt=""
                                fill
                                className="object-contain rounded-xl overflow-hidden"
                              />
                            </div>
                          ) : (
                            ""
                          )}

                          {chat.text || chat.message ? (
                            <p
                              className={`p-2 w-full h-full ${
                                chat._id != user._id
                                  ? "bg-primary-400 rounded-tr-2xl"
                                  : "bg-gray-300 rounded-tl-2xl"
                              } text-white leading-tight`}
                            >
                              {chat.text ? chat.text : chat.message}
                            </p>
                          ) : (
                            ""
                          )}
                          <p
                            className={`text-xs ${
                              chat._id != user._id ? "text-right" : "text-left"
                            }`}
                          >
                            {moment(chat.createdAt).format("LT")}
                          </p>
                        </div>
                        <div className="flex items-center p-2">
                          <div className="relative w-10 h-10 bg-primary-100 rounded-full overflow-hidden">
                            <CustomImage
                              src={
                                chat._id != user._id
                                  ? user?.avatar
                                  : chat?.business_id?.business_avatar
                              }
                              alt=""
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex w-full focus-within:ring focus-within:ring-primary-500 focus-within:ring-opacity-30 border rounded-md focus-within:border-primary-500 overflow-hidden p-3">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full focus:outline-none pl-4"
                placeholder="your message"
              ></input>
              <button
                disabled={!message}
                onClick={() => sendMessage("")}
                className="flex justify-center items-center w-6 h-6 bg-primary-100 rounded-sm text-white"
              >
                <PaperAirplaneIcon className="w-4 h-4 text-primary-500" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
}
