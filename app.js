const searchFoods = () => {
    const searchfood = document.getElementById('search-food').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchfood}`)
        .then(res => res.json())
        .then(data => {
            displayFoods(data.meals);
        })
        .catch(error => displayError('Invalid search'));
}


const displayFoods = foods => {
    const foodContainer = document.getElementById('food-container');
    foodContainer.innerHTML = '';
    foods.forEach(food => {
        const foodDiv = document.createElement('div');
        const ingredients = food.strInstructions.replace(/(\r\n|\r|\n)/g, '<br>');
        foodDiv.className = 'single-result col-md-3 foodPicture align-items-center my-3 p-3';
        foodDiv.innerHTML = `
        <div onclick="getFood('${food.strMeal}','${food.idMeal}', '${food.strMealThumb}', '${ingredients}')">
            
        <div class="cardInside">
        <div class="">
        <div class="d-flex justify-content-center">
        <img src=${food.strMealThumb} class="card-img-top" alt="...">
        </div>
        <div class="card-body text-center">
        <b class="card-text">${food.strMeal}</b>
</div>
</div>
    
        </div>
        <div class="col-md-3 text-md-right text-center">
        </div>
        
            </div>

        `;
        foodContainer.appendChild(foodDiv);
    })
}
const getFood = async (strMeal, idMeal, strMealThumb, ingredients) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayFood(idMeal, strMeal, strMealThumb, ingredients);
    }
    catch (error) {
        displayError('Sorry! ERROR:404, Please try again later!!!')
    }
}


const displayFood = (food, strMeal, strMealThumb, ingredients) => {
    const foodDiv = document.getElementById('food-container');
    foodDiv.innerHTML = `<div  class=" mx-auto py-4">
    <div class="ingredients">
    <img src="${strMealThumb}" alt=""> <br>
        <h4 align=left>${strMeal}</h4>       
        <p align=left>Instruction<br> ${ingredients}</p>       
    </div> 
`;

}

const displayError = error => {
    const errorTag = document.getElementById('error');
    errorTag.innerText = error;
}