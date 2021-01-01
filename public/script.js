const dataform = document.getElementById('dataform')
const dataInput = document.getElementById('data')
const log = document.getElementById('log')
const country = document.getElementById('country')
const time = document.getElementById('time')
const temperature = document.getElementById('temperature')
dataform.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!dataInput.value) {
        return log.textContent = 'You must enter a value'
    }
    log.textContent = 'Loading...'
    fetch('/weather?address=' + dataInput.value).then((response) => {
        response.json().then(({data}) => {
            if (data.error) {
                return log.textContent = data.error
            }
            log.textContent = data.city
            country.textContent = data.country
            time.textContent = data.time
            temperature.textContent = data.temperature +' C'

            

        })
    })
})