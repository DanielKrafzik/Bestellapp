const foodContainer = document.getElementById("foodRenderContainer");
let basketTitlesArray = [];
let foodCounterArray = [];
let foodGroup;
let foodCounter = 0;
let basketTitleCounter = 0;


for (let foodGroupIndex = 0; foodGroupIndex < myDishes.length; foodGroupIndex++) {
    foodGroup = myDishes[foodGroupIndex];
    foodContainer.innerHTML += foodSection;
    document.querySelectorAll(".foodSectionTitle")[foodGroupIndex].innerHTML = foodGroup.foodTitle;
    renderDishes(foodGroup, foodGroupIndex);
};

function renderDishes(dishData, dishDataIndex) {
    for (let dishIndex = 0; dishIndex < dishData.foodData.length; dishIndex++) {
        const ele = dishData.foodData[dishIndex];
        document.querySelectorAll(".foodDishesContainer")[dishDataIndex].innerHTML += foodDish;
        document.querySelectorAll(".foodDishesTitle")[foodCounter].innerHTML = ele.name;
        document.querySelectorAll(".foodDescriptions")[foodCounter].innerHTML = ele.ingredients;
        foodCounter++;
    }
};

function addDishToBasket(ele) {
    if(!basketTitlesArray.includes(ele.parentElement.querySelector(".foodDishesTitle").innerText)) {
        basketTitlesArray.push(ele.parentElement.querySelector(".foodDishesTitle").innerText);
        document.getElementById("basketContainer").innerHTML += dishBasket; 
        foodCounterArray.push(1); 
        document.querySelectorAll(".orderCounter")[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)].innerHTML = foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)];
        renderBasket();
    } else {
        foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)]++;
        document.querySelectorAll(".orderCounter")[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)].innerHTML = foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)];
    }
    
    
console.log(foodCounterArray)
};

function renderBasket() {
    document.querySelectorAll(".basketFoodTitle")[basketTitleCounter].innerHTML = basketTitlesArray[basketTitleCounter];
    basketTitleCounter++;
};