import Footer from "../components/footer"
import Header from "../components/header"
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>Incorrect route, not found</div>
      </main>
      <Footer />
    </div>
  );
}
