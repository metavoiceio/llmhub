import { SessionProvider } from "next-auth/react"
import 'react-toastify/dist/ReactToastify.css';
import 'react-modern-drawer/dist/index.css'
import 'rsuite/dist/rsuite.min.css'
import '../styles/globals.css'
import { ToastContainer } from 'react-toastify';
import Router from "next/router"
import NProgress from "nprogress"
import Header from "../components/header";

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <script src="https://unpkg.com/flowbite@1.5.4/dist/flowbite.js" async />
    </SessionProvider>
  )
}
