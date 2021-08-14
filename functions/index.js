const functions = require("firebase-functions")
// Firebase documentation suggests this but it doesn't work for me! 8/14/21
// const cors = require('cors')({
//   origin: '*', // true
// })
require('isomorphic-fetch')

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true})
  response.send("Testing CORS... It's Saturday! 🎉🥳")
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

exports.hardProxy = functions.https.onRequest((request, response) => {
  const url = 'https://ctwc-cloud.appspot.com/v1/match/ctwc_2014_r5-01'
  fetch(url).then((rs) => {
    if (rs.ok) {
      return rs.json()
    } else {
      throw new Error('Something went wrong')
    }
  })
  .then((responseJson) => {
    console.log('>> hardProxy success!! Returning:', responseJson)
    response.set("Access-Control-Allow-Origin", "*")
    response.set("Access-Control-Allow-Headers", "Content-Type")
    response.send(responseJson)
    return
  })
  .catch((error) => {
    const errMsg = `Sorry! Invalid url! Cannot proxy! Tried to proxy: "${url}"` 
    console.error(errMsg, error)
    response.send(errMsg)
    return
  })
})

exports.corsProxy = functions.https.onRequest((request, response) => {
  // const url = 'https://ctwc-cloud.appspot.com/v1/match/ctwc_2014_r5-01'
  let url = request.originalUrl.substr(1) // Eliminate the leading '/'
  url = url.replace(/^https:\/(\w.*)/, 'https://$1') // Properly add the protocol if it's stripped. Only proxy ssl
  console.log('>> Running corsProxy:', url)
  fetch(url, { method: "get" }).then((rs) => {
    if (rs.ok) {
      return rs.json()
    } else {
      throw new Error('Something went wrong')
    }
  })
  .then((responseJson) => {
    console.log('>> Proxy success! Returning:', responseJson)
    response.set("Access-Control-Allow-Origin", "*")
    response.set("Access-Control-Allow-Headers", "Content-Type")
    response.send(responseJson)
    return
  })
  .catch((error) => {
    const errMsg = `Sorry! Invalid url! Cannot proxy! Tried to proxy: "${url}"` 
    console.error(errMsg, error)
    response.send(errMsg)
    return
  })
})

// This fails to proxy because "Access-Control-Allow-Origin" isn't set
exports.test = functions.https.onRequest((request, response) => {
  let url = request.originalUrl.substr(1) // Eliminate the leading '/'
  url = url.replace(/^https:\/(\w.*)/, 'https://$1') // Properly add the protocol if it's stripped. Only proxy ssl
  fetch(url).then((rs) => {
    if (rs.ok) {
      return rs.json()
    } else {
      throw new Error('Something went wrong')
    }
  })
  .then((responseJson) => {
    // response.set("Access-Control-Allow-Origin", "*")
    // response.set("Access-Control-Allow-Headers", "Content-Type")
    response.send(responseJson)
    return
  })
  .catch((error) => {
    const errMsg = `Sorry! Invalid url! Cannot proxy! Tried to proxy: "${url}"` 
    console.error(errMsg, error)
    response.send(errMsg)
    return
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