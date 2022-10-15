import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
// Поле пошуку _____________________________________________
// зробити Debounce на інпуті 300ms
const DEBOUNCE_DELAY = 300;

refs ={
 inputCountryName: document.querySelector('#search-box'),
 countryList: document.querySelector('.country-list'),
 country: document.querySelector('.country-info'),
}

refs.inputCountryName.addEventListener('input',
debounce(onSerchInput, DEBOUNCE_DELAY));
// console.log(inputValue);


const notifyOptions = {
  position: 'center-top',
  fontSize: '20px',
  showOnlyTheLastOne: true,
};


// Функція зпускає fetchCountries і функції видалення розмітки
function onSerchInput(event) {
// Коли поле пошуку пусте потрібно видалити розмітку
removeList();
removeCountry();
  
// Меторд trim() видаляє зайві пробіли
  const inputValue = event.target.value.trim().toLowerCase();

// в другому then ми отримуємо дані
fetchCountries(inputValue).then(data => {
// Якщо результат запиту - це масив з однією країною, в інтерфейсі відображається розмітка картки з даними про країну: 
// прапор, назва, столиця, населення і мови.
if (data.length === 1){
 renderCountryMarcup(data);
  console.log('one country');
// Якщо бекенд повернув від 2-х до 10-и країн, під тестовим полем відображається список знайдених країн.
// Кожен елемент списку складається з прапора та назви країни.
} else if (data.length >= 2 && data.length <= 10){
 console.log('list countries');
 renderListMarkup(data);
} else {
 manyCountries(data);
}

 })
 .catch(error => {
 console.log(error);
 });
};

 // Створення розмітки _________________________________________________________
function createCountryMarkup({capital, population, languages, flags, name} ){
 // const {capital, population, languages, flags, name} = data[0];
const languagesValue = Object.values(languages).join(', ')
 // console.log(capital[0]);
 // console.log(population);
 // console.log(languagesValue);
 // console.log(flags.svg);
 // console.log(name.official);

 return `<img
      class="country-info-image"
      src="${flags.svg}"
      alt="country flag"
      width="300"
      height="220"
    />
    <p class="country-info-name">${name.official}</p>
    <ul class="country-info-list">
      <li class="country-info-item"><b>Capital:</b> ${capital}</li>
      <li class="country-info-item"><b>Population:</b> ${population}</li>
      <li class="country-info-item"><b>Languages:</b> ${languagesValue}</li>
    </ul>`
};



 function createListMarkup({flags,name}){
  return `<li class="country-list-item">
        <img class="country-list-flag" src="${flags.svg}" alt="country flag"
        width="60"
        height="40"
        />
        <p class="country-list-name">${name.official}</p>
      </li>`
 };


 // Якщо більше 10 країн показати "Too many matches found. Please enter a more specific name."
// з допомогою notiflix
function manyCountries(countries) {
  Notify.info('Too many matches found. Please enter a more specific name.', notifyOptions);
console.log("Too many matches found. Please enter a more specific name.");
console.log(countries)
};

// Рендер розмітки _________________________________________________________
function renderListMarkup (data){
 const markup = data.map(createListMarkup).join('');
 refs.countryList.innerHTML = markup;
}

function renderCountryMarcup(data) {
 const markup = data.map(createCountryMarkup).join('');
 refs.country.innerHTML = markup;
}

// Видалення розмітки _________________________________________________________
function removeList() {
 refs.countryList.innerHTML = '';
}

function removeCountry() {
 refs.country.innerHTML = '';
}




