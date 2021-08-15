/**
 * Generates a GitHub Issue given an object
 * @author Robert Lin <robert@example.com>
 * @param {Object} obj - An obj from the GitHub JSON REST API
 */
export class Issue {
  constructor (obj) {
    this.number = obj.number,
    this.title = obj.title,
    this.createdAt = new Date(obj.created_at),
    this.updatedAt = new Date(obj.updated_at),
    this.User = {
      login: obj.user.login,
      avatar: obj.user.avatar_url
    }
  }

  get createdAtStr () {
    return this.createdAt.toUTCString()
  }
}

export class IssueCollection {
  constructor () {
    this.arr = [] // Array<Issue>
  }

  /**
   * Add an Issue to our collection
   * @param  {Issue} issue       :Issue
   * @return {void}
   */
   add (issue) { // :Issue
    this.arr.push(issue)
  }

  /**
   * Return Array<Issue> of our collection
   * @param  {void}
   * @return {Array<Issue>}
   */
  getAll () {
    return this.arr
  }

  /**
   * Return Array<Issue> of our collection filtered by issue author
   * @param  {string} userLogin
   * @return {Array<Issue>}
   */
  getAllByAuthor (userLogin) {
    const rs = []
    for (const issue of this.arr) {
      if (issue.User.login === userLogin) {
        rs.push(issue)
      }
    }
    return rs
  }
}