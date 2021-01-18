import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fetch from 'isomorphic-unfetch'

const Home = ({ events }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>PlanIt</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        {
          events.map((event, i) => (
            <ul key={i}>
              <li>{event.title}</li>
              <li>{event._id}</li>
            </ul>
          ))
        }
      </div>
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch('/api/events')
  const { data } = await res.json()

  return {
    events: data
  }
}

export default Home
