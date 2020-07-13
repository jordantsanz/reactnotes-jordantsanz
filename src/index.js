import $ from 'jquery';
import './style.scss';

let seconds = 0;
function counter(addingSeconds) {
  seconds += 1;
  $('#main').html(`You've been on this page for ${seconds} seconds...`);
}

setInterval(counter, 1000);
