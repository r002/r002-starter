import { expect } from '@jest/globals'
import { getIssues, filterIssues } from '../public/js/ghService.js'
import 'isomorphic-fetch' // Needed because fetch is not natively supported in node.js runtime

/**
 * Integration tests - Test actually hitting the network and fetching data
 * from the GitHub unauthenticated API
 */
describe("Fetch issues from unauth API", () => {
  it("should fetch the desired number of issues", () => {
    const numberOfIssues = 5
    return getIssues(numberOfIssues).then(collection => {
      // console.log(">> collection:", collection.getAll().length)
      expect((collection.getAll().length)).toBe(numberOfIssues)
    })
  })
})

describe("Filter an issue collection by issue author (userLogin)", () => {
  it("v1: should only return issues authored by userLogin", () => {
    const numberOfIssues = 10
    const userLogin = "r002"
    return getIssues(numberOfIssues).then(collection => {
      const filteredArr = filterIssues(collection, userLogin)
      // console.log(">> filteredArr:", filteredArr.getAll())
      expect(checkIssueAuthor(filteredArr, userLogin)).toBe(true)
    })
  })

  it("v2: should only return issues authored by userLogin", () => {
    const numberOfIssues = 10
    const userLogin = "r002"
    return getIssues(numberOfIssues).then(collection => {
      const filteredArr = collection.getAllByAuthor(userLogin)
      // console.log(">> filteredArr:", filteredArr)
      expect(checkIssueAuthor(filteredArr, userLogin)).toBe(true)
    })
  })
})

function checkIssueAuthor (arr, userLogin) {
  for (const issue of arr) {
    if (issue.User.login !== userLogin) {
      return false
    }
  }
  return true
}

/**
 * Unit tests - Loading mock data, test that the various data wrangling
 * services do what they're supposed to do
 */
