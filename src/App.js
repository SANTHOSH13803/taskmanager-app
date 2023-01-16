import {Component} from 'react'
import Tags from './Tags/index'
import './App.css'
// import {get} from 'immer/dist/internal'a

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// function getTaskList() {
//   const taskList = localStorage.getItem('taskList')
//   if (taskList === null) {
//     return []
//   }
//   return JSON.parse(taskList)
// }

// console.log(getTaskList())

// Replace your code here
class App extends Component {
  state = {
    taskList: [],
    activeOption: tagsList[0].optionId,
    taskName: '',
  }

  onChangeTags = e => {
    this.setState({activeOption: e.target.value})
  }

  onChangeTask = e => {
    this.setState({taskName: e.target.value})
  }

  onClickAddTask = e => {
    e.preventDefault()
    const {activeOption, taskName} = this.state
    const activeOptionName = tagsList.find(
      each => each.optionId === activeOption,
    ).displayText
    if (taskName !== '') {
      const task = {activeOptionName, taskName, optionId: activeOption}
      this.setState(prev => ({
        taskList: [...prev.taskList, task],
        taskName: '',
        activeOption: tagsList[0].optionId,
      }))
    }
  }

  createTask = () => {
    const {activeOption, taskName} = this.state

    return (
      <form id="create-task" onSubmit={this.onClickAddTask}>
        <h1>Create a task!</h1>
        <div className="task-tab">
          <label htmlFor="task">Task</label>
          <br />
          <input
            value={taskName}
            type="text"
            id="task"
            placeholder="Enter the task here"
            onChange={this.onChangeTask}
          />
        </div>
        <div className="tags-tab">
          <label htmlFor="tags">Tags</label>
          <br />
          <select id="tags" value={activeOption} onChange={this.onChangeTags}>
            {tagsList.map(each => {
              const {optionId, displayText} = each
              return (
                <option value={optionId} key={optionId}>
                  {displayText}
                </option>
              )
            })}
          </select>
        </div>
        <button type="submit">Add Task</button>
      </form>
    )
  }

  render() {
    const {taskList} = this.state
    localStorage.setItem('taskList', JSON.stringify(taskList))
    return (
      <div className="main">
        {this.createTask()}
        <Tags taskList={taskList} />
      </div>
    )
  }
}

export default App
