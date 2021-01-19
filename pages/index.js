import { useState } from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import Slider from 'react-slick'
import { Button } from '@material-ui/core'
import NewEvent from '../components/week/NewEvent'
import Weekday from '../components/week/Weekday'
import style from '../styles/Events.module.css'

const daysOfTheWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

const date = new Date()
const currentDay = date.getDay()

const slickSettings = {
  className: style.weekdaySlick,
  infinite: true,
  slidesToShow: 1,
  speed: 300,
  initialSlide: currentDay
}

const Events = ({ events }) => {
  const [newActive, setNewActive] = useState(false)

  const days = {}
  events.forEach(event => {
    daysOfTheWeek.forEach(day => {
      if (event[day]) {
        if (!days[day]) {
          days[day] = [event]
        } else {
          days[day] = [...days[day], event]
        }
      }
    })
  })

  return (
    <>
      <Head>
        <title>PlanIt</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div id='events' className={style.events}>
        <h1>Events</h1>
        <Slider {...slickSettings}>
          {
            daysOfTheWeek.map((day, i) => (
              <div key={i}>
                <Weekday day={day} events={days[day]} />
              </div>
            ))
          }
        </Slider>
        {
          newActive
            ? <NewEvent close={setNewActive} />
            : (
              <Button
                variant='contained'
                color='primary'
                onClick={() => setNewActive(true)}
              >
                Add Event
              </Button>
            )
        }
      </div>
    </>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch('/api/events')
  const { data } = await res.json()

  return {
    events: data
  }
}

export default Events
