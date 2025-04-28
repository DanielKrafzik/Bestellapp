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
        if(ele.price["20cm"]) {
            document.querySelectorAll(".foodPrice")[foodCounter].innerHTML = ele.price["20cm"];
        } else {
            document.querySelectorAll(".foodPrice")[foodCounter].innerHTML = ele.price;
        }
        foodCounter++;
    }
};

function addDishToBasket(ele) {
    if(!basketTitlesArray.includes(ele.parentElement.querySelector(".foodDishesTitle").innerText)) {
        basketTitlesArray.push(ele.parentElement.querySelector(".foodDishesTitle").innerText);
        document.getElementById("basketContainer").innerHTML += dishBasket; 
        document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)].innerHTML = ele.previousElementSibling.innerHTML;
        foodCounterArray.push(1); 
        renderBasket();
    } else {
        foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)]++;
        document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)].innerHTML = Math.round((Number(document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)].innerHTML) + Number(ele.previousElementSibling.innerHTML)) * 100) / 100;
    }
    document.querySelectorAll(".orderCounter")[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)].innerHTML = foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)];
};

function renderBasket() {
    document.querySelectorAll(".basketFoodTitle")[basketTitleCounter].innerHTML = basketTitlesArray[basketTitleCounter];
    basketTitleCounter++;
};

function renderBasketPrice() {

}

console.log(Number(document.querySelectorAll(".foodPrice")[0].innerHTML) + Number(document.querySelectorAll(".foodPrice")[0].innerHTML))