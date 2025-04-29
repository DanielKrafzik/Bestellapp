const foodSection = `
                    <div>
                        <img>
                        <h2 class="foodSectionTitle"></h2>
                        <div class="foodDishesContainer"></div>
                    </div>
`;

const foodDish = `
                <div>
                    <h2 class="foodDishesTitle"></h2>
                    <p class="foodDescriptions"></p>
                    <p class="foodPrice"></p>
                    <button class="addToBasket" onClick="addDishToBasket(this)">+</button>
                </div>
`;

const dishBasket = `
                    <div>
                        <h3 class="basketFoodTitle"></h3>
                        <div>
                            <button onClick="decreaseDish(this)">-</button>
                            <p class="orderCounter"></p>
                            <button>+</button>
                            <p class="basketFoodPrice"></p>
                            <img>
                        </div>
                    </div>
`