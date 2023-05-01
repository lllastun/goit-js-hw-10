import './css/styles.css';
import {fetchCountries} from './fetchCountries.js';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

fetchCountries();
