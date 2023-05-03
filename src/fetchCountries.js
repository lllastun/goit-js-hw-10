import { Notify } from 'notiflix';
const API_URL = `https://restcountries.com/v3.1/name/`;
const ERROR_Not_Found = 'Oops, there is no country with that name';
const searchParameters = 'name,capital,population,flags,flag,languages';

export function fetchCountries(name) {
  console.log(API_URL + name + '?fields=' + searchParameters);
  return fetch(API_URL + name + '?fields=' + searchParameters)
    .then(response => {
      console.log(`response.ok ` + response.ok);
      if (!response.ok) {
        console.dir(response);
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      Notify.failure(ERROR_Not_Found);
    });
}
