// =========================
// GET ELEMENTS
// =========================

const stocksInput = document.getElementById("stocks");
const bondsInput = document.getElementById("bonds");
const goldInput = document.getElementById("gold");
const cashInput = document.getElementById("cash");

const conservativeButton =
    document.getElementById("conservativeButton");

const balancedButton =
    document.getElementById("balancedButton");

const growthButton =
    document.getElementById("growthButton");

const calculateButton =
    document.getElementById("calculateButton");


// =========================
// PRESET BUTTONS
// =========================

conservativeButton.addEventListener("click", function() {

    stocksInput.value = 20;
    bondsInput.value = 40;
    goldInput.value = 10;
    cashInput.value = 30;

    calculatePortfolio();

});


balancedButton.addEventListener("click", function() {

    stocksInput.value = 50;
    bondsInput.value = 25;
    goldInput.value = 10;
    cashInput.value = 15;

    calculatePortfolio();

});


growthButton.addEventListener("click", function() {

    stocksInput.value = 70;
    bondsInput.value = 15;
    goldInput.value = 10;
    cashInput.value = 5;

    calculatePortfolio();

});


// =========================
// CALCULATE BUTTON
// =========================

calculateButton.addEventListener("click", function() {

    calculatePortfolio();

});


// =========================
// CALCULATE PORTFOLIO
// =========================

function calculatePortfolio() {

    const stocks = Number(stocksInput.value);
    const bonds = Number(bondsInput.value);
    const gold = Number(goldInput.value);
    const cash = Number(cashInput.value);

    const total =
        stocks + bonds + gold + cash;


    const message =
        document.getElementById("allocationMessage");


    if (
        stocks < 0 ||
        bonds < 0 ||
        gold < 0 ||
        cash < 0
    ) {

        message.textContent =
            "Percentages cannot be negative.";

        return;

    }


    if (total !== 100) {

        message.textContent =
            "Your allocation must add up to exactly 100%.";

        return;

    }


    // Fictional educational assumptions

    const stockReturn = 8;
    const bondReturn = 4;
    const goldReturn = 5;
    const cashReturn = 2;


    const portfolioReturn =
        (stocks / 100) * stockReturn +
        (bonds / 100) * bondReturn +
        (gold / 100) * goldReturn +
        (cash / 100) * cashReturn;


    const startingAmount = 100000;


    const profit =
        startingAmount * portfolioReturn / 100;

    const finalValue =
        startingAmount + profit;


    // Risk

    let riskLevel;

    if (stocks >= 70) {

        riskLevel = "High";

    } else if (stocks >= 40) {

        riskLevel = "Moderate";

    } else {

        riskLevel = "Lower";

    }


    // Asset amounts

    const stocksAmount =
        startingAmount * stocks / 100;

    const bondsAmount =
        startingAmount * bonds / 100;

    const goldAmount =
        startingAmount * gold / 100;

    const cashAmount =
        startingAmount * cash / 100;


    // Results

    document.getElementById("portfolioValue").textContent =
        finalValue.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });


    document.getElementById("portfolioReturn").textContent =
        portfolioReturn.toFixed(2) + "%";


    document.getElementById("portfolioProfit").textContent =
        profit.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });


    document.getElementById("riskLevel").textContent =
        riskLevel;


    // Allocation cards

    document.getElementById("stocksAmount").textContent =
        "AED " + stocksAmount.toLocaleString("en-US");

    document.getElementById("bondsAmount").textContent =
        "AED " + bondsAmount.toLocaleString("en-US");

    document.getElementById("goldAmount").textContent =
        "AED " + goldAmount.toLocaleString("en-US");

    document.getElementById("cashAmount").textContent =
        "AED " + cashAmount.toLocaleString("en-US");


    // Allocation chart

    document.getElementById("stocksBar").style.width =
        stocks + "%";

    document.getElementById("bondsBar").style.width =
        bonds + "%";

    document.getElementById("goldBar").style.width =
        gold + "%";

    document.getElementById("cashBar").style.width =
        cash + "%";


    // Percentages

    document.getElementById("stocksPercent").textContent =
        stocks + "%";

    document.getElementById("bondsPercent").textContent =
        bonds + "%";

    document.getElementById("goldPercent").textContent =
        gold + "%";

    document.getElementById("cashPercent").textContent =
        cash + "%";


    // =========================
    // 5-YEAR GROWTH
    // =========================

    const annualRate =
        portfolioReturn / 100;

    let growthValue =
        startingAmount;

    const growthValues = [];


    for (let year = 1; year <= 5; year++) {

        growthValue =
            growthValue * (1 + annualRate);

        growthValues.push(growthValue);

        document.getElementById(
            "year" + year
        ).textContent =
            "AED " +
            Math.round(growthValue).toLocaleString("en-US");

    }


    document.getElementById("growthRate").textContent =
        portfolioReturn.toFixed(2) + "%";


    // Growth chart

    const maximumValue =
        Math.max(...growthValues);


    growthValues.forEach(function(value, index) {

        const bar =
            document.getElementById(
                "growthBar" + (index + 1)
            );

        const height =
            (value / maximumValue) * 100;

        bar.style.height =
            height + "%";

    });


    message.textContent =
        "Portfolio successfully calculated.";

}


// Calculate default portfolio

calculatePortfolio();
