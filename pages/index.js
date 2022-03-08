import Head from 'next/head'
import Link from 'next/link'

export default function Home() {

  return (
    <div className="container vh-100 d-flex align-item-center">
      <Head>
        <title>GnG Auth App</title>
        <meta name="description" content="Example Auth Web app using Next.js + Firebase" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="my-auto">
        <h1>
          Gages &amp; Gadgets
        </h1>

        <h3>
          Welcome to GnG Authentication Proof of Concept{' '}
          <code>Next.js</code> and <code>Firebase</code>
        </h3>

        <div className="container mt-5">
          <div className="row">
           <div className="col">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">If you have already registered for your email login here.</p>
                  <Link href="/login">
                    <a className="btn btn-primary">Login &rarr;</a>
                  </Link>
                </div>
              </div>
           </div>
  
           <div className="col">
            <div className="card">
              <div className="card-body">
                <p className="card-text">Haven&apos;t create an account yet? Click here.</p>
                <Link href="/sign-up">
                  <a className="btn btn-primary">Sign up &rarr;</a>
                </Link>
              </div>
            </div>
           </div>
          </div>
        </div>
      </main>
    </div>
  )
}
