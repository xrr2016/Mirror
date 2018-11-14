import Comments from './comments'
import Issue from './issue'
import Issues from './issues'
import User from './user'
import Zen from './zen'

const comments = new Comments()
const issue = new Issue()
const issues = new Issues()
const user = new User()
const zen = new Zen()

export default {
  comments(...args) {
    return comments.get(...args)
  },
  issue(...args) {
    return issue.get(...args)
  },
  issues(...args) {
    return issues.get(...args)
  },
  user(...args) {
    return user.get(...args)
  },
  zen(){
    return zen.get()
  }
}
