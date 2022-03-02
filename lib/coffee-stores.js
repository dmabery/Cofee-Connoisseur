import { createApi } from 'unsplash-js'

const unsplashAPI = createApi({
  accessKey: 'p2RiDg_oyhWjfMwk5k7LpiCF5vBX_ivQE-hy01hKmCw',
})

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashAPI.search.getPhotos({
    query: 'coffee shop',
    page:1,
    perPage: 10,
    orientation: 'landscape',
  })

  const unsplashResults = photos.response.results
  return unsplashResults.map((result) => result.urls["small"])
}



const getCoffeeStoresUrl = (latLong, query, limit) => {

    return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`
}


export const fetchCoffeeStore = async () => {

    const photos = await getListOfCoffeeStorePhotos();

    const fourSquareOptions = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'fsq3P07007kINeZeu2dCHHvyxLMfBw3nGKBZtdTtHufh39U='
        }
      };
      
    const fourSquareResponse = await fetch(
        getCoffeeStoresUrl("43.65267326999575%2C-79.39545615725015", "coffee stores", 6), fourSquareOptions
    )

    const data = await fourSquareResponse.json();

    return data.results.map((result, index) => {
      return {
        ...result,
        imgUrl: photos[index]
      }
    })
    };