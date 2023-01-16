import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'

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

class Tags extends Component {
  state = {activeTag: ''}

  onChangeActiveTag = optionId => {
    const {activeTag} = this.state
    if (activeTag === optionId) {
      this.setState({activeTag: ''})
    } else {
      this.setState({activeTag: optionId})
    }
  }

  render() {
    const {taskList} = this.props
    const {activeTag} = this.state
    const filteredResult = taskList.filter(each =>
      each.optionId.includes(activeTag),
    )
    const onShowResult = filteredResult.length > 0
    return (
      <div className="tags-main-container">
        <h1>Tags</h1>
        <ul className="tags">
          {tagsList.map(each => {
            const {optionId, displayText} = each
            const changeActiveTag = () => {
              this.onChangeActiveTag(optionId)
            }
            const activeButton =
              activeTag === optionId ? 'active' : 'normal-button'
            return (
              <li key={optionId}>
                <button
                  type="button"
                  className={activeButton}
                  onClick={changeActiveTag}
                >
                  {displayText}
                </button>
              </li>
            )
          })}
        </ul>
        <h1 className="task-heading">Tasks</h1>
        {onShowResult ? (
          <ul className="tasks-results">
            {filteredResult.map(each => {
              const {activeOptionName, taskName} = each
              return (
                <li key={v4()}>
                  <p>{taskName}</p>
                  <p>{activeOptionName}</p>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="no-tasks">
            <p>No Tasks Added Yet</p>
          </div>
        )}
      </div>
    )
  }
}

export default Tags
