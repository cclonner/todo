import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

function Task({ task, onToggle, onDelete, onEdit }) {
  const { id, description, created, completed } = task
  const [isEditing, setEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(description)

  const handleToggle = () => {
    onToggle(id)
  }

  const handleDelete = () => {
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

  const timeAgo = formatDistanceToNow(new Date(created), { addSuffix: true })

  return (
    <li className={completed ? 'completed' : ''}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={handleToggle} />
        {!isEditing ? (
          <>
            <label>
              <span className="description">{description}</span>
              <span className="created">{`created ${timeAgo}`}</span>
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

export default Task

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}
