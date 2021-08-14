const functions = require("firebase-functions")
const cors = require('cors')({origin: true});
require('isomorphic-fetch')

exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    functions.logger.info("Hello logs!", {structuredData: true})
    response.send("Testing CORS... It's Saturday! 🎉🥳")
  })
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

exports.getCtwcMatch = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const url = 'https://ctwc-cloud.appspot.com/v1/match/ctwc_2014_r5-01'
    fetch(url).then((rs) => {
      if (rs.ok) {
        return rs.json()
      } else {
        throw new Error('Something went wrong')
      }
    })
    .then((responseJson) => {
      // This also works but Google Firebase documentation suggests using the `cors` package
      // https://stackoverflow.com/questions/42755131/enabling-cors-in-cloud-functions-for-firebase/42756623#42756623
      // response.set("Access-Control-Allow-Origin", "*")
      // response.set("Access-Control-Allow-Headers", "Content-Type")
      response.send(responseJson)
    })
    .catch((error) => {
      console.error(error)
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