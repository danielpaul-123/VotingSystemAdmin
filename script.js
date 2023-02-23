// Get the button element by its ID
const myButton = document.getElementById('skp');

// Add a click event listener to the button
function disabler(){
  // Set the cookie with a name, value, and expiration date
  document.cookie = 'skipp=true; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/';
}