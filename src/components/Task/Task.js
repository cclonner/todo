import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

function Task({ task, onToggle, onDelete }) {
  const { id, description, created, completed } = task

  const handleToggle = () => {
    onToggle(id)
  }

  const handleDelete = () => {
    onDelete(id)
  }

  const timeAgo = formatDistanceToNow(new Date(created), { addSuffix: true })

  return (
    <li className={completed ? 'completed' : ''}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={handleToggle} />
        <label>
          <span className="description">{description}</span>
          <span className="created">{`created ${timeAgo}`}</span>
        </label>
        <button className="icon icon-edit" />
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
}

Task.defaultProps = {
  task: {},
  onToggle: () => {},
  onDelete: () => {},
}
