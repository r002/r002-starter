import { expect } from '@jest/globals'
import { getIssues } from '../public/js/ghService.js'
import 'isomorphic-fetch' // Needed because fetch is not natively supported in node.js runtime

describe("Fetch issues from unauth API", () => {
  it("should fetch the desired number of issues", () => {
    const numberOfIssues = 5
    return getIssues(numberOfIssues).then(collection => {
      // console.log(">>>>> collection:", collection.getAll().length)
      expect((collection.getAll().length)).toBe(numberOfIssues)
    })
  })
})
