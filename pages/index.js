import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>GnG Auth App</title>
        <meta name="description" content="Example Auth Web app using Next.js + Firebase" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Gages &amp; Gadgets
        </h1>

        <p className={styles.description}>
          Welcome to GnG Authentication Proof of Concept{' '}
          <code className={styles.code}>Next.js</code> and <code className={styles.code}>Firebase</code>
        </p>

        <div className={styles.grid}>
          <Link href="/login">
            <a className={styles.card}>
              <h2>Login &rarr;</h2>
              <p>If you have already registered for your email login here.</p>
            </a>
          </Link>

          <Link href="/sign-up">
            <a className={styles.card}>
              <h2>Sign up &rarr;</h2>
              <p>Haven&apos;t create an account yet? Click here.</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  )
}
