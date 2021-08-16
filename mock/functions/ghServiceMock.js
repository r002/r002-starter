import { Issue, IssueCollection } from '../../public/js/ghModels.js'
import ghIssues100 from '../data/gh-issues-100.json'

export async function getIssuesMock (numberOfIssues) {
  // console.log('>> JSON obj:', ghIssues100)
  const issueCollection = new IssueCollection()
  let i = 0
  for (const obj of ghIssues100) {
    issueCollection.add(new Issue(obj))
    if (++i == numberOfIssues) {
      break
    }
  }
  return Promise.resolve(issueCollection)
}
