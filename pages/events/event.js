import Head from 'next/head'
import Link from 'next/link'

const Event = () => (
  <>
    <Head>
      <title>Event</title>
    </Head>
    <div>
      <h1>
        Event&nbsp;
        <Link href='/'>
          <a>
            Go home...
          </a>
        </Link>
      </h1>
    </div>
  </>
)

export default Event
