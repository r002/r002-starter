// import { Issue, IssueCollection } from './petModels.js'

/**
 * Generates an Issue given an object
 * @author Robert Lin <robert@example.com>
 * @param {void}
 * @return {Promise<IssueCollection>} A promise of a collection of Issues
 */
export async function getIssues(numberOfIssues) {
  // console.log('>> Calling getIssues():', numberOfIssues)
  const issueCollection = new IssueCollection()
  let jsonRs = null
  try {
    const url = `https://api.github.com/repos/studydash/cards/issues?milestone=1&sort=created&direction=desc&per_page=${numberOfIssues}`
    const response = await fetch(url)
    if (response.ok) {
        jsonRs = await response.json()
    } else {
        throw new Error("Network error happened!")
    }
    for (const obj of jsonRs) {
      // console.log('>> obj:', obj)
      issueCollection.add(new Issue(obj))
    }
  } catch(error) {
    console.error("Error happened in getIssues!", error.stack)
    // return Error("Error happened in getIssues!", error.stack)
  }
  return issueCollection
}
