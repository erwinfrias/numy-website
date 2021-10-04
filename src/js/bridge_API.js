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

    // Get last 3 Projects and last 6 Exclusive Listings
    if(location.pathname === '/') {
      const restLastProjects = await fetch(`${API_URL}&$filter=((NewConstructionYN ne false))&$top=3`)
      const dataLastProjects = await restLastProjects.json()

      const restLastExclusive = await fetch(`${API_URL}&$filter=ListPrice gt 1500000&$top=6`)
      const dataLastExclusive = await restLastExclusive.json()

      printProperty(dataLastProjects, $projects, $projectsTemplate)
      printNewListingProperty(dataLastExclusive, $exclusive, $exclusiveTemplate)
    }

    // Get all Exclusive Listings with Pagination
    if(location.pathname === '/exclusive-listings.html') {
      const rest = await fetch(`${API_URL}&$filter=ListPrice gt 1500000&$top=24`)
      const data = await rest.json()

      printNewListingProperty(data, $property, $exclusiveTemplate)
    }

    // Get all Condos Properties with Pagination
    if(location.pathname === '/condos.html') {
      const rest = await fetch(`${API_URL}&$filter=PropertySubType eq 'Condominium'&$top=12&$skip=12`)
      const data = await rest.json()

      printListingProperty(data, $property, $propertyTemplate)
      printNavigation("PropertySubType eq 'Condominium'", data['@odata.nextLink'])
    }

    // Get all Luxury Rentals Properties with Pagination
    if(location.pathname === '/luxury-rentals.html') {
      const rest = await fetch(`${API_URL}&$filter=((ListPrice gt 1000000)) and ((StandardStatus eq 'Active'))&$top=12`)
      const data = await rest.json()

      printListingProperty(data, $property, $propertyTemplate)
      printNavigation("((ListPrice gt 1000000)) and ((StandardStatus eq 'Active'))", data['@odata.nextLink'])
    }

    // Get all Town House Properties with Pagination
    if(location.pathname === '/town-house.html') {
      const rest = await fetch(`${API_URL}&$filter=PropertySubType eq 'Townhouse'&$top=12`)
      const data = await rest.json()

      printListingProperty(data, $property, $propertyTemplate)
      printNavigation("PropertySubType eq 'Townhouse'", data['@odata.nextLink'])
    }

    // Get all Homes Properties with Pagination
    if(location.pathname === '/homes.html') {
      const rest = await fetch(`${API_URL}&$filter=PropertyType eq 'Residential'&$top=12`)
      const data = await rest.json()

      printListingProperty(data, $property, $propertyTemplate)
      printNavigation("PropertyType eq 'Residential'", data['@odata.nextLink'])
    }

    // Get all Land Properties with Pagination
    if(location.pathname === '/land.html') {
      const rest = await fetch(`${API_URL}&$filter=PropertyType eq 'Commercial Land'&$top=12`)
      const data = await rest.json()

      printListingProperty(data, $property, $propertyTemplate)
      printNavigation("PropertyType eq 'Commercial Land'", data['@odata.nextLink'])
    }

    // Get all Waterfront Properties with Pagination
    if(location.pathname === '/waterfront-homes.html') {
      const rest = await fetch(`${API_URL}&$filter=WaterfrontYN eq true&$top=12`)
      const data = await rest.json()

      printListingProperty(data, $property, $propertyTemplate)
      printNavigation('WaterfrontYN eq true', data['@odata.nextLink'])
    }

    // Print property details in new window
    let express = new RegExp('(/)?[a-zA-Z0-9]+?(/)')

    if(express.test(location.pathname)) {

      let test = location.pathname.replace(/\//g,'')

      const restProperty = await fetch(`${API_URL}&$filter=ListingId eq '${test}'`)
      const dataProperty = await restProperty.json()

      printDataProperty(dataProperty, 'main', 'propertyTemplate')
    }

  } catch (error) {
    console.log(console.error)
  }
};

// Print Project Property
const printProperty = (data, containerID, templateID) => {
  const template = document.getElementById(templateID).content
  const fragment = new DocumentFragment()

  data.value.forEach(property => {
    property.Media != null ? template.querySelector('img').setAttribute('src', property.Media[1].MediaURL) : template.querySelector('img').setAttribute('src', '/assets/images/numy-hero.png')
    template.querySelector('img').setAttribute('alt', property.BuildingName)
    template.querySelector('h3').textContent = property.BuildingName
    template.querySelector('a').dataset.id = property.ListingId
    template.querySelector('a').setAttribute('href', `${property.ListingId}/`)

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
  })

  document.getElementById(containerID).appendChild(fragment)
};

// Print New Listing Property
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
    template.querySelector('a').setAttribute('href', `${property.ListingId}/`)

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
  })

  document.getElementById(containerID).appendChild(fragment)
};

// Print Listing Property
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
    template.querySelector('a').setAttribute('href', `${property.ListingId}/`)

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
  })

  document.getElementById(containerID).appendChild(fragment)
};

// Print Data Property
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

    // Print Slider Section
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

    // Print Breadcrum Section
    template.querySelector('a[data-id=currentPage]').textContent = datum.BuildingName

    // Print Summary Section
    datum.BedroomsTotal =! null ? template.querySelector('span[data-id=totalBeds]').textContent = datum.BedroomsTotal : template.querySelector('span[data-id=totalBeds]').textContent = 0
    datum.BathroomsTotalInteger =! null ? template.querySelector('span[data-id=totalBaths]').textContent = datum.BathroomsTotalInteger : template.querySelector('span[data-id=totalBaths]').textContent = 0
    datum.LotSizeSquareFeet =! null ? template.querySelector('span[data-id=SqFt]').textContent = datum.LotSizeSquareFeet : template.querySelector('span[data-id=SqFt]').textContent = 0
    datum.BuildingAreaTotal != null ? template.querySelector('span[data-id=totalArea]').textContent = datum.BuildingAreaTotal : template.querySelector('span[data-id=totalArea]').textContent = datum.LotSizeSquareFeet
    template.querySelector('.summary p').textContent = datum.PrivateRemarks

    // Print Details Section
    datum.BedroomsTotal != null ? template.querySelector('span[data-amount=totalBeds]').textContent = datum.BedroomsTotal : template.querySelector('span[data-amount=totalBeds]').textContent = 0
    datum.BathroomsFull != null ? template.querySelector('span[data-id=fullBaths]').textContent = datum.BathroomsFull : template.querySelector('span[data-id=fullBaths]').textContent = 0
    datum.LotSizeSquareFeet != null ? template.querySelector('span[data-amount=SqFt]').textContent = datum.LotSizeSquareFeet : template.querySelector('span[data-amount=SqFt]').textContent = 0
    datum.BathroomsTotalInteger != null ? template.querySelector('span[data-amount=totalBaths]').textContent = datum.BathroomsTotalInteger : template.querySelector('span[data-amount=totalBaths]').textContent = 0
    datum.BathroomsHalf != null ? template.querySelector('span[data-id=halfBaths]').textContent = datum.BathroomsHalf : template.querySelector('span[data-id=halfBaths]').textContent = 0
    datum.BuildingAreaTotal != null ? template.querySelector('span[data-amount=totalArea]').textContent = datum.BuildingAreaTotal : template.querySelector('span[data-amount=totalArea]').textContent = datum.LotSizeSquareFeet

    // Print Gallery Section
    template.querySelector('img[data-img=tenth]').setAttribute('src', datum.Media[9].MediaURL)
    template.querySelector('img[data-img=eleventh]').setAttribute('src', datum.Media[10].MediaURL)
    template.querySelector('img[data-img=twelfth]').setAttribute('src', datum.Media[11].MediaURL)
    template.querySelector('img[data-img=thirteenth]').setAttribute('src', datum.Media[12].MediaURL)
    template.querySelector('img[data-img=fourteenth]').setAttribute('src', datum.Media[13].MediaURL)
    template.querySelector('img[data-img=fifteenth]').setAttribute('src', datum.Media[14].MediaURL)
    template.querySelector('img[data-img=sixteenth]').setAttribute('src', datum.Media[15].MediaURL)
    template.querySelector('img[data-img=seventeenth]').setAttribute('src', datum.Media[16].MediaURL)

    // Print Map Section
    template.querySelector('iframe').setAttribute('src', `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3586.2376135632235!2d${datum.Latitude}!3d${datum.Longitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDU5JzM0LjkiTiA4MMKwMTUnNTYuMyJX!5e0!3m2!1ses!2smx!4v1631836294004!5m2!1ses!2smx`)


    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
  })

  document.getElementById(container).appendChild(fragment)
};

// Print Navigation
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

// Re-build data json
const requestHandler = async (query) => {
  const rest = await fetch(query)
  const data = await rest.json()

  return data
};

// Reload page with new API data
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

// Reload navitagion with new API data
const reloadNavigationData = (query, filter) => {

  requestHandler(query).then(function (result) {

    let parentContainer = document.getElementById('navigation')

    while (parentContainer.firstChild) { parentContainer.removeChild(parentContainer.firstChild) }

    printNavigation(filter, result['@odata.nextLink'])
  })

};
