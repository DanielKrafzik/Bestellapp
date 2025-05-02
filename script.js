const foodContainer = document.getElementById("foodRenderContainer");
let basketTitlesArray = [];
let foodCounterArray = [];
let pizzaTitlesArray = [];
let foodGroup;
let foodCounter = 0;
let basketTitleCounter = 0;

for (let foodGroupIndex = 0; foodGroupIndex < myDishes.length; foodGroupIndex++) {
    foodGroup = myDishes[foodGroupIndex];
    foodContainer.innerHTML += foodSection;
    document.querySelectorAll(".foodSectionImg")[foodGroupIndex].src = foodGroup.foodImg;
    document.querySelectorAll(".foodSectionImg")[foodGroupIndex].loading = "lazy";
    document.querySelectorAll(".foodSectionImg")[foodGroupIndex].parentElement.id = foodGroup.foodTitle.replace(" ", "");
    document.querySelectorAll(".foodSectionTitle")[foodGroupIndex].innerHTML = foodGroup.foodTitle;
    renderDishes(foodGroup, foodGroupIndex);
};

function renderDishes(dishData, dishDataIndex) {
    for (let dishIndex = 0; dishIndex < dishData.foodData.length; dishIndex++) {
        const ele = dishData.foodData[dishIndex];
        renderDishesinnerHtml(dishDataIndex, ele);
        if(ele.price["20cm"]) {
            document.querySelectorAll(".foodPrice")[foodCounter].innerHTML = ele.price["20cm"];
            pizzaTitlesArray.push(ele.name);
        } else {
            document.querySelectorAll(".foodPrice")[foodCounter].innerHTML = ele.price;
        }
        renderEuroPrice();
        foodCounter++;
    }
};

function renderDishesinnerHtml(dishDataIndex, ele) {
    document.querySelectorAll(".foodDishesContainer")[dishDataIndex].innerHTML += foodDish;
    document.querySelectorAll(".foodDishesTitle")[foodCounter].innerHTML = ele.name;
    document.querySelectorAll(".foodDescriptions")[foodCounter].innerHTML = ele.ingredients;
}

function addDishToBasket(ele) {
    if(ele.parentElement.querySelector(".foodDishesTitle").innerText.includes("Pizza")) {
        renderPizzaSizeSelector(ele);
        return document.getElementById("pizzaSizeSelector").style.display = "flex";
    } else if(!basketTitlesArray.includes(ele.parentElement.querySelector(".foodDishesTitle").innerText)) {
        newDishToBasket(ele);
    } else {
        addedDishAgainToBasket(ele);
    }
    document.querySelectorAll(".orderCounter")[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)].innerHTML = foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)];
    calculateSubtotalThroughDishSelection(ele);
};

function newDishToBasket(ele) {
    basketTitlesArray.push(ele.parentElement.querySelector(".foodDishesTitle").innerText);
    document.getElementById("basketContainer").innerHTML += dishBasket; 
    document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)].innerHTML = ele.previousElementSibling.innerHTML;
    foodCounterArray.push(1);
    renderBasket();
}

function addedDishAgainToBasket(ele) {
    foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)]++;
    document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)].innerHTML = Math.round((Number(document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)].innerHTML.replace("€", "")) + Number(ele.previousElementSibling.innerHTML.replace("€", ""))) * 100) / 100;
    if(document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)].innerHTML.includes(".")) {
        document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)].innerHTML += "0€";
    } else {
        document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerText)].innerHTML += ".00€"
    }
}

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
        document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerHTML)].innerHTML = Math.round(Number(dishPriceSum.replace("€", "")) / foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText)] * (foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText)] - 1) * 100) / 100;
        foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText)]--;
        document.querySelectorAll(".orderCounter")[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText)].innerHTML = foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText)];
        renderEuroPriceBasket(ele);
        calculateSubtotal(ele);
    } else {
        deleteDishThroughDecreaser(ele);
    }
}

function deleteDishThroughDecreaser(ele) {
    calculateSubtotal(ele);
    ele.parentElement.parentElement.remove();
    foodCounterArray.splice(basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText), 1);
    basketTitlesArray.splice(basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText), 1);
    basketTitleCounter--;
}

function increaseDish(ele) {
    let dishPriceSum = ele.nextElementSibling.innerHTML;
    document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerHTML)].innerHTML = Math.round(Number(dishPriceSum.replace("€", "")) / foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText)] * (foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText)] + 1) * 100) / 100;
    foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText)]++;
    document.querySelectorAll(".orderCounter")[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText)].innerHTML = foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText)];
    renderEuroPriceBasket(ele);
    calculateSubtotal(ele);
}

function renderEuroPriceBasket(ele) {
    if(document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerHTML)].innerHTML.includes(".")) {
        document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerHTML)].innerHTML += "0€";
    } else {
        document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerHTML)].innerHTML += ".00€";
    }
}

function deleteDish(ele) {
    document.getElementById("basketSubtotal").innerHTML = Math.round((Number(document.getElementById("basketSubtotal").innerHTML.replace("€", "")) - Number(ele.previousElementSibling.innerHTML.replace("€", ""))) * 100) / 100;
    if(document.getElementById("basketSubtotal").innerHTML.includes(".")) {
        document.getElementById("basketSubtotal").innerHTML += "0€";
    } else {
        document.getElementById("basketSubtotal").innerHTML += ".00€";
    }
    calculateBasketTotal();
    ele.parentElement.parentElement.remove();
    foodCounterArray.splice(basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText), 1);
    basketTitlesArray.splice(basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerText), 1);
    basketTitleCounter--;
}

function calculateSubtotal(ele) {
    if(document.getElementById("basketSubtotal").innerHTML === "" || document.getElementById("basketSubtotal").innerHTML === "0") {
        calculateSubtotalIfEmpty(ele);
    } else {
        calculateSubtotalWithValue(ele);
    }
    calculateBasketTotal();
} 

function calculateSubtotalIfEmpty(ele) {
    if(ele.innerText === "+") {
        document.getElementById("basketSubtotal").innerHTML = ele.nextElementSibling.innerText;
    } else {
        document.getElementById("basketSubtotal").innerHTML = ele.nextElementSibling.nextElementSibling.nextElementSibling.innerText;
    }
}

function calculateSubtotalWithValue(ele) {
    if (ele.innerText === "+") {
        document.getElementById("basketSubtotal").innerHTML = Math.round((Number(document.getElementById("basketSubtotal").innerHTML.replace("€", "")) + Number(ele.nextElementSibling.innerText.replace("€", "")) / foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerHTML)]) * 100) / 100;
    } else {
        document.getElementById("basketSubtotal").innerHTML = Math.round((Number(document.getElementById("basketSubtotal").innerHTML.replace("€", "")) - Number(ele.nextElementSibling.nextElementSibling.nextElementSibling.innerText.replace("€", "")) / foodCounterArray[basketTitlesArray.indexOf(ele.parentElement.previousElementSibling.innerHTML)]) * 100) / 100;
    }
    if(document.getElementById("basketSubtotal").innerHTML.includes(".")) {
        document.getElementById("basketSubtotal").innerHTML += "0€"
    } else {
        document.getElementById("basketSubtotal").innerHTML += ".00€"
    }
}

function calculateSubtotalThroughDishSelection(ele) {
    if(document.getElementById("basketSubtotal").innerHTML === "" || document.getElementById("basketSubtotal").innerHTML === "0") {
        document.getElementById("basketSubtotal").innerHTML = ele.previousElementSibling.innerText;
    } else {
        document.getElementById("basketSubtotal").innerHTML = Math.round((Number(document.getElementById("basketSubtotal").innerHTML.replace("€", "")) + Number(ele.previousElementSibling.innerHTML.replace("€", ""))) * 100) / 100;
        if(document.getElementById("basketSubtotal").innerHTML.includes(".")) {
            document.getElementById("basketSubtotal").innerHTML += "0€";
        } else {
            document.getElementById("basketSubtotal").innerHTML += ".00€"; 
        }
    }
    calculateBasketTotal();
}

function calculateBasketTotal() {
    document.getElementById("basketTotal").innerHTML = Math.round((Number(document.getElementById("basketSubtotal").innerHTML.replace("€", "")) + Number(document.getElementById("deliveryCosts").innerHTML.replace("€", ""))) * 100) / 100;
    if(document.getElementById("basketTotal").innerHTML.includes(".")) {
        document.getElementById("basketTotal").innerHTML += "0€";
    } else {
        document.getElementById("basketTotal").innerHTML += ".00€";
    }
}

function renderPizzaSizeSelector(ele) {
    document.getElementById("pizzaSizeSelectorTitle").innerHTML = ele.parentElement.querySelector(".foodDishesTitle").innerHTML;
    document.getElementById("20cmPrice").innerHTML = myDishes[0].foodData[pizzaTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerHTML)].price["20cm"];
    document.getElementById("26cmPrice").innerHTML = myDishes[0].foodData[pizzaTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerHTML)].price["26cm"];
    document.getElementById("32cmPrice").innerHTML = myDishes[0].foodData[pizzaTitlesArray.indexOf(ele.parentElement.querySelector(".foodDishesTitle").innerHTML)].price["32cm"];
    document.querySelectorAll(".pizzaEuroAdding").forEach((item) => {
        if(item.innerHTML.includes(".")) {
            item.innerHTML += "0€";
        } else {
            item.innerHTML += ".00€";
        }
    })
    document.getElementById("pizzaSizeSelector").style.top = `${window.scrollY + 20}px`;
}

function pizzaToBasket(ele) {
    console.log(document.getElementById("pizzaSizeSelectorTitle").innerText + " " + ele.previousElementSibling.previousElementSibling.innerText)
    basketTitlesArray.push(document.getElementById("pizzaSizeSelectorTitle").innerText + " " + ele.previousElementSibling.previousElementSibling.innerText);
    document.getElementById("basketContainer").innerHTML += dishBasket;
    document.querySelectorAll(".basketFoodPrice")[basketTitlesArray.indexOf(document.getElementById("pizzaSizeSelectorTitle").innerText + " " + ele.previousElementSibling.previousElementSibling.innerText)].innerHTML = ele.previousElementSibling.innerHTML;
    foodCounterArray.push(1);
    document.querySelectorAll(".orderCounter")[basketTitlesArray.indexOf(document.getElementById("pizzaSizeSelectorTitle").innerText + " " + ele.previousElementSibling.previousElementSibling.innerText)].innerHTML = foodCounterArray[basketTitlesArray.indexOf(document.getElementById("pizzaSizeSelectorTitle").innerText + " " + ele.previousElementSibling.previousElementSibling.innerText)];
    renderBasket();
    subtotalThroughSizeSelector(ele);
    document.getElementById("pizzaSizeSelector").style.display = "none";
}

function subtotalThroughSizeSelector(ele) {
    if(document.getElementById("basketSubtotal").innerHTML === "" || document.getElementById("basketSubtotal").innerHTML === "0") {
        document.getElementById("basketSubtotal").innerHTML = ele.previousElementSibling.innerText;
    } else {
        document.getElementById("basketSubtotal").innerHTML = Math.round((Number(document.getElementById("basketSubtotal").innerHTML.replace("€", "")) + Number(ele.previousElementSibling.innerText.replace("€", ""))) * 100) / 100;
        if(document.getElementById("basketSubtotal").innerHTML.includes(".")) {
            document.getElementById("basketSubtotal").innerHTML += "0€";
        } else {
            document.getElementById("basketSubtotal").innerHTML += ".00€";
        }
    }
    calculateBasketTotal();
}

function sendOrderMessage() {
    if(document.getElementById("basketSubtotal").innerText === "" || document.getElementById("basketSubtotal").innerText === "0.00€") {
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
    document.getElementById("basketSubtotal").innerText = "0.00€"
    calculateBasketTotal();
}

function closePizzaSizeSelector() {
    document.getElementById("pizzaSizeSelector").style.display = "none";
}