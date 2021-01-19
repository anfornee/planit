import {
  Card,
  CardContent,
  Typography
} from '@material-ui/core'
import styles from '../../styles/Weekday.module.css'

const borderTop = { borderTop: '1px solid rgba(0,0,0,.2)' }

const formatTime = (time) => {
  let newTime = time.replace(/^0/, '')

  if (parseInt(newTime) >= 12) {
    const timeArr = newTime.split(':')
    if (parseInt(timeArr[0]) > 12) {
      timeArr[0] = (parseInt(timeArr[0]) - 12).toString()
    }
    newTime = timeArr.join(':') + ' pm'
  } else {
    newTime = newTime + ' am'
  }

  return newTime
}

const Weekday = ({ day, events }) => {
  const todaysEvents = events === undefined ? [0] : events

  return (
    <div className={styles.card}>
      <Card raised>
        <CardContent>
          <Typography>
            <h1>{day}</h1>
            {
              todaysEvents.map((event, i) => {
                if (event === 0 || !event) {
                  return
                }
                const startTime = event.startTime ? formatTime(event.startTime) : 'farts'
                const endTime = event.endTime ? formatTime(event.endTime) : 'poop'
                return (
                  <p
                    style={i === 0 ? borderTop : {}}
                    className={styles.eventContainer}
                    key={i}
                  >
                    <span>{event.title}</span>
                    <span>&nbsp;{startTime} - {endTime}</span>
                  </p>
                )
              })
            }
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default Weekday
