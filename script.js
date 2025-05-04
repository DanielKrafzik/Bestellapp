const foodContainer = document.getElementById("foodRenderContainer");
let basketTitlesArray = [];
let foodCounterArray = [];
let pizzaTitlesArray = [];
let foodGroup;
let foodCounter = 0;
let basketTitleCounter = 0;
let basketSubtotalSum = 0;

function renderDishSections () {
        for (let foodGroupIndex = 0; foodGroupIndex < myDishes.length; foodGroupIndex++) {
        foodGroup = myDishes[foodGroupIndex];
        foodContainer.innerHTML += foodSection;
        document.querySelectorAll(".foodSectionImg")[foodGroupIndex].src = foodGroup.foodImg;
        document.querySelectorAll(".foodSectionImg")[foodGroupIndex].loading = "lazy";
        document.querySelectorAll(".foodSectionImg")[foodGroupIndex].parentElement.id = foodGroup.foodTitle.replace(" ", "");
        document.querySelectorAll(".foodSectionTitle")[foodGroupIndex].innerHTML = foodGroup.foodTitle;
        renderDishes(foodGroup, foodGroupIndex);
    };
}

function renderDishes(dishData, dishDataIndex) {
    for (let dishIndex = 0; dishIndex < dishData.foodData.length; dishIndex++) {
        const ele = dishData.foodData[dishIndex];
        renderDishesinnerHtml(dishDataIndex, ele);
        if(ele.price["20cm"]) {
            document.querySelectorAll(".foodPrice")[foodCounter].innerHTML = ele.price["20cm"].toFixed(2) + "€";
            document.querySelectorAll(".addToBasket")[foodCounter].dataset.price = ele.price["20cm"];
            pizzaTitlesArray.push(ele.name);
        } else {
            document.querySelectorAll(".foodPrice")[foodCounter].innerHTML = ele.price.toFixed(2) + "€";
            document.querySelectorAll(".addToBasket")[foodCounter].dataset.price = ele.price;
        }
        foodCounter++;
    }
};

function renderDishesinnerHtml(dishDataIndex, ele) {
    document.querySelectorAll(".foodDishesContainer")[dishDataIndex].innerHTML += foodDish;
    document.querySelectorAll(".foodDishesTitle")[foodCounter].innerHTML = ele.name;
    document.querySelectorAll(".foodDescriptions")[foodCounter].innerHTML = ele.ingredients;
    document.querySelectorAll(".addToBasket")[foodCounter].dataset.title = ele.name;
}

function addDishToBasket(ele) {
    if(ele.dataset.title.includes("Pizza")) {
        renderPizzaSizeSelector(ele);
        return document.getElementById("pizzaSizeSelector").style.display = "flex";
    } else if(!basketTitlesArray.includes(ele.dataset.title)) {
        newDishToBasket(ele);
    } else {
        addedDishAgainToBasket(ele);
    }
    document.querySelectorAll(".orderCounter")[basketTitlesArray.indexOf(ele.dataset.title)].innerHTML = foodCounterArray[basketTitlesArray.indexOf(ele.dataset.title)];
    calculateSubtotal();
};

function newDishToBasket(ele) {
    basketTitlesArray.push(ele.dataset.title);
    document.getElementById("basketContainer").innerHTML += dishBasket; 
    document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.dataset.title)].innerHTML = Number(ele.dataset.price).toFixed(2) + "€";
    document.querySelectorAll(".increaseButton")[basketTitlesArray.indexOf(ele.dataset.title)].dataset.price = ele.dataset.price;
    document.querySelectorAll(".increaseButton")[basketTitlesArray.indexOf(ele.dataset.title)].dataset.title = ele.dataset.title;
    document.querySelectorAll(".decreaseButton")[basketTitlesArray.indexOf(ele.dataset.title)].dataset.price = ele.dataset.price;
    document.querySelectorAll(".decreaseButton")[basketTitlesArray.indexOf(ele.dataset.title)].dataset.title = ele.dataset.title;
    document.querySelectorAll(".bin")[basketTitlesArray.indexOf(ele.dataset.title)].dataset.price = ele.dataset.price;
    document.querySelectorAll(".bin")[basketTitlesArray.indexOf(ele.dataset.title)].dataset.title = ele.dataset.title;
    foodCounterArray.push(1);
    basketSubtotalSum += Number(ele.dataset.price);
    renderBasket();
}

function addedDishAgainToBasket(ele) {
    basketSubtotalSum += Number(ele.dataset.price);
    foodCounterArray[basketTitlesArray.indexOf(ele.dataset.title)]++;
    document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.dataset.title)].innerHTML = (Math.round((Number(ele.dataset.price) * foodCounterArray[basketTitlesArray.indexOf(ele.dataset.title)]) * 100) / 100).toFixed(2) + "€";
}

function renderBasket() {
    document.querySelectorAll(".basketFoodTitle")[basketTitleCounter].innerHTML = basketTitlesArray[basketTitleCounter];
    basketTitleCounter++;
};

function decreaseDish(ele) {
    if(foodCounterArray[basketTitlesArray.indexOf(ele.dataset.title)] > 1) {
        document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.dataset.title)].innerHTML = (Math.round(Number(ele.dataset.price) * (foodCounterArray[basketTitlesArray.indexOf(ele.dataset.title)] - 1) * 100) / 100).toFixed(2) + "€";
        foodCounterArray[basketTitlesArray.indexOf(ele.dataset.title)]--;
        document.querySelectorAll(".orderCounter")[basketTitlesArray.indexOf(ele.dataset.title)].innerHTML = foodCounterArray[basketTitlesArray.indexOf(ele.dataset.title)];
        basketSubtotalSum -= Number(ele.dataset.price);
        calculateSubtotal();
    } else {
        deleteDishThroughDecreaser(ele);
    }
}

function deleteDishThroughDecreaser(ele) {
    basketSubtotalSum -= Number(ele.dataset.price);
    calculateSubtotal();
    document.querySelectorAll(".completeDishBasket")[basketTitlesArray.indexOf(ele.dataset.title)].remove();
    foodCounterArray.splice(basketTitlesArray.indexOf(ele.dataset.title), 1);
    basketTitlesArray.splice(basketTitlesArray.indexOf(ele.dataset.title), 1);
    basketTitleCounter--;
}

function increaseDish(ele) {
    document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.dataset.title)].innerHTML = (Math.round(Number(ele.dataset.price) * (foodCounterArray[basketTitlesArray.indexOf(ele.dataset.title)] + 1) * 100) / 100).toFixed(2) + "€";
    foodCounterArray[basketTitlesArray.indexOf(ele.dataset.title)]++;
    document.querySelectorAll(".orderCounter")[basketTitlesArray.indexOf(ele.dataset.title)].innerHTML = foodCounterArray[basketTitlesArray.indexOf(ele.dataset.title)];
    basketSubtotalSum += Number(ele.dataset.price);
    calculateSubtotal();
}

function deleteDish(ele) {
    basketSubtotalSum = Math.round((basketSubtotalSum - Number(ele.dataset.price) * foodCounterArray[basketTitlesArray.indexOf(ele.dataset.title)]) * 100) / 100;
    document.getElementById("basketSubtotal").innerHTML = basketSubtotalSum.toFixed(2) + "€";
    calculateBasketTotal();
    document.querySelectorAll(".completeDishBasket")[basketTitlesArray.indexOf(ele.dataset.title)].remove();
    foodCounterArray.splice(basketTitlesArray.indexOf(ele.dataset.title), 1);
    basketTitlesArray.splice(basketTitlesArray.indexOf(ele.dataset.title), 1);
    basketTitleCounter--;
}

function calculateSubtotal() {
    document.getElementById("basketSubtotal").innerHTML = basketSubtotalSum.toFixed(2) + "€";
    calculateBasketTotal();
}

function calculateBasketTotal() {
    document.getElementById("basketTotal").innerHTML = (Math.round((Number(document.getElementById("basketSubtotal").innerHTML.replace("€", "")) + Number(document.getElementById("deliveryCosts").innerHTML.replace("€", ""))) * 100) / 100).toFixed(2) + "€";
}

function renderPizzaSizeSelector(ele) {
    document.getElementById("pizzaSizeSelectorTitle").innerHTML = ele.dataset.title;    
    setDataPizzaSizeSelector(ele);
    document.getElementById("pizzaSizeSelector").style.top = `${window.scrollY + 20}px`;
}

function setDataPizzaSizeSelector(ele) {
    document.getElementById("20cmPrice").innerHTML = myDishes[0].foodData[pizzaTitlesArray.indexOf(ele.dataset.title)].price["20cm"].toFixed(2) + "€";
    document.getElementById("20cmButton").dataset.price = myDishes[0].foodData[pizzaTitlesArray.indexOf(ele.dataset.title)].price["20cm"];
    document.getElementById("20cmButton").dataset.title = myDishes[0].foodData[pizzaTitlesArray.indexOf(ele.dataset.title)].name;
    document.getElementById("20cmButton").dataset.size = "20cm";
    document.getElementById("26cmPrice").innerHTML = myDishes[0].foodData[pizzaTitlesArray.indexOf(ele.dataset.title)].price["26cm"].toFixed(2) + "€";
    document.getElementById("26cmButton").dataset.price = myDishes[0].foodData[pizzaTitlesArray.indexOf(ele.dataset.title)].price["26cm"];
    document.getElementById("26cmButton").dataset.title = myDishes[0].foodData[pizzaTitlesArray.indexOf(ele.dataset.title)].name;
    document.getElementById("26cmButton").dataset.size = "26cm";
    document.getElementById("32cmPrice").innerHTML = myDishes[0].foodData[pizzaTitlesArray.indexOf(ele.dataset.title)].price["32cm"].toFixed(2) + "€";
    document.getElementById("32cmButton").dataset.price = myDishes[0].foodData[pizzaTitlesArray.indexOf(ele.dataset.title)].price["32cm"];
    document.getElementById("32cmButton").dataset.title = myDishes[0].foodData[pizzaTitlesArray.indexOf(ele.dataset.title)].name;
    document.getElementById("32cmButton").dataset.size = "32cm";
}

function pizzaToBasket(ele) {
    if(!basketTitlesArray.includes(ele.dataset.title + " " + ele.dataset.size)) {
        basketTitlesArray.push(ele.dataset.title + " " + ele.dataset.size);
        document.getElementById("basketContainer").innerHTML += dishBasket;
        setDataPizzaButtons(ele);        
        foodCounterArray.push(1);
        renderBasket();
    } else {
        foodCounterArray[basketTitlesArray.indexOf(ele.dataset.title + " " + ele.dataset.size)]++;
        document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.dataset.title + " " + ele.dataset.size)].innerHTML = (Math.round((Number(ele.dataset.price) * foodCounterArray[basketTitlesArray.indexOf(ele.dataset.title + " " + ele.dataset.size)]) * 100) / 100).toFixed(2) + "€";
    }
    document.querySelectorAll(".orderCounter")[basketTitlesArray.indexOf(ele.dataset.title + " " + ele.dataset.size)].innerHTML = foodCounterArray[basketTitlesArray.indexOf(ele.dataset.title + " " + ele.dataset.size)];
    basketSubtotalSum += Number(ele.dataset.price);
    calculateSubtotal();
    document.getElementById("pizzaSizeSelector").style.display = "none";
}

function setDataPizzaButtons(ele) {    
    document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.dataset.title + " " + ele.dataset.size)].innerHTML = Number(ele.dataset.price).toFixed(2) + "€";
    document.querySelectorAll(".increaseButton")[basketTitlesArray.indexOf(ele.dataset.title + " " + ele.dataset.size)].dataset.price = ele.dataset.price;
    document.querySelectorAll(".increaseButton")[basketTitlesArray.indexOf(ele.dataset.title + " " + ele.dataset.size)].dataset.title = ele.dataset.title + " " + ele.dataset.size;
    document.querySelectorAll(".increaseButton")[basketTitlesArray.indexOf(ele.dataset.title + " " + ele.dataset.size)].dataset.size = ele.dataset.size;
    document.querySelectorAll(".decreaseButton")[basketTitlesArray.indexOf(ele.dataset.title + " " + ele.dataset.size)].dataset.price = ele.dataset.price;
    document.querySelectorAll(".decreaseButton")[basketTitlesArray.indexOf(ele.dataset.title + " " + ele.dataset.size)].dataset.title = ele.dataset.title + " " + ele.dataset.size;
    document.querySelectorAll(".decreaseButton")[basketTitlesArray.indexOf(ele.dataset.title + " " + ele.dataset.size)].dataset.size = ele.dataset.size;
    document.querySelectorAll(".bin")[basketTitlesArray.indexOf(ele.dataset.title + " " + ele.dataset.size)].dataset.price = ele.dataset.price;
    document.querySelectorAll(".bin")[basketTitlesArray.indexOf(ele.dataset.title + " " + ele.dataset.size)].dataset.title = ele.dataset.title + " " + ele.dataset.size;
    document.querySelectorAll(".bin")[basketTitlesArray.indexOf(ele.dataset.title + " " + ele.dataset.size)].dataset.size = ele.dataset.size;
}

function sendOrderMessage() {
    if(basketSubtotalSum === 0) {
        document.getElementById("orderMessage").innerText = "Du hast leider nicht den Mindestbestellwert erreicht.";
        document.getElementById("orderMessage").style.color = "red";
    } else {
        document.getElementById("orderMessage").innerText = "Deiner Bestellung wurde aufgenommen und ist in kürze unterwegs.";
        document.getElementById("orderMessage").style.color = "green";        
        cleanBasket();
    }
}

function cleanBasket() {
    document.getElementById("basketContainer").innerHTML = "";
    basketTitlesArray = [];
    foodCounterArray = [];
    foodCounter = 0;
    basketTitleCounter = 0;
    basketSubtotalSum = 0;
    document.getElementById("basketSubtotal").innerText = "0.00€"
    calculateBasketTotal();
}

function closePizzaSizeSelector() {
    document.getElementById("pizzaSizeSelector").style.display = "none";
}