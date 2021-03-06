import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function CreateExercise() {
  const [startDate, setStartDate] = useState(new Date())
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: ""
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  },[]);

  const handleSubmit = e => {
    e.preventDefault();
    const newExercise = {
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: startDate
    }
    fetch('http://localhost:3001/exercises/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExercise),
    }).then(res => res.json())
      .then(data => console.log(`Success: ${data}`))
      .catch(err => console.log(err))
      window.location = '/';
  }

  const handleChange = e => {
    exercise[e.target.name] = e.target.value;
    setExercise(prevState => {
      return { ...prevState, exercise };
    });
  }

  const handleDate = (date) => {
    setStartDate(date);
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <select className="form-control" value={exercise.username} name="username" onChange={handleChange}>
            <option value="" disabled>
              Select a user...
            </option>
            {users.map(user => {
              return (
                <option key={user._id}>
                  {user.username}
                </option>
              )
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={exercise.description}
            name="description"
            className="form-control"
            id="description"
            placeholder="Enter description here..."
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Duration</label>
          <input
            type="number"
            value={exercise.duration}
            name="duration"
            className="form-control"
            id="duration"
            placeholder="Enter duration here..."
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <div>
            <DatePicker
              name="date"
              value={startDate}
              selected={startDate}
              onChange={handleDate}
              className='form-control'
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}