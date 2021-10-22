let countrylist

const answerCover = document.getElementById('answer-cover');
const settings = document.getElementById('btn-settings');
const modal = document.getElementById('modal');
const closeButton = document.getElementById('btn-close');

let checkboxElements = document.querySelectorAll("input[type=checkbox]");
let enabledSettings = filterCountriesByRegion();
swal("Hello world!");

//EVENT LISTENERS

//onload - Get a country
document.addEventListener('DOMContentLoaded', () => {
    getCountries()
})
//onclick - Reveal the answer
answerCover.addEventListener('click', () => {
    answerCover.classList.add('d-none');
})

//onclick - Show the settings modal
settings.addEventListener('click', () => {
    modal.classList.toggle('d-block');
})

//onclick - Hide the settings modal
closeButton.addEventListener('click', () => {
    modal.classList.toggle('d-block');
})

//onlcick - Update the enabled settings checkboxes for filtering countries by region
for (var i = 0; i < checkboxElements.length; i++) {
    checkboxElements[i].addEventListener('change', (e) => {
        filterCountriesByRegion();
    })
}






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
        countrylist = localcountries
        newCountry();
    }
}

function filterCountriesByRegion() {
    getRegions = [...document.getElementsByClassName('region')];
    let regionFilters = [];
    getRegions.forEach(element => {
        if (element.checked) {
            regionFilters.push(element.name);
        }
    });
    if (regionFilters.length == 0) {
        alert("You can't play with no countries, Wakanda Forever Baby")
        let wakanda = document.getElementById(Africa);
        Africa.checked = true;
        return "Africa"


    }
    else {
        return regionFilters;
    }
        
}