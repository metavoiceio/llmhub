import { useSession, signIn, signOut } from "next-auth/react"
import Footer from "../components/footer"
import Header from "../components/header"
import styles from '../styles/Home.module.css'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to LLMHub!</h1>
        {/* {
          session ? (
            <>
              Signed in as {session.user.email} <br />
              <button onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <>
              Not signed in <br />
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )
        } */}
      </main>
      <Footer />
    </div>
  )
}
