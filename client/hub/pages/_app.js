import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <script src="https://unpkg.com/flowbite@1.5.4/dist/flowbite.js" />
    </SessionProvider>
  )
}
