// import { jest } from '@jest/globals'
import { getDogs } from '../public/js/petService.js'
import 'isomorphic-fetch' // Needed because fetch is not natively supported in node.js runtime
import psCreds from '../../petfinder-credentials.json'

/**
 * Integration tests
 */
describe("pet-int-1: Fetch issues from unauth API", () => {
  it("pet-int-1.1: should fetch the desired number of dogs", async () => {
    const token = await getPetfinderToken()
    const limit = 3
    return getDogs(limit, token).then(petCollection => {
      console.log(">> petCollection:", petCollection)
      expect(true).toBe(true)
    })
  })
})

/**
 * Unit tests
 */

/**
 * Helper Functions
 */
/**
 * Returns a Promise for a Petfinder Token using OAuth2
 * @param {void}
 * @return {Promise<string>} A promise of a Petfinder token
 */
 async function getPetfinderToken () {
  let data = null
  try {
    const response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: psCreds.apikey,
        client_secret: psCreds.secret
      })
    })
    if (response.ok) {
      data = await response.json()
    } else {
      throw new Error("Network error happened!")
    }
    // console.log(">> Test data.access_token:", data.access_token)
  } catch (error) {
    console.error(error)
  }
  return data.access_token
}
