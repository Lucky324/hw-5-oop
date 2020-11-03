function Dish(name) {
    this.name = name;
    this.price = 0;
    this.calories = 0;
}
Dish.prototype.getName = function() {
    return this.name;
};
Dish.prototype.calculatePrice = function() {
    return this.price;
};
Dish.prototype.calculateCalories = function () {
    return this.calories;
};
Dish.prototype.printDish = function () {
    return this.getName();
};

function Hamburger(name, size, stuffing) {
    Dish.call(this, name);
    this.size = size;
    this.stuffing = stuffing;
    switch (size) {
        case "small":
            this.price = Hamburger.SIZE_SMALL.price;
            this.calories = Hamburger.SIZE_SMALL.calories;
            break;
        case "large":
            this.price = Hamburger.SIZE_LARGE.price;
            this.calories = Hamburger.SIZE_LARGE.calories;
    }
    switch (stuffing) {
        case "cheese":
            this.price += Hamburger.STUFFING_CHEESE.price;
            this.calories += Hamburger.STUFFING_CHEESE.calories;
            break;
        case "salad":
            this.price += Hamburger.STUFFING_SALAD.price;
            this.calories += Hamburger.STUFFING_SALAD.calories;
            break;
        case "potato":
            this.price += Hamburger.STUFFING_POTATO.price;
            this.calories += Hamburger.STUFFING_POTATO.calories;
    }
}
Hamburger.prototype = Object.create(Dish.prototype);
Hamburger.prototype.getSize = function () {
    return this.size;
};
Hamburger.prototype.getStuffing = function () {
    return this.stuffing;
};
Hamburger.prototype.printDish = function () {
    return this.getName() + ": " + this.getSize() + ", " + this.getStuffing();
};
Hamburger.SIZE_SMALL = { price: 50, calories: 20 };
Hamburger.SIZE_LARGE = { price: 100, calories: 40 };
Hamburger.STUFFING_CHEESE = { price: 10, calories: 20 };
Hamburger.STUFFING_SALAD = { price: 20, calories: 5 };
Hamburger.STUFFING_POTATO = { price: 15, calories: 10 };

function Salad(name, saladName) {
    Dish.call(this, name);
    this.saladName = saladName;
    switch (saladName) {
        case "caesar":
            this.price = Salad.CAESAR.price;
            this.calories = Salad.CAESAR.calories;
            break;
        case "olivie":
            this.price = Salad.OLIVIE.price;
            this.calories = Salad.OLIVIE.calories;
    }
}
Salad.prototype = Object.create(Dish.prototype);
Salad.prototype.getSaladName = function () {
    return this.saladName;
};
Salad.prototype.printDish = function () {
    return this.getName() + ": " + this.getSaladName();
};
Salad.CAESAR = { price: 100, calories: 20 };
Salad.OLIVIE = { price: 50, calories: 80 };

function Drink(name, drinkName) {
    Dish.call(this, name);
    this.drinkName = drinkName;
    switch (drinkName) {
        case "cola":
            this.price = Drink.COLA.price;
            this.calories = Drink.COLA.calories;
            break;
        case "coffee":
            this.price = Drink.COFFEE.price;
            this.calories = Drink.COFFEE.calories;
    }
}
Drink.prototype = Object.create(Dish.prototype);
Drink.prototype.getDrinkName = function () {
    return this.drinkName;
};
Drink.prototype.printDish = function () {
    return this.getName() + ": " + this.getDrinkName();
};
Drink.COLA = { price: 50, calories: 40 };
Drink.COFFEE = { price: 80, calories: 20 };

function Bill() {
    this.dishList = [];
    this.paid = false;
    this.totalCalories = 0;
    this.totalPrice = 0;
}
Bill.prototype.addDish = function () {
    if(this.paid){
        console.log("Your bill has already been paid!");
        return;
    }
    var dishForAdd = Object.create(null);
    switch (arguments[0]) {
        case "hamburger":
            dishForAdd = new Hamburger(arguments[0], arguments[1], arguments[2]);
            break;
        case "salad":
            dishForAdd = new Salad(arguments[0], arguments[1]);
            break;
        case "drink":
            dishForAdd = new Drink(arguments[0], arguments[1]);
            break;
    }
    this.dishList.push(dishForAdd);
    this.totalCalories += dishForAdd.calculateCalories();
    this.totalPrice += dishForAdd.calculatePrice();
};
Bill.prototype.compareDish = function(dish1, dish2) {
    switch (dish1.getName()) {
        case "hamburger":
            if(dish2.getName() == "hamburger"){
                if(dish1.getSize() == dish2.getSize() && dish1.getStuffing() == dish2.getStuffing())
                    return true;
            }
            break;
        case "salad":
            if(dish2.getName() == "salad"){
                if(dish1.getSaladName() == dish2.getSaladName())
                    return true;
            }
            break;
        case "drink":
            if(dish2.getName() == "drink"){
                if(dish1.getDrinkName() == dish2.getDrinkName())
                    return true;
            }
    }
    return false;
};
Bill.prototype.deleteDish = function() {
    if(this.paid){
        console.log("Your bill has already been paid!");
        return;
    }
    if (this.dishList.length == 0) {
        console.log("Your bill is empty!");
        return;
    }
    var dishForDelete = Object.create(null);
    switch (arguments[0]) {
        case "hamburger":
            dishForDelete = new Hamburger(arguments[0], arguments[1], arguments[2]);
            break;
        case "salad":
            dishForDelete = new Salad(arguments[0], arguments[1]);
            break;
        case "drink":
            dishForDelete = new Drink(arguments[0], arguments[1]);
    }
    for (var i = 0; i < this.dishList.length; i++){
        if(this.compareDish(dishForDelete, this.dishList[i])){
            this.dishList.splice(i, 1);
            this.totalPrice -= dishForDelete.calculatePrice();
            this.totalCalories -= dishForDelete.calculateCalories();
            return;
        }
    }
    console.log("There is no such dish in the bill!");
};
Bill.prototype.payBill = function () {
    this.paid = true;
};
Bill.prototype.calculateTotalPrice = function () {
    if (this.dishList.length == 0) {
        console.log("Your bill is empty!");
        return;
    }
    if(this.paid){
        console.log("Your bill has already been paid!");
    }
    return this.totalPrice;
};
Bill.prototype.calculateTotalCalories = function () {
    if (this.dishList.length == 0) {
        console.log("Your bill is empty!");
        return;
    }
    if(this.paid){
        console.log("Your bill has already been paid!");
    }
    return this.totalCalories;
};
Bill.prototype.showBill = function () {
    if (this.dishList.length == 0) {
        console.log("Your bill is empty!");
        return;
    }
    for (var i = 0; i < this.dishList.length; i++){
        console.log(this.dishList[i].printDish());
    }
};

myBill = new Bill();


myBill.addDish("hamburger", "large", "cheese");
console.log(myBill.calculateTotalCalories());
myBill.addDish("salad", "caesar");
myBill.addDish("salad", "olivie");
myBill.showBill();
console.log(myBill.calculateTotalCalories());
console.log(myBill.calculateTotalPrice());
myBill.addDish("drink", "cola");
myBill.addDish("drink", "coffee");
myBill.showBill();
console.log(myBill.calculateTotalCalories());
console.log(myBill.calculateTotalPrice());
myBill.deleteDish("drink", "coffee");
myBill.showBill();
console.log(myBill.calculateTotalCalories());
console.log(myBill.calculateTotalPrice());
myBill.payBill();
myBill.deleteDish("drink", "cola");
