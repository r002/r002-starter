import { expect } from '@jest/globals'
import { getIssues, filterIssues } from '../public/js/ghService.js'
import { getIssuesMock } from '../mock/functions/ghServiceMock.js'
import 'isomorphic-fetch' // Needed because fetch is not natively supported in node.js runtime

/**
 * Integration tests - Test actually hitting the network and fetching data
 * from the GitHub unauthenticated API
 */
describe("int-1: Fetch issues from unauth API", () => {
  it("should fetch the desired number of issues", () => {
    const numberOfIssues = 5
    return getIssues(numberOfIssues).then(collection => {
      // console.log(">> collection:", collection.getAll().length)
      expect((collection.getAll().length)).toBe(numberOfIssues)
    })
  })
})

// // Normally, you won't run these kinds of tests over the network
// // unless you're trying to debug something very specific.
// describe("int-2: Filter an issue collection by issue author (userLogin)", () => {
//   it("int-2.1: should only return issues authored by userLogin", () => {
//     const numberOfIssues = 10
//     const userLogin = "r002"
//     return getIssues(numberOfIssues).then(collection => {
//       const filteredArr = filterIssues(collection, userLogin)
//       // console.log(">> filteredArr:", filteredArr.getAll())
//       expect(checkIssueAuthor(filteredArr, userLogin)).toBe(true)
//     })
//   })

//   it("int-2.2: should only return issues authored by userLogin", () => {
//     const numberOfIssues = 10
//     const userLogin = "r002"
//     return getIssues(numberOfIssues).then(collection => {
//       const filteredArr = collection.getAllByAuthor(userLogin)
//       // console.log(">> filteredArr:", filteredArr)
//       expect(checkIssueAuthor(filteredArr, userLogin)).toBe(true)
//     })
//   })
// })

/**
 * Unit tests - After loading mock data from flat file, test that the various data wrangling
 * services do what they're supposed to do
 */
describe("unit-1: Fetch 100 issues from the flat file", () => {
  it("unit-1.1: should fetch the desired number of issues from mock", () => {
    const numberOfIssues = 5
    return getIssuesMock(numberOfIssues).then(collection => {
      console.log(">> mock collection:", collection.getAll().length)
      expect((collection.getAll().length)).toBe(numberOfIssues)
    })
  })
})

describe("unit-2: Filter an issue collection by issue author (userLogin)", () => {
  it("unit-2.1: should only return issues authored by userLogin", () => {
    const numberOfIssues = 100
    const userLogin = "r002"
    return getIssuesMock(numberOfIssues).then(collection => {
      const filteredArr = collection.getAllByAuthor(userLogin)
      console.log(">> r002's issues from mock data:", filteredArr.length)
      expect(checkIssueAuthor(filteredArr, userLogin)).toBe(true)
      expect(filteredArr.length).toBe(34)
    })
  })
})

/**
 * Helper functions
 */
 function checkIssueAuthor (arr, userLogin) {
  for (const issue of arr) {
    if (issue.User.login !== userLogin) {
      return false
    }
  }
  return true
}
