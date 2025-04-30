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
        renderEuroPrice();
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
        document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)].innerHTML = Math.round((Number(document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)].innerHTML.replace("€", "")) + Number(ele.previousElementSibling.innerHTML.replace("€", ""))) * 100) / 100 + "€";
    }
    document.querySelectorAll(".orderCounter")[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)].innerHTML = foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)];
};

function renderBasket() {
    document.querySelectorAll(".basketFoodTitle")[basketTitleCounter].innerHTML = basketTitlesArray[basketTitleCounter];
    basketTitleCounter++;
};

function renderEuroPrice() {
    if(document.querySelectorAll(".foodPrice")[foodCounter].innerHTML.includes(".")) {
        document.querySelectorAll(".foodPrice")[foodCounter].innerHTML += "0€"
    } else {
        document.querySelectorAll(".foodPrice")[foodCounter].innerHTML += ".00€"
    }
}

function decreaseDish(ele) {
    let dishPriceSum = ele.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
    if(foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText)] > 1) {
        //dishPriceSum = Math.round(Number(dishPriceSum.replace("€", "")) / foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText)] * (foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText)] - 1) * 100) / 100 + "€";
        foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText)]--;
        document.querySelectorAll(".orderCounter")[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText)].innerHTML = foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText)];
    } else {
        ele.parentElement.parentElement.remove();
        foodCounterArray.splice(basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText), 1);
        basketTitlesArray.splice(basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText), 1);
        basketTitleCounter--;
    }
    console.log(dishPriceSum)
}