const DATASET_ID = process.env.DATASET_ID
const SERVER_TOKEN = process.env.SERVER_TOKEN

const _projects = document.getElementById('projects')
const _projectsTemplate = document.getElementById('projectsTemplate')

export const bridgeData = async () => {
  try {
    const res = await  fetch(`https://api.bridgedataoutput.com/api/v2/OData/${DATASET_ID}/Property?access_token=${SERVER_TOKEN}`)
    const data = await res.json()

    // Get last 3 projects
    const restProjects = await fetch(`https://api.bridgedataoutput.com/api/v2/OData/${DATASET_ID}/Property?access_token=${SERVER_TOKEN}&$filter=((NewConstructionYN ne false))&$top=3`)
    const dataProjects = await restProjects.json()

    printProperty(dataProjects, _projects, _projectsTemplate)

  } catch (error) {
    console.log(console.error)
  }
}

const printProperty = (data, container, templateProperty) => {
  const template = templateProperty.content
  const fragment = new DocumentFragment()

  data.value.forEach(property => {
    template.querySelector('img').setAttribute('src', property.Media[1].MediaURL)
    template.querySelector('img').setAttribute('alt', property.BuildingName)
    template.querySelector('h3').textContent = property.BuildingName
    template.querySelector('a').dataset.id = property.ListingId

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
  })

  container.appendChild(fragment)
}
