import React, { useState, useEffect, useRef } from 'react'
import { formatDistanceToNow, format } from 'date-fns'
import PropTypes from 'prop-types'

function Task({ task, onToggle, onDelete, onEdit }) {
  const { id, description, created, completed } = task
  const [isEditing, setEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(description)
  const [elapsedTime, setElapsedTime] = useState(0)
  const timer = useRef(null)

  const startTimer = () => {
    const startTime = Date.now() - elapsedTime
    timer.current = requestAnimationFrame(function tick() {
      setElapsedTime(Date.now() - startTime)
      timer.current = requestAnimationFrame(tick)
    })
  }

  const stopTimer = () => {
    cancelAnimationFrame(timer.current)
    timer.current = null
  }

  const handleToggle = () => {
    onToggle(id)
  }

  const handleDelete = () => {
    stopTimer()
    onDelete(id)
  }

  const handleEdit = () => {
    setEditing(true)
  }

  const handleSave = () => {
    onEdit(id, editedDescription)
    setEditing(false)
  }

  const handleCancel = () => {
    setEditedDescription(description)
    setEditing(false)
  }

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value)
  }

  useEffect(() => {
    if (completed) {
      stopTimer()
    }
  }, [completed])

  return (
    <li className={completed ? 'completed' : ''}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={handleToggle} />
        {!isEditing ? (
          <>
            <label>
              <span className="title">{description}</span>
              <span className="description">
                {!completed && (
                  <button
                    className={`icon icon-${timer.current !== null ? 'pause' : 'play'}`}
                    onClick={timer.current !== null ? stopTimer : startTimer}
                  >
                    {format(new Date(elapsedTime), 'mm:ss')}
                  </button>
                )}
              </span>
              <span className="created">{`created ${formatDistanceToNow(new Date(created.getTime()))}`}</span>
            </label>
            <button className="icon icon-edit" onClick={handleEdit} />
          </>
        ) : (
          <>
            <input
              type="text"
              value={editedDescription}
              onChange={handleDescriptionChange}
              autoFocus
              onBlur={handleSave}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
            <button className="icon icon-edit" onClick={handleCancel} />
          </>
        )}
        <button className="icon icon-destroy" onClick={handleDelete} />
      </div>
    </li>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default Task
