export const emailContact = () => {

  const $CONTACT_FORM = document.getElementById('contactForm');

  if($CONTACT_FORM) {

    $CONTACT_FORM.addEventListener('submit', function (e) {
        e.preventDefault();

        let datos = new FormData($CONTACT_FORM)
        let propertyType = document.getElementById('contactInquiryType')
        let propertyDetails = document.getElementById('contactPropertyDetails')

        datos.append('type', propertyType.options[propertyType.selectedIndex].innerText)
        datos.append('details', propertyDetails.options[propertyDetails.selectedIndex].innerText)

        fetch('./email.php', {
            method: 'POST',
            body: datos
        })

        .then(function (response) {
            return response.text()
        }).then(function (text) {
            console.log(text)
            $CONTACT_FORM.reset()
            location.reload()
        }).catch(function (error) {
            console.error(error)
        });
    })
  }

};
