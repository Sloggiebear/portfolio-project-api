
//Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    getCountries()
    console.log("Checking for local countries...")
})

let countrylist

function newCountry () {
    const country = apiCountries[Math.floor(Math.random() * apiCountries.length)]
    console.log("this is the country", country)

    div = document.createElement('div')
    div.classList.add('country')
    div.innerHTML = country.name
    document.body.appendChild(div)
}

async function getCountries() {
    
    const apiUrl ='http://api.countrylayer.com/v2/all?access_key=578f857d4210a11edcda5243a2d175ed'
    let localcountries

    //Check if a list of counrties is already stored in Local storage. If not, fetch list via API
    if (localStorage.getItem("localcountries") === null) {
        console.log("No local storage found")

        try {
            const response = await fetch(apiUrl)
            localcountries = await response.json()
            localStorage.setItem("localcountries", JSON.stringify(localcountries))
            countrylist = localcountries

        } catch (error) {
            console.log("Sorry there was an error: " , error)
        }
        
    } else {
        localcountries = JSON.parse(localStorage.getItem("localcountries"))
        console.log("found local storage countries", localcountries)
        countrylist = localcountries
    }
}


