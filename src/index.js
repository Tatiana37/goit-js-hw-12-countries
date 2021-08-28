import refs from './js/refs';
import fetchCountries from './js/fetchCountries';
import { error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import countryCard from './templates/countryCard.hbs';
import countriesList from './templates/countriesList.hbs';

const debounce = require('lodash.debounce');

refs.input.addEventListener('input', debounce(onInputSearch, 500));

function onInputSearch(e) {
    e.preventDefault();
    clearInput();
    const search = refs.input.value;
    fetchCountries(search)
        .then(country => {
            if (country.length > 10) {
                error({
                    text: 'Too many matches found. Please enter a more specific query!'
                });
            } else if (country.status === 404){
                    error({
                    text: 'No country has been found. Please enter a more specific query!',
                });
            } else if (country.length === 1) {
                renderCountryCard(country);
            } else if (country.length <= 10) {
                renderCountiesList(country);
            }    
        })
        .catch(err => console.log(err))
    
}

function renderCountryCard(country) {
    return refs.details.innerHTML = countryCard(country)
}

function renderCountiesList(country) {
    const markupList = countriesList(country);
    refs.countriesList.insertAdjacentHTML('beforeend', markupList)
}

function clearInput() {
    refs.details.innerHTML = '';
    refs.countriesList.innerHTML = '';
}