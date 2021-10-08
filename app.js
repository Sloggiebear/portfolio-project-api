answerCover = document.getElementById('answer-cover');
settings = document.getElementById('btn-settings');
modal = document.getElementById('modal');
close = document.getElementById('btn-close');


//Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    getCountries()
})
answerCover.addEventListener('click', () => {
    answerCover.classList.add('d-none');
})
settings.addEventListener('click', () => {
    modal.classList.toggle('d-block');
})
close.addEventListener('click', () => {
    modal.classList.toggle('d-block');
})


let countrylist
// let africalist = regionSpecificCountries("Africa") 

function newCountry () {
    answerCover.classList.remove('d-none');
    const country = countrylist[Math.floor(Math.random() * countrylist.length)]
    countryname = document.getElementById('countryname');
    countryname.innerHTML = "";
    countryname.innerHTML = country.name; 

    answer = document.getElementById('answer');
    answer.innerHTML = "";
    answer.innerHTML = country.capital; 
}

async function getCountries() {
    
    const apiUrl ='http://api.countrylayer.com/v2/all?access_key=578f857d4210a11edcda5243a2d175ed'
    let localcountries

    //Check if a list of counrties is already stored in Local storage. If not, fetch list via API
    if (localStorage.getItem("localcountries") === null) {
        console.log("No local storage found")

        try {
            const response = await fetch(apiUrl);
            rawlist = await response.json();
            localcountries = await rawlist.filter(country => country.capital != "" );
            localStorage.setItem("localcountries", JSON.stringify(localcountries));
            countrylist = localcountries;
            newCountry();

        } catch (error) {
            console.log("Sorry there was an error: " , error)
        }
        
    } else {
        localcountries = JSON.parse(localStorage.getItem("localcountries"))
        console.log("found local storage countries", localcountries)
        countrylist = localcountries
        newCountry();
    }
}

// function regionSpecificCountries(region) {
//     regionlist = []
//     countrylist.forEach(country => {
//         if (country.region === region) {
//             regionlist.push(country);
//             console.log(region,":", regionlist)
//         }
//     }
//     )
// }