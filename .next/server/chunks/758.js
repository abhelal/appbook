"use strict";
exports.id = 758;
exports.ids = [758];
exports.modules = {

/***/ 935:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8087);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_0__);

const socket = socket_io_client__WEBPACK_IMPORTED_MODULE_0___default()("https://api.app-book.co.uk");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);


/***/ }),

/***/ 6367:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* binding */ groupMsg),
/* harmony export */   "m": () => (/* binding */ recepient)
/* harmony export */ });
/* unused harmony export cs */
function recepient(chat, user) {
    if (chat.to._id === user._id) {
        return chat.from;
    } else {
        return chat.to;
    }
}
function cs(chat, user) {
    if (chat.to._id === user._id) {
        return chat.from;
    } else {
        return chat.to;
    }
}
function groupMsg(chats) {
    const groups = chats.reduce((groups, chat)=>{
        const date = new Date(chat.createdAt).toDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(chat);
        return groups;
    }, {});
    const groupedMessage = Object.keys(groups).map((date)=>{
        return {
            date,
            chats: groups[date]
        };
    });
    const sortedAsc = groupedMessage.sort((objA, objB)=>Number(new Date(objB.date)) - Number(new Date(objA.date)));
    return sortedAsc;
}


/***/ })

};
;