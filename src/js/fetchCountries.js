import { Notify } from "notiflix";

const BASE_URL = 'https://restcountries.com/v3.1/name/'
const options = '?fields=name,capital,population,flags,languages';

// Функція fetchCountries(name) робить HTTP-запит ___________
export function fetchCountries (countryName) {
 // перевіряємо як виглядає наш рядок запиту
 // console.log(`${BASE_URL}${countryName}${options}`);
 // робимо запит 
 
 return fetch(`${BASE_URL}${countryName}${options}`)
 // в першому then ми отримуємо екземпляр класу response (технічну інформацію і проміс з даними)
 .then(response => {
  // якщо response має статус відмінний від ok, то викликаємо помилку
// якщо країни не існує то показати "Oops, there is no country with that name"
   if (!response.ok) {
    Notify.failure('Oops, there is no country with that name',{
  position: 'center-top',
  fontSize: '20px',
  showOnlyTheLastOne: true,
});
    throw new Error(response.status);
   }
   return response.json();
   
 })
}

