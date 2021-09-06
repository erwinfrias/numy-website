const DATASET_ID = process.env.DATASET_ID
const SERVER_TOKEN = process.env.SERVER_TOKEN

export const bridgeData = async () => {
  try {
    const res = await  fetch(`https://api.bridgedataoutput.com/api/v2/OData/${DATASET_ID}/Property?access_token=${SERVER_TOKEN}`)
    const data = await res.json()

    console.log(data)

  } catch (error) {
    console.log(console.error)
  }
}
