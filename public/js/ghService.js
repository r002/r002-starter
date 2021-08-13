import { Issue, IssueCollection } from './models.js'

/**
 * Generates an Issue given an object
 * @author Robert Lin <robert@example.com>
 * @param {void}
 * return {IssueCollection} A collection of Issues
 */
 async function getIssues() {
  const issueCollection = new IssueCollection()
  let jsonRs = null
  try {
    const url = 'https://api.github.com/repos/studydash/cards/issues?milestone=1&sort=created&direction=desc&per_page=5'
    const response = await fetch(url)
    if (response.ok) {
        jsonRs = await response.json()
    } else {
        throw new Error("Network error happened!")
    }
    // console.log(jsonRs)
    for (const obj of jsonRs) {
      // console.log('>> obj:', obj)
      issueCollection.add(new Issue(obj))
    }
  } catch(error) {
    return Error("Error happened in getIssues!", error.stack)
  }
  return issueCollection
}

export async function runMain() {
  runTests()
}

function runTests() {
  runTest01().then(rs => {
    console.log(">> test01 passed:", rs)
  })
}

async function runTest01 () {
  const collection = await getIssues()
  console.log('>> getIssues():', collection)
  if (collection.getAll().length === 5) {
    return true
  }
  return false
}