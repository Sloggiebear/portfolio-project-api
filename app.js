var countrylist = []
var filteredcountrylist = [];
var enabledSettings = [];

let AfricaList = [];
let AmericasList = [];
let AsiaList = [];
let EuropeList = [];
let OceaniaList = [];

const answerCover = document.getElementById('answer-cover');
const settings = document.getElementById('btn-settings');
const modal = document.getElementById('modal');
const closeButton = document.getElementById('btn-close');
const checkboxElements = document.querySelectorAll("input[type=checkbox]");


//EVENT LISTENERS

//onload - Get a country
document.addEventListener('DOMContentLoaded', () => {
    getCountries()
    getEnabledSettings();
    newCountry();
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
        getEnabledSettings();
    })
}

function newCountry() {
    answerCover.classList.remove('d-none');
    const country = filteredcountrylist[Math.floor(Math.random() * filteredcountrylist.length)]
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
            generateRegionalLists();
            // newCountry();

        } catch (error) {
            console.log("Sorry there was an error: " , error)
        }
        
    } else {
        console.log("Found Local storage");
        localcountries = JSON.parse(localStorage.getItem("localcountries"))
        countrylist = localcountries;
        generateRegionalLists();
        // newCountry();
    }
}

function getEnabledSettings() {
    getRegions = [...document.getElementsByClassName('region')];
    console.log("regions: ", getRegions);

    enabledSettings = [];
    getRegions.forEach(element => {
        if (element.checked) {
            enabledSettings.push(element.name);
        }
        console.log("enabled settings", enabledSettings)
    });
    if (enabledSettings.length == 0) {
        swal({
            icon: '',
            title: 'WAKANDA FOREVER!',
            text: 'At least one region must be selected.',
            button: {
                className: "btn-swal",
                text: "",
                background: "none"
            }
        }) 
        
        let wakanda = document.getElementById('Africa');
        // console.log(wakanda);
        wakanda.checked = true;
        enabledSettings = ['Africa'];
        filteredcountrylist = AfricaList;
    }
    else {
        filteredcountrylist = []
        enabledSettings.forEach(element => {
            // console.log("filtering: ", element)
            // var name = element + "list";
            // console.log(name)
            // name=(name.toString());
            ref = eval(element+"List");
            console.log(ref);
            filteredcountrylist = filteredcountrylist.concat(ref);
        });
        // console.log("current filtered list: ", filteredcountrylist)
    }
}


function generateRegionalLists() {
    AfricaList = countrylist.filter(country => country.region == "Africa" );
    AmericasList = countrylist.filter(country => country.region == "Americas" );
    AsiaList = countrylist.filter(country => country.region == "Asia" );
    EuropeList = countrylist.filter(country => country.region == "Europe" );
    OceaniaList = countrylist.filter(country => country.region == "Oceania" ); 
}
