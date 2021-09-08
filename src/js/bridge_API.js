const DATASET_ID = process.env.DATASET_ID
const SERVER_TOKEN = process.env.SERVER_TOKEN
const API_URL = `https://api.bridgedataoutput.com/api/v2/OData/${DATASET_ID}/Property?access_token=${SERVER_TOKEN}`

const _projects = 'projects'
const _projectsTemplate = 'projectsTemplate'

const _exclusive = 'exclusive'
const _exclusiveTemplate = 'exclusiveTemplate'

export const bridgeData = async () => {
  try {
    // Get last 3 projects
    const restLastProjects = await fetch(`${API_URL}&$filter=((NewConstructionYN ne false))&$top=3`)
    const dataLastProjects = await restLastProjects.json()

    // Get last 6 exclusive listings
    const restLastExclusive = await fetch(`${API_URL}&$filter=ListPrice gt 1500000&$top=6`)
    const dataLastExclusive = await restLastExclusive.json()

    printProperty(dataLastProjects, _projects, _projectsTemplate)
    printListingProperty(dataLastExclusive, _exclusive, _exclusiveTemplate)

  } catch (error) {
    console.log(console.error)
  }
}

const printProperty = (data, containerID, templateID) => {
  const template = document.getElementById(templateID).content
  const fragment = new DocumentFragment()

  data.value.forEach(property => {
    template.querySelector('img').setAttribute('src', property.Media[1].MediaURL)
    template.querySelector('img').setAttribute('alt', property.BuildingName)
    template.querySelector('h3').textContent = property.BuildingName
    template.querySelector('a').dataset.id = property.ListingId

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
  })

  document.getElementById(containerID).appendChild(fragment)
}

const printListingProperty = (data, containerID, templateID) => {
  const template = document.getElementById(templateID).content
  const fragment = new DocumentFragment()

  data.value.forEach(property => {
    template.querySelector('img').setAttribute('src', property.Media[0].MediaURL)
    template.querySelector('img').setAttribute('alt', property.BuildingName)
    template.querySelector('.card__price').textContent = property.ListPrice
    template.querySelector('p').textContent = `${property.BedroomsTotal} Bed(s) ${property.BathroomsTotalDecimal} Bath(s) Sq.Ft ${property.LotSizeSquareFeet}`
    template.querySelector('address').textContent = property.UnparsedAddress
    template.querySelector('a').dataset.id = property.ListingId

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
  })

  document.getElementById(containerID).appendChild(fragment)
}
