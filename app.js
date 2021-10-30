let countrylist = [];
let localcountries;
let filteredcountrylist = [];
let enabledSettings = [];

let AfricaList = [];
let AmericasList = [];
let AsiaList = [];
let EuropeList = [];
let OceaniaList = [];

const apiURL ='http://api.countrylayer.com/v2/all?access_key=4e65e880be2cb3ca68403e03fb82c7f0'; //logan's API key
// const apiURL ='http://api.countrylayer.com/v2/all?access_key=578f857d4210a11edcda5243a2d175ed'; //Amber and Emerald's API key 
const answerCover = document.getElementById('answer-cover');
const settings = document.getElementById('btn-settings');
const modal = document.getElementById('modal');
const closeButton = document.getElementById('btn-close');
const checkboxElements = document.querySelectorAll("input[type=checkbox]");
const nextButton = document.getElementById('next');

// EVENT LISTENERS //

//onclick - Get next country
nextButton.addEventListener('click', () => {
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

async function getCountries(apiURL) {

    //Check if a list of counrties is already stored in Local storage. If not, fetch list via API
    if (localStorage.getItem("localcountries") === null) {
        console.log("No local storage found");

        try {
            const response = await fetch(apiURL)
            const rawlist = await response.json();
            localcountries = await rawlist.filter(country => country.capital != "" )

            
            
            console.log("download to: ", localcountries)
            localStorage.setItem("localcountries", JSON.stringify(localcountries));
            console.log("downlaoded and local countries", localcountries)
            countrylist = [...localcountries];
            
        } catch (error) {
            console.log("Sorry there was an error: ", error)
        }
        
    } else {
        console.log("Found Local storage");
        localcountries = JSON.parse(localStorage.getItem("localcountries"))
        countrylist = [...localcountries];
        console.log("else - ", countrylist)
    }
}

function getEnabledSettings() {
    console.log("Getting the enabled settings");
    getRegions = [...document.getElementsByClassName('region')];
    enabledSettings = [];
    getRegions.forEach(element => {
        if (element.checked) {
            enabledSettings.push(element.name);
        }
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
        wakanda.checked = true;
        enabledSettings = ['Africa'];
        filteredcountrylist = AfricaList;
    }
    else {
        filteredcountrylist = []
        enabledSettings.forEach(element => {
            ref = eval(element+"List");
            filteredcountrylist.push(ref);
            console.log(filteredcountrylist)
            
        });
        flattenedArray = filteredcountrylist.flat(2);
        filteredcountrylist = [...flattenedArray];
    }
}

function generateRegionalLists() {
    AfricaList = countrylist.filter(country => country.region == "Africa" );
    AmericasList = countrylist.filter(country => country.region == "Americas" );
    AsiaList = countrylist.filter(country => country.region == "Asia" );
    EuropeList = countrylist.filter(country => country.region == "Europe" );
    OceaniaList = countrylist.filter(country => country.region == "Oceania" ); 
}

async function caller () {
    await getCountries(apiURL)
    generateRegionalLists();
    getEnabledSettings();
    newCountry();
}

caller(apiURL)