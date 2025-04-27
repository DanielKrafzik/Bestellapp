const foodContainer = document.getElementById("foodRenderContainer");
let basketArray = [];
let element = "";
let foodCounter = 0;


for (let index = 0; index < myDishes.length; index++) {
    element = myDishes[index];
    foodContainer.innerHTML += foodSection;
    document.querySelectorAll(".foodSectionTitle")[index].innerHTML = element.foodTitle;
    renderDishes(element, index);
}

function renderDishes(el, i) {
    for (let dishIndex = 0; dishIndex < el.foodData.length; dishIndex++) {
        const ele = el.foodData[dishIndex];
        document.querySelectorAll(".foodDishesContainer")[i].innerHTML += foodDish;
        document.querySelectorAll(".foodDishesTitle")[foodCounter].innerHTML = ele.name;
        document.querySelectorAll(".foodDescriptions")[foodCounter].innerHTML = ele.ingredients;
        foodCounter++;
    }
}