import Footer from "../components/footer"
import Header from "../components/header"
import UnAuthNavBar from "../components/unAuthNavBar"
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <UnAuthNavBar />
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to LLMHub</h1>
      </main>
      <Footer />
    </div>
  );
}
