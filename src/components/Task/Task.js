/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect, useRef } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

function Task({ task, onToggle, onDelete, onEdit, onUpdate }) {
  const { id, description, created, completed, min: taskMin, sec: taskSec, lastSavedTime } = task
  const [min, sec] = [taskMin || 0, taskSec || 0]
  const [isEditing, setEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(description)
  const [elapsedTime, setElapsedTime] = useState(min * 60 * 1000 + sec * 1000 || 10 * 60 * 1000)
  const [isRunning, setIsRunning] = useState(task.isRunning)
  const [isPaused, setIsPaused] = useState(true)
  const timer = useRef(null)

  const startTimer = () => {
    timer.current = setInterval(() => {
      setElapsedTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1000
        }
        onToggle(id)
        clearInterval(timer.current)
        timer.current = null
        setIsRunning(false)
        return 0
      })
    }, 1000)
    setIsRunning(true)
  }

  const pauseTimer = () => {
    clearInterval(timer.current)
    timer.current = null
    setIsRunning(false)
    setIsPaused(true)
  }

  const resumeTimer = () => {
    if (isRunning) {
      pauseTimer()
    } else {
      startTimer()
    }
  }

  const handleToggle = () => {
    onToggle(id)
  }

  const handleDelete = () => {
    clearInterval(timer.current)
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

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value)
  }

  useEffect(() => {
    return () => {
      if (isRunning) {
        const unmountTime = new Date()
        const remainingMin = Math.floor(elapsedTime / 60000)
        const remainingSec = ((elapsedTime % 60000) / 1000).toFixed(0)
        onUpdate(id, remainingMin, remainingSec, isRunning, unmountTime)
      }
    }
  }, [elapsedTime])

  useEffect(() => {
    if (lastSavedTime && task.isRunning) {
      const now = new Date()
      const diff = Math.floor((now - new Date(lastSavedTime)) / 1000)
      const newElapsedTime = elapsedTime - diff * 1000
      setElapsedTime(newElapsedTime > 0 ? newElapsedTime : 0)
      startTimer()
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleEscapeKey)
    return () => {
      window.removeEventListener('keydown', handleEscapeKey)
    }
  }, [completed])

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current)
      }
    }
  }, [])

  return (
    <li className={completed ? 'completed' : ''}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={handleToggle} />
        {isEditing ? (
          <>
            <input
              className="edit"
              type="text"
              value={editedDescription}
              onChange={handleDescriptionChange}
              autoFocus
              onBlur={handleCancel}
              onKeyDown={(e) => {
                e.key === 'Enter' && handleSave()
                e.key === 'Escape' && handleCancel()
              }}
            />
            <button className="icon icon-edit" onClick={handleCancel} />
          </>
        ) : (
          <>
            <label>
              <span className="title">{description}</span>
              <span className="description">
                {!completed && (
                  <>
                    <button
                      className={`icon icon-${isRunning ? 'pause' : 'play'}`}
                      onClick={resumeTimer}
                      style={{ marginRight: '8px' }}
                    />
                    {`${Math.floor(elapsedTime / 60000)}:${Math.floor((elapsedTime % 60000) / 1000)}`}
                  </>
                )}
              </span>
              <span className="created">{`created ${formatDistanceToNow(new Date(created.getTime()))}`}</span>
            </label>
            <button className="icon icon-edit" onClick={handleEdit} />
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
    min: PropTypes.number.isRequired,
    sec: PropTypes.number.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default Task
