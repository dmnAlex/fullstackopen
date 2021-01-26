import axios from 'axios'

const get = async (name) => {
  const response = await axios.get(`https://restcountries.eu/rest/v2/name/${name}`)
  return {...response, data: response.data[0], found: true}
}

export default { get }