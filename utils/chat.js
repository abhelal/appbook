export function recepient(chat, user) {
  if (chat.to._id === user._id) {
    return chat.from;
  } else {
    return chat.to;
  }
}

export function cs(chat, user) {
  if (chat.to._id === user._id) {
    return chat.from;
  } else {
    return chat.to;
  }
}

export function groupMsg(chats) {
  const groups = chats.reduce((groups, chat) => {
    const date = new Date(chat.createdAt).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(chat);
    return groups;
  }, {});

  const groupedMessage = Object.keys(groups).map((date) => {
    return {
      date,
      chats: groups[date],
    };
  });

  const sortedAsc = groupedMessage.sort(
    (objA, objB) => Number(new Date(objB.date)) - Number(new Date(objA.date))
  );
  return sortedAsc;
}
