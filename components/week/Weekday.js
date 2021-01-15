import {
  Card,
  CardContent,
  Typography
} from '@material-ui/core'
import styles from './weekday.module.css'

const borderTop = { borderTop: '1px solid rgba(0,0,0,.2)' }

const Weekday = ({ day, events }) => {
  let todaysEvents = []
  if (events === undefined) {
    todaysEvents[0] = 0
  } else todaysEvents = events
  return (
    <div className={styles.card}>
      <Card>
        <CardContent>
          <Typography>
            <h1>{day}</h1>
            {
              todaysEvents.map((event, i) => {
                if (event === 0 || !event) {
                  return
                }
                const startTime = event.startTime ? event.startTime.replace(/^0/, '') : 'poop'
                const endTime = event.startTime ? event.endTime.replace(/^0/, '') : 'farts'
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
