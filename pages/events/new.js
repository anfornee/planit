import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import { useRouter } from 'next/router'

const NewEvent = () => {
  const [form, setForm] = useState({ title: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter()

  const createEvent = async () => {
    try {
      await fetch('http://localhost:3000/api/events', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      router.push('/')
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

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const validate = () => {
    const err = {}

    if (!form.title) {
      err.title = 'TItle is required'
    }

    return err
  }

  return (
    <div className='form-container'>
      <h1>Create Event</h1>
      <div>
        {
          isSubmitting
            ? <p>loading...</p>
            : (
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  placeholder='Title'
                  name='title'
                  onChange={handleChange}
                />
                <input
                  type='submit'
                  value='Submit'
                />
              </form>
            )
        }
      </div>
    </div>
  )
}

export default NewEvent
