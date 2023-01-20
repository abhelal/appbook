import "@/styles/globals.css";
import "@styles/nprogress.css";
import "@styles/ReactToastify.css";
import NProgress from "nprogress";
import Router from "next/router";
import { Provider } from "react-redux";
import { store } from "../store";
import { ToastContainer } from "react-toastify";
import Layouts from "../layouts";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 80,
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Layouts>
        <Component {...pageProps} />
      </Layouts>
    </Provider>
  );
}
