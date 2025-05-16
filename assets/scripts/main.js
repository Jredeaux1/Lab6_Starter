// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	let recipesJSON = localStorage.getItem('recipes');
	if (!recipesJSON) return [];
	return JSON.parse(recipesJSON);
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	// A10: Get reference to <main>
	let mainElement = document.querySelector('main');
  
	// A11: Loop through recipes array
	for (let recipe of recipes) {
	  // Create new <recipe-card>
	  let card = document.createElement('recipe-card');
	  card.data = recipe;
	  mainElement.appendChild(card);
	}
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	// EXPLORE - START (All explore numbers start with B)
	localStorage.setItem('recipes', JSON.stringify(recipes));

}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	// B2: Get a reference to the <form> element
	let form = document.querySelector('form');

	// B3: Add event listener for form submission
	form.addEventListener('submit', function(e) {
	  e.preventDefault(); // Prevent page reload
  
	  // B4: Create FormData from form
	  let formData = new FormData(form);
  
	  // B5: Create recipeObject from formData
	  let recipeObject = {};
	  for (let pair of formData.entries()) {
		recipeObject[pair[0]] = pair[1];
	  }
  
	  // B6: Create <recipe-card> element
	  let newCard = document.createElement('recipe-card');
  
	  // B7: Set .data to recipeObject
	  newCard.data = recipeObject;
  
	  // B8: Append new card to <main>
	  let main = document.querySelector('main');
	  main.appendChild(newCard);
  
	  // B9: Update localStorage
	  let existingRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
	  existingRecipes.push(recipeObject);
	  saveRecipesToStorage(existingRecipes);
	});
  
	// B10: Reference to "Clear Local Storage" button
	let clearBtn = document.querySelector('button[type="button"]');
  
	// B11: Add click listener
	clearBtn.addEventListener('click', function() {
	  // B12: Clear localStorage
	  localStorage.clear();
	  // B13: Clear contents of <main>
	  let main = document.querySelector('main');
	  main.innerHTML = '';
	});
}
