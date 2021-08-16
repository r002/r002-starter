import { Pet, PetCollection } from "./petModels"

export async function getDogs (limit, token) {
  const petCollection = new PetCollection()
  let jsonRs = null
  try {
    const url = `https://api.petfinder.com/v2/animals?type=dog&limit=${limit}`
    const response = await fetch(url, {
      method: "get",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (response.ok) {
        jsonRs = await response.json()
    } else {
        throw new Error("Network error happened!")
    }
    // Iterate through all dogs
    for (const obj of jsonRs.animals) {
      // console.log('>> dog obj:', obj)
      const pet = new Pet(obj)
      petCollection.add(pet)
    }
  } catch(error) {
    console.error("Error happened in getDogs!", error.stack)
  }
  return petCollection
}
