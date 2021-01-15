import fetch from 'isomorphic-unfetch'
import NewEvent from '../../components/week/NewEvent'
import Weekday from '../../components/week/Weekday'

/*
*
*
*
*
Work in functionality to select multiple days
Probably a radio select for the form
and a true false check in the database for each day
*
*
*
*
*/

const Events = ({ events }) => {
  const days = {}
  events.forEach(event => {
    if (!days[event.day]) {
      days[event.day] = [event]
    } else {
      days[event.day] = [...days[event.day], event]
    }
  })
  return (
    <>
      <div>
        <h1>Events</h1>
        <Weekday day='Monday' events={days.Monday} />
        <Weekday day='Tuesday' events={days.Tuesday} />
        <Weekday day='Wednesday' events={days.Wednesday} />
        <Weekday day='Thursday' events={days.Thursday} />
        <Weekday day='Friday' events={days.Friday} />
        <Weekday day='Saturday' events={days.Saturday} />
        <Weekday day='Sunday' events={days.Sunday} />
        <NewEvent />
      </div>
    </>
  )
}

Events.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/events')
  const { data } = await res.json()

  return {
    events: data
  }
}

export default Events
