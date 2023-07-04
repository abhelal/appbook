"use strict";
exports.id = 188;
exports.ids = [188];
exports.modules = {

/***/ 2188:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_CustomImage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3144);
/* harmony import */ var _features_business_businessSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(232);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_search__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6860);
/* harmony import */ var _libs_axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4104);
/* harmony import */ var _heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8802);
/* harmony import */ var _heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2135);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_features_business_businessSlice__WEBPACK_IMPORTED_MODULE_3__, _libs_axios__WEBPACK_IMPORTED_MODULE_6__]);
([_features_business_businessSlice__WEBPACK_IMPORTED_MODULE_3__, _libs_axios__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










function BusinessCard({ business  }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useDispatch)();
    const { categories  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)((state)=>state.categories);
    const { favBusiness  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)((state)=>state.business);
    const { user  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)((state)=>state.auth);
    const [isFavourite, setIsFavourite] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [changingFav, setChangingFav] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const bc = (0,_utils_search__WEBPACK_IMPORTED_MODULE_9__/* .search */ .y)(categories, business?.businessDetail_id?.business_category, [
        "category_name"
    ])[0];
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const isFav = (0,_utils_search__WEBPACK_IMPORTED_MODULE_9__/* .search */ .y)(favBusiness, business?._id, [
            "_id"
        ])[0] ? true : false;
        setIsFavourite(isFav);
    }, []);
    function showBusiness(business) {
        const url = "business?" + "id=" + business?._id + "&name=" + business.business_id?.business_name;
        dispatch((0,_features_business_businessSlice__WEBPACK_IMPORTED_MODULE_3__/* .setBusiness */ .nK)(business));
        router.push(url);
    }
    const makeFavourite = async ()=>{
        setIsFavourite(!isFavourite);
        setChangingFav(true);
        await _libs_axios__WEBPACK_IMPORTED_MODULE_6__/* ["default"].post */ .Z.post("/api/v1/business/addfav", {
            business_id: business.business_id._id
        }).then(()=>dispatch((0,_features_business_businessSlice__WEBPACK_IMPORTED_MODULE_3__/* .getFavouriteBusiness */ .j)(user._id)));
        setChangingFav(false);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "relative w-full bg-white shadow-md rounded-md overflow-hidden",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "absolute z-20 right-0 top-0 bg-black bg-opacity-30 p-3 rounded-bl-lg",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    onClick: ()=>makeFavourite(),
                    className: changingFav ? "animate-ping" : "",
                    children: isFavourite ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24",
                        fill: "currentColor",
                        className: "w-6 h-6 text-red-500",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                            d: "M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                        })
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        strokeWidth: "1.5",
                        stroke: "currentColor",
                        className: "w-6 h-6 text-white",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        })
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                onClick: ()=>showBusiness(business),
                className: "cursor-pointer w-full ",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "relative rounded-t-lg overflow-hidden h-28 bg-gray-300 border-b w-auto",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_CustomImage__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                            src: business?.businessDetail_id?.business_photos[0],
                            alt: "",
                            fill: true,
                            loading: "eager",
                            className: "object-cover"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "px-2 py-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex justify-between h-16",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "text-left",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "font-semibold truncate max-w-xs",
                                                children: business?.business_id?.business_name.trim().slice(0, 30)
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "mb-2 text-xs",
                                                children: business?.business_id?.business_tagline.trim().slice(0, 50)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        style: {
                                            backgroundColor: bc?.category_color
                                        },
                                        className: `flex relative h-8 w-8 p-1.5 flex-shrink-0 items-center justify-center rounded-full overflow-hidden`,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_CustomImage__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                                            src: bc?.category_image,
                                            width: 20,
                                            height: 20,
                                            alt: "",
                                            loading: "eager"
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        style: {
                                            backgroundColor: bc?.category_color
                                        },
                                        className: "text-xs text-white rounded-md shadow-sm p-1 px-3",
                                        children: bc?.category_name
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex h-6 items-center justify-center rounded-full bg-gray-100 bg-opacity-80 px-3 text-sm font-semibold",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_7__.StarIcon, {
                                                className: "w-5 h-5 text-yellow-400"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "px-1",
                                                children: business?.business_id?.Stars.toString().slice(0, 4)
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex gap-1 items-center text-sm text-primary-500 text-left py-1.5",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__.MapPinIcon, {
                                        className: "w-5 h-5 flex-shrink-0 text-primary-500"
                                    }),
                                    business?.business_id?.address ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "px-1 whitespace-nowrap truncate",
                                        children: business?.business_id?.address
                                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: "Business has no fixed location, Fully Mobile"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BusinessCard);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6860:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ search)
/* harmony export */ });
function search(items, query = "", searchParam = []) {
    if (items) {
        return items.filter((item)=>{
            return searchParam.some((newItem)=>{
                return String(item[newItem]).toLowerCase().indexOf(query?.toLowerCase()) > -1;
            });
        });
    } else return [];
}



/***/ })

};
;