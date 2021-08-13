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

  getAll () {
    return this.arr
  }
}