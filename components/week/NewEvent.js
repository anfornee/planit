import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import { useRouter } from 'next/router'
import { Button, Card, TextField, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import Spacer from '../../components/Spacer'
import styles from '../../styles/New.module.css'

const NewEvent = ({ close }) => {
  const [title, setTitle] = useState('')
  const [sunday, setSunday] = useState(false)
  const [monday, setMonday] = useState(false)
  const [tuesday, setTuesday] = useState(false)
  const [wednesday, setWednesday] = useState(false)
  const [thursday, setThursday] = useState(false)
  const [friday, setFriday] = useState(false)
  const [saturday, setSaturday] = useState(false)
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('10:00')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter()

  const createEvent = async () => {
    const form = {
      title,
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      startTime,
      endTime
    }
    try {
      await fetch('/api/events', {
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

    if (!startTime) {
      err.startTime = 'Start time is required'
    }

    if (!endTime) {
      err.endTime = 'End time is required'
    }

    return err
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card} raised>
        {
          isSubmitting
            ? <span>loading...</span>
            : (
              <div className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.close} onClick={() => close(false)}>
                  X
                </div>
                <h1>Create Event</h1>
                <TextField
                  id='new-event-title'
                  name='title'
                  label='Title'
                  onChange={e => setTitle(e.target.value)}
                />
                <Spacer size='1em' />
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color='primary'
                        onChange={() => setSunday(!sunday)}
                      />
                    }
                    label='Sunday'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color='primary'
                        onChange={() => setMonday(!monday)}
                      />
                    }
                    label='Monday'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color='primary'
                        onChange={() => setTuesday(!tuesday)}
                      />
                    }
                    label='Tuesday'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color='primary'
                        onChange={() => setWednesday(!wednesday)}
                      />
                    }
                    label='Wednesday'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color='primary'
                        onChange={() => setThursday(!thursday)}
                      />
                    }
                    label='Thursday'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color='primary'
                        onChange={() => setFriday(!friday)}
                      />
                    }
                    label='Friday'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color='primary'
                        onChange={() => setSaturday(!saturday)}
                      />
                    }
                    label='Saturday'
                  />
                </FormGroup>
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
