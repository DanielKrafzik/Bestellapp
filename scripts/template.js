const foodSection = `
                    <div class="foodSection">
                        <img src="" class="foodSectionImg">
                        <h2 class="foodSectionTitle"></h2>
                        <div class="foodDishesContainer"></div>
                    </div>
`;

const foodDish = `
                <div class="singleDishContainer">
                    <h2 class="foodDishesTitle"></h2>
                    <p class="foodDescriptions"></p>
                    <p class="foodPrice"></p>
                    <button class="addToBasket" onClick="addDishToBasket(this)">+</button>
                </div>
`;

const dishBasket = `
                    <div class="completeDishBasket">
                        <h3 class="basketFoodTitle"></h3>
                        <div class="dishContainerBasket">
                            <button class="decreaseButton" onClick="decreaseDish(this)">-</button>
                            <p class="orderCounter"></p>
                            <button class="increaseButton" onClick="increaseDish(this)">+</button>
                            <p class="basketFoodPrice"></p>
                            <img src="./assets/img/bin2.svg" onClick="deleteDish(this)" class="bin">
                        </div>
                    </div>
`