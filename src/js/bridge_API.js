const DATASET_ID = process.env.DATASET_ID
const SERVER_TOKEN = process.env.SERVER_TOKEN
const API_URL = `https://api.bridgedataoutput.com/api/v2/OData/${DATASET_ID}/Property?access_token=${SERVER_TOKEN}`

const $projects = 'projects'
const $projectsTemplate = 'projectsTemplate'

const $exclusive = 'exclusive'
const $exclusiveTemplate = 'exclusiveTemplate'

const $property = 'property'
const $propertyTemplate = 'propertyTemplate'


export const bridgeData = async () => {
  try {

    // get last 3 Projects and last 6 Exclusive Listings
    if(location.pathname === '/') {
      const restLastProjects = await fetch(`${API_URL}&$filter=((NewConstructionYN ne false))&$top=3`)
      const dataLastProjects = await restLastProjects.json()

      const restLastExclusive = await fetch(`${API_URL}&$filter=ListPrice gt 1500000&$top=6`)
      const dataLastExclusive = await restLastExclusive.json()

      printProperty(dataLastProjects, $projects, $projectsTemplate)
      printNewListingProperty(dataLastExclusive, $exclusive, $exclusiveTemplate)
    }

    // get all New and Pre-construction Projects with Pagination
    if(location.pathname === '/new-projects.html') {
      const rest = await fetch(`${API_URL}&$filter=((NewConstructionYN ne false))&$top=12&$skip=12`)
      const data = await rest.json()

      printListingProperty(data, $property, $propertyTemplate)
      printNavigation('((NewConstructionYN ne false))', data['@odata.nextLink'])
    }

    // get all Exclusive Listings with Pagination
    if(location.pathname === '/exclusive-listings.html') {
      const rest = await fetch(`${API_URL}&$filter=ListPrice gt 1500000&$top=12&$skip=12`)
      const data = await rest.json()

      printNewListingProperty(data, $property, $propertyTemplate)
      printNavigation('ListPrice gt 1500000', data['@odata.nextLink'])
    }

    // get all Condos Properties with Pagination
    if(location.pathname === '/condos.html') {
      const rest = await fetch(`${API_URL}&$filter=PropertySubType eq 'Condominium'&$top=12&$skip=12`)
      const data = await rest.json()

      printListingProperty(data, $property, $propertyTemplate)
      printNavigation("PropertySubType eq 'Condominium'", data['@odata.nextLink'])
    }

    // get all Luxury Rentals Properties with Pagination
    if(location.pathname === '/luxury-rentals.html') {
      const rest = await fetch(`${API_URL}&$filter=((ListPrice gt 1000000)) and ((StandardStatus eq 'Active'))&$top=12&$skip=12`)
      const data = await rest.json()

      printListingProperty(data, $property, $propertyTemplate)
      printNavigation("((ListPrice gt 1000000)) and ((StandardStatus eq 'Active'))", data['@odata.nextLink'])
    }

    // get all Town House Properties with Pagination
    if(location.pathname === '/town-house.html') {
      const rest = await fetch(`${API_URL}&$filter=PropertySubType eq 'Townhouse'&$top=12&$skip=12`)
      const data = await rest.json()

      printListingProperty(data, $property, $propertyTemplate)
      printNavigation("PropertySubType eq 'Townhouse'", data['@odata.nextLink'])
    }

    // get all Homes Properties with Pagination
    if(location.pathname === '/homes.html') {
      const rest = await fetch(`${API_URL}&$filter=PropertyType eq 'Residential'&$top=12&$skip=12`)
      const data = await rest.json()

      printListingProperty(data, $property, $propertyTemplate)
      printNavigation("PropertyType eq 'Residential'", data['@odata.nextLink'])
    }

    // get all Land Properties with Pagination
    if(location.pathname === '/land.html') {
      const rest = await fetch(`${API_URL}&$filter=PropertyType eq 'Commercial Land'&$top=12&$skip=12`)
      const data = await rest.json()

      printListingProperty(data, $property, $propertyTemplate)
      printNavigation("PropertyType eq 'Commercial Land'", data['@odata.nextLink'])
    }

    // get all Waterfront Properties with Pagination
    if(location.pathname === '/waterfront-homes.html') {
      const rest = await fetch(`${API_URL}&$filter=WaterfrontYN eq true&$top=12&$skip=12`)
      const data = await rest.json()

      printListingProperty(data, $property, $propertyTemplate)
      printNavigation('WaterfrontYN eq true', data['@odata.nextLink'])
    }

    // get all Miami Beach Properties with Pagination
    if(location.pathname === '/miami-beach.html') {
      const rest = await fetch(`${API_URL}&$filter=City eq 'Miami Beach'&$top=12&$skip=12`)
      const data = await rest.json()

      printListingProperty(data, $property, $propertyTemplate)
      printNavigation("City eq 'Miami Beach'", data['@odata.nextLink'])
    }

    // get all Fisher Island Properties with Pagination
    if(location.pathname === '/fisher-island.html') {
      const rest = await fetch(`${API_URL}&$filter=City eq 'Fisher Island'&$top=12&$skip=12`)
      const data = await rest.json()

      printListingProperty(data, $property, $propertyTemplate)
      printNavigation("City eq 'Fisher Island'", data['@odata.nextLink'])
    }

    // get all Weston Properties with Pagination
    if(location.pathname === '/weston.html') {
      const rest = await fetch(`${API_URL}&$filter=City eq 'Weston'&$top=12&$skip=12`)
      const data = await rest.json()

      printListingProperty(data, $property, $propertyTemplate)
      printNavigation("City eq 'Weston'", data['@odata.nextLink'])
    }

    // get all Brickell Properties with Pagination
    if(location.pathname === '/brickell.html') {
      const rest = await fetch(`${API_URL}&$filter=City eq 'Miami'&$top=12&$skip=12`)
      const data = await rest.json()

      printListingProperty(data, $property, $propertyTemplate)
      printNavigation("City eq 'Miami'", data['@odata.nextLink'])
    }

    // print property details in new window
    let express = new RegExp('(/)?[A-Z0-9]+?(/)')

    if(express.test(location.pathname)) {

      let test = location.pathname.replace(/\//g,'')

      const restProperty = await fetch(`${API_URL}&$filter=ListingId eq '${test}'`)
      const dataProperty = await restProperty.json()

      printDataProperty(dataProperty, 'main', $propertyTemplate)
    }

    // print properties from search form in new window
    const $searchForm = document.getElementById('searchForm')

    if($searchForm) {
      $searchForm.addEventListener('submit', (e) => {
        e.preventDefault()

        let $propertyType = document.getElementById('propertyType').options[document.getElementById('propertyType').selectedIndex].text
        let $propertyLocation = document.getElementById('propertyLocation').value === '' ? 'all' : document.getElementById('propertyLocation').value

        $propertyType = $propertyType.toLowerCase()
        $propertyLocation = $propertyLocation.toLowerCase()

        if($propertyType != '') { window.location.href = `/${$propertyLocation.replace(' ', '-')}/${$propertyType}/` }
        $searchForm.reset()
      })
    }

    let searchExp = new RegExp('(/)?[a-z-]+?(/)?buy|rent?(/)')

    if(searchExp.test(location.pathname)) {

      let url = location.pathname.split('/')
      let parameter = url.filter(Boolean)
      let city = capitalice(parameter[0])
      let type = (parameter[1] === 'buy') ? 'Residential' : 'Residential Income'
      let filter = `(City eq '${city}') and (PropertyType eq '${type}' and StandardStatus eq 'Active')`

      document.getElementById('propertyCity').innerHTML = `${city} <span> ❯</span>`
      document.getElementById('propertyType').textContent = parameter[1]

      const restProperty = await fetch(`${API_URL}&$filter=${filter}&$top=12&$skip=12`)
      const dataProperty = await restProperty.json()

      printListingProperty(dataProperty, $property, $propertyTemplate)
      printNavigation(filter, dataProperty['@odata.nextLink'])

    }

  } catch (error) {
    console.log(error)
  }
};

// print Project Property
const printProperty = (data, containerID, templateID) => {
  const template = document.getElementById(templateID).content
  const fragment = new DocumentFragment()

  data.value.forEach(property => {
    property.Media != null ? template.querySelector('img').setAttribute('src', property.Media[1].MediaURL) : template.querySelector('img').setAttribute('src', '/assets/images/numy-hero.png')
    template.querySelector('img').setAttribute('alt', property.BuildingName)
    template.querySelector('h3').textContent = property.BuildingName
    template.querySelector('a').dataset.id = property.ListingId
    template.querySelector('a').setAttribute('href', `/${property.ListingId}/`)

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
  })

  document.getElementById(containerID).appendChild(fragment)
};

// print New Listing Property
const printNewListingProperty = (data, containerID, templateID) => {
  const template = document.getElementById(templateID).content
  const fragment = new DocumentFragment()

  data.value.forEach(property => {
    property.Media != null ? template.querySelector('img').setAttribute('src', property.Media[0].MediaURL) : template.querySelector('img').setAttribute('src', '/assets/images/numy-hero.png')
    template.querySelector('img').setAttribute('alt', property.BuildingName)
    template.querySelector('.card__price').textContent = property.ListPrice
    template.querySelector('p').textContent = `${property.BedroomsTotal} Bed(s) ${property.BathroomsTotalInteger} Bath(s) Sq.Ft ${property.LotSizeSquareFeet}`
    template.querySelector('address').textContent = property.UnparsedAddress
    template.querySelector('a').dataset.id = property.ListingId
    template.querySelector('a').setAttribute('href', `/${property.ListingId}/`)

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
  })

  document.getElementById(containerID).appendChild(fragment)
};

// print Listing Property
const printListingProperty = (data, containerID, templateID) => {
  const template = document.getElementById(templateID).content
  const fragment = new DocumentFragment()

  data.value.forEach(property => {
    property.Media != null ? template.querySelector('img').setAttribute('src', property.Media[0].MediaURL) : template.querySelector('img').setAttribute('src', '/assets/images/numy-hero.png')
    template.querySelector('img').setAttribute('alt', property.BuildingName)
    template.querySelector('.card__price').textContent = property.ListPrice
    template.querySelector('p').textContent = `${property.BedroomsTotal} Bed(s) ${property.BathroomsTotalInteger} Bath(s) Sq.Ft ${property.LotSizeSquareFeet}`
    template.querySelector('address').textContent = property.UnparsedAddress
    template.querySelector('a').dataset.id = property.ListingId
    template.querySelector('a').setAttribute('href', `/${property.ListingId}/`)

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
  })

  document.getElementById(containerID).appendChild(fragment)
};

// print Data Property
const printDataProperty = (data, container, templateID) => {
  const template = document.getElementById(templateID).content
  const fragment = new DocumentFragment()

  data.value.forEach(datum => {
    // Meta Tags
    document.title = `${datum.BuildingName} | Numy's Home`
    document.querySelector('meta[name="description"]').setAttribute('content', datum.PrivateRemarks)
    document.querySelector('meta[property="og:title"]').setAttribute('content', `${datum.BuildingName} | Numy's Home`)
    document.querySelector('meta[property="og:description"]').setAttribute('content', datum.PrivateRemarks)
    document.querySelector('meta[property="og:url"]').setAttribute('content', `https://numyhomes.com/${datum.ListingId}/`)
    document.querySelector('meta[property="og:image"]').setAttribute('content', datum.Media[1].MediaURL)

    // print Slider Section
    document.querySelector('img[data-img=first]').setAttribute('src', datum.Media[1].MediaURL)
    document.querySelector('img[data-img=second]').setAttribute('src', datum.Media[0].MediaURL)
    document.querySelector('img[data-img=third]').setAttribute('src', datum.Media[2].MediaURL)
    document.querySelector('img[data-img=fourth]').setAttribute('src', datum.Media[3].MediaURL)
    document.querySelector('img[data-img=fiveth]').setAttribute('src', datum.Media[4].MediaURL)
    document.querySelector('img[data-img=sixth]').setAttribute('src', datum.Media[5].MediaURL)
    document.querySelector('img[data-img=seventh]').setAttribute('src', datum.Media[6].MediaURL)
    document.querySelector('img[data-img=eighth]').setAttribute('src', datum.Media[7].MediaURL)
    document.querySelector('img[data-img=nineth]').setAttribute('src', datum.Media[8].MediaURL)

    document.querySelector('h1').textContent = datum.ListPrice
    document.querySelector('.slider__wrapper p').textContent = `${datum.BedroomsTotal} Bed(s) ${datum.BathroomsTotalInteger} Bath(s) Sq.Ft ${datum.LotSizeSquareFeet}`
    document.querySelector('address').textContent = datum.UnparsedAddress

    // print Breadcrum Section
    document.querySelector('#currentPage').textContent = datum.BuildingName

    // print Summary Section
    datum.BedroomsTotal != null ? document.querySelector('#totalBeds').textContent = datum.BedroomsTotal : document.querySelector('#totalBeds').textContent = 0
    datum.BathroomsTotalInteger != null ? document.querySelector('#totalBaths').textContent = datum.BathroomsTotalInteger : document.querySelector('#totalBaths').textContent = 0
    datum.LotSizeSquareFeet != null ? document.querySelector('#SqFt').textContent = datum.LotSizeSquareFeet : document.querySelector('#SqFt').textContent = 0
    datum.BuildingAreaTotal != null ? document.querySelector('#totalArea').textContent = datum.BuildingAreaTotal : document.querySelector('#totalArea').textContent = datum.LotSizeSquareFeet
    document.querySelector('.summary p').textContent = datum.PrivateRemarks

    // print Details Section
    datum.BedroomsTotal != null ? document.querySelector('span[data-amount=totalBeds]').textContent = datum.BedroomsTotal : document.querySelector('span[data-amount=totalBeds]').textContent = 0
    datum.BathroomsFull != null ? document.querySelector('span[data-id=fullBaths]').textContent = datum.BathroomsFull : document.querySelector('span[data-id=fullBaths]').textContent = 0
    datum.LotSizeSquareFeet != null ? document.querySelector('span[data-amount=SqFt]').textContent = datum.LotSizeSquareFeet : document.querySelector('span[data-amount=SqFt]').textContent = 0
    datum.BathroomsTotalInteger != null ? document.querySelector('span[data-amount=totalBaths]').textContent = datum.BathroomsTotalInteger : document.querySelector('span[data-amount=totalBaths]').textContent = 0
    datum.BathroomsHalf != null ? document.querySelector('span[data-id=halfBaths]').textContent = datum.BathroomsHalf : document.querySelector('span[data-id=halfBaths]').textContent = 0
    datum.BuildingAreaTotal != null ? document.querySelector('span[data-amount=totalArea]').textContent = datum.BuildingAreaTotal : document.querySelector('span[data-amount=totalArea]').textContent = datum.LotSizeSquareFeet

    // print Gallery Section
    document.querySelector('img[data-img=tenth]').setAttribute('src', datum.Media[9].MediaURL)
    document.querySelector('img[data-img=eleventh]').setAttribute('src', datum.Media[10].MediaURL)
    document.querySelector('img[data-img=twelfth]').setAttribute('src', datum.Media[11].MediaURL)
    document.querySelector('img[data-img=thirteenth]').setAttribute('src', datum.Media[12].MediaURL)
    document.querySelector('img[data-img=fourteenth]').setAttribute('src', datum.Media[13].MediaURL)
    document.querySelector('img[data-img=fifteenth]').setAttribute('src', datum.Media[14].MediaURL)
    document.querySelector('img[data-img=sixteenth]').setAttribute('src', datum.Media[15].MediaURL)
    document.querySelector('img[data-img=seventeenth]').setAttribute('src', datum.Media[16].MediaURL)

    // print Map Section
    template.querySelector('iframe').setAttribute('src', `https://www.google.com/maps/embed?pb!=1m18!1m12!1m3!1d3586.2376135632235!2d${datum.Latitude}!3d${datum.Longitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDU5JzM0LjkiTiA4MMKwMTUnNTYuMyJX!5e0!3m2!1ses!2smx!4v1631836294004!5m2!1ses!2smx`)

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
  })

  document.getElementById(container).appendChild(fragment)
};

// print Navigation
const printNavigation = (filter, link) => {

  const API_QUERY = `${API_URL}&$filter=${filter}&$top=12&$skip=`
  const template = document.getElementById('navigationTemplate').content
  const fragment = new DocumentFragment()
  console.log(link)
  let nextPage = new URL(link);
  let skipNumber = Number(nextPage.toString().slice(-2))
  let prevPage = (skipNumber > 24) ? skipNumber - 24 : 0
  console.log(prevPage)

  if(prevPage != 0) { template.querySelector('.navigation__link--prev').setAttribute('href', `${API_QUERY}${prevPage}`) }
  template.querySelector('.navigation__link--next').setAttribute('href', `${link}`)

  const clone = template.cloneNode(true)
  fragment.appendChild(clone)

  document.getElementById('navigation').appendChild(fragment)

  let nextBtn = document.querySelector('.navigation__link--next')
  let prevBtn = document.querySelector('.navigation__link--prev')

  if(prevBtn && nextBtn) {

    prevBtn.addEventListener('click', (e) => {
      e.preventDefault()
      reloadPageData(prevBtn.getAttribute('href'))
      reloadNavigationData(prevBtn.getAttribute('href'), filter)
    })

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault()
      reloadPageData(nextBtn.getAttribute('href'))
      reloadNavigationData(nextBtn.getAttribute('href'), filter)
    })
  }
};

// re-build data json
const requestHandler = async (query) => {
  const rest = await fetch(query)
  const data = await rest.json()

  return data
};

// reload page with new API data
const reloadPageData = (query) => {

  requestHandler(query).then(function (result) {

    let parentContainer = document.getElementById('property')

    while (parentContainer.firstChild) { parentContainer.removeChild(parentContainer.firstChild) }

    printListingProperty(result, $property, $propertyTemplate)
  })

  if(screen.width <= 414) {
    window.scrollTo(0, 600)
  } else if(screen.width <= 768) {
    window.scrollTo(0, 950)
  } else {
    window.scrollTo(0, 750)
  }

};

// reload navitagion with new API data
const reloadNavigationData = (query, filter) => {

  requestHandler(query).then(function (result) {

    let parentContainer = document.getElementById('navigation')

    while (parentContainer.firstChild) { parentContainer.removeChild(parentContainer.firstChild) }

    printNavigation(filter, result['@odata.nextLink'])
  })

};

// capitalice string
const capitalice = (string) => {
  return string.toLowerCase().trim().split('-').map(world => world[0].toUpperCase() + world.substr(1)).join(' ')
}
