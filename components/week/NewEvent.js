import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import { useRouter } from 'next/router'
import { Button, Card, Select, TextField } from '@material-ui/core'
import Spacer from '../../components/Spacer'
import styles from './new.module.css'

const NewEvent = () => {
  const [title, setTitle] = useState('')
  const [day, setDay] = useState('')
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('10:00')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter()

  const createEvent = async () => {
    const form = {
      title,
      day,
      startTime,
      endTime
    }
    try {
      await fetch('http://localhost:3000/api/events', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      router.reload()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isSubmitting) {
      Object.keys(errors).length === 0
        ? createEvent()
        : setIsSubmitting(false)
    }
  }, [errors])

  const handleSubmit = e => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    setIsSubmitting(true)
  }

  const validate = () => {
    const err = {}

    if (!title) {
      err.title = 'Title is required'
    }

    if (!day) {
      err.day = 'Day is required'
    }

    if (!startTime) {
      err.startTime = 'Start time is required'
    }

    if (!endTime) {
      err.endTime = 'End time is required'
    }

    return err
  }

  return (
    <div className={styles.card}>
      <Card raised>
        {
          isSubmitting
            ? <span>loading...</span>
            : (
              <div className={styles.form} onSubmit={handleSubmit}>
                <h1>Create Event</h1>
                <TextField
                  id='new-event-title'
                  name='title'
                  label='Title'
                  onChange={e => setTitle(e.target.value)}
                />
                <Spacer size='1em' />
                <Select
                  native
                  value={day}
                  onChange={e => setDay(e.target.value)}
                  inputProps={{
                    name: 'day',
                    id: 'new-event-day'
                  }}
                >
                  <option value='' disabled>Pick a day</option>
                  <option value='Monday'>Monday</option>
                  <option value='Tuesday'>Tuesday</option>
                  <option value='Wednesday'>Wednesday</option>
                  <option value='Thursday'>Thursday</option>
                  <option value='Friday'>Friday</option>
                  <option value='Saturday'>Saturday</option>
                  <option value='Sunday'>Sunday</option>
                </Select>
                {/* <TextField
                  id='new-event-day'
                  name='day'
                  label='Day'
                  onChange={e => setDay(e.target.value)}
                /> */}
                <Spacer size='1em' />
                <TextField
                  id='new-event-start-time'
                  name='startTime'
                  label='Start Time'
                  type='time'
                  defaultValue='09:00'
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }}
                  onChange={e => setStartTime(e.target.value)}
                />
                <Spacer size='1em' />
                <TextField
                  id='new-event-end-time'
                  name='endTime'
                  label='End Time'
                  type='time'
                  defaultValue='10:00'
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }}
                  onChange={e => setEndTime(e.target.value)}
                />
                <Spacer size='2em' />
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            )
        }
      </Card>
    </div>
  )
}

export default NewEvent
