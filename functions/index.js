const functions = require("firebase-functions")
require('isomorphic-fetch')

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true})
  response.send("Hello from Firebase! It's Saturday! 🎉🥳")
})

exports.getDogs = functions.https.onRequest((request, response) => {
  getPetfinderToken().then( token => {
    // response.send(`>> here's the token: ${token}`)
    const limit = request.query.limit ?? 3
    fetch(`https://api.petfinder.com/v2/animals?type=dog&limit=${limit}`, {
      method: "get",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(rs => {
      rs.json().then(data => {
        response.send(data)
      })
    })
  })
})

/**
 * Returns a Promise for a Petfinder Token using OAuth2
 * @param {void}
 * @return {Promise<string>} A promise of a Petfinder token
 */
async function getPetfinderToken () {
  const req = await fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: functions.config().petfinder.key,
      client_secret: functions.config().petfinder.secret
    })
  })
  const data = await req.json()
  return data.access_token
}