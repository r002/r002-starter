// import psCreds from '../../../petfinder-credentials.json'  // Won't work in browser

/**
 * Returns a Promise for a Petfinder Token using OAuth2
 * @param {void}
 * @return {Promise<string>} A promise of a Petfinder token
 */
 export async function getPetfinderToken () {
  // Some code to access valid apikey and secret
  const APIKEY = "<API Key goes here!>"
  const SECRET = "<SECRET goes here!>"

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
        client_id: APIKEY,
        client_secret: SECRET
      })
    })
    if (response.ok) {
      data = await response.json()
    } else {
      throw new Error("Network error happened!")
    }
    // console.log(">> data.access_token:", data.access_token)
  } catch (error) {
    console.error(error)
  }
  return data.access_token
}
