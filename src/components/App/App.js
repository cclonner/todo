import React, { useState } from 'react'

import NewTaskForm from '../NewTaskForm'
import TasksList from '../TasksList'
import Footer from '../Footer'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const addTask = (description, min, sec) => {
    const newTask = {
      id: Date.now(),
      description,
      min,
      sec,
      isRunning: false,
      lastSavedTime: null,
      created: new Date(),
      completed: false,
    }
    setTasks((prevTasks) => [newTask, ...prevTasks])
  }

  const editTask = (taskId, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, description: newDescription } : task))
    )
  }

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    )
  }

  function deleteTask(taskId) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  const clearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed))
  }
  const updateTime = (taskId, minutes, seconds, isRunning, lastSavedTime) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, min: minutes, sec: seconds, isRunning, lastSavedTime } : task
      )
    )
  }

  const itemsLeft = tasks.filter((task) => !task.completed).length

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <section className="todoapp">
      <NewTaskForm onAddTask={addTask} />
      <section className="main">
        <TasksList
          tasks={filteredTasks}
          onToggle={(taskId) => toggleTask(taskId)}
          onDelete={(taskId) => deleteTask(taskId)}
          onEdit={editTask}
          onUpdate={updateTime}
        />
        <Footer itemsLeft={itemsLeft} onClearCompleted={clearCompleted} onFilterChange={setFilter} />
      </section>
    </section>
  )
}

export default App
