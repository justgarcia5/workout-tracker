import React, { useState, useEffect } from 'react';

export default function ExercisesList(props) {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/exercises')
      .then(res => res.json())
      .then(data => setExercises(data))
      .catch(err => console.log(err));
  },[])

  const deleteExercise = id => {
    fetch(`http://localhost:3001/exercises/${id}`, {
      method: 'DELETE',
    }).then(response => response.json())

    setExercises(() => exercises.filter(exercise => exercise._id !== id))
  }

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        {exercises.map((exercise, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>{exercise.username}</td>
                <td>{exercise.description}</td>
                <td>{exercise.duration}</td>
                <td>{exercise.date}</td>
                <td>
                  <button onClick={() => deleteExercise(exercise._id)}>Delete</button>
                </td>
              </tr>
            </tbody>
          )
        })}
      </table>
    </div>
  )
}