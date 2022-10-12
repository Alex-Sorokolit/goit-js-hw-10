//  метод fetch робить запит на сервер
// якщо успішно то then отримає проміс
fetch('https://pokeapi.co/api/v2/pokemon/pikachu').then(response => {
  // text якщо табличні дані
 // blob якщо зображення відео аудіо
 // json якщо об'єкт
 
 // json розпарсить проміс
// якщо все успішно, then видасть результат (об'єкт)
 return response.json();}).then(pokemon => {
 console.log(pokemon);
 }).catch(error => {
 console.log(error);
})
// якщо не успішно то catch впіймає помилку на будь-якому атапі

 
