/**
 * Generates a Pet given an object
 * @author Robert Lin <robert@example.com>
 * @param {Object} obj - An obj from the GitHub JSON REST API
 */
 export class Pet {
  constructor (obj) {
    this.id = obj.id,
    this.age = obj.age,
    this.gender = obj.gender,
    this.name = obj.name,
    this.Breeds = {
      primary: obj.breeds.primary
    }
  }
}

export class PetCollection {
  constructor () {
    this.arr = [] // Array<Pet>
  }

  /**
   * Add an Issue to our collection
   * @param  {Pet} pet
   * @return {void}
   */
   add (pet) {
    this.arr.push(pet)
  }

  /**
   * Return Array<Pet> of our collection
   * @param  {void}
   * @return {Array<Pet>}
   */
   getAll () {
    return this.arr
  }
}
