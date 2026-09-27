// =========================
// PORTFOLIO PRESETS
// =========================

function applyPreset(type) {

    const stocks =
        document.getElementById("stocks");

    const bonds =
        document.getElementById("bonds");

    const gold =
        document.getElementById("gold");

    const cash =
        document.getElementById("cash");


    if (type === "conservative") {

        stocks.value = 20;
        bonds.value = 40;
        gold.value = 10;
        cash.value = 30;

    }


    if (type === "balanced") {

        stocks.value = 50;
        bonds.value = 25;
        gold.value = 10;
        cash.value = 15;

    }


    if (type === "growth") {

        stocks.value = 70;
        bonds.value = 15;
        gold.value = 10;
        cash.value = 5;

    }


    document.getElementById("allocationMessage").textContent =
        "Preset selected. Click Calculate portfolio to see the results.";
}



// =========================
// CALCULATE PORTFOLIO
// =========================

function calculatePortfolio() {

    const stocks =
        parseFloat(document.getElementById("stocks").value) || 0;

    const bonds =
        parseFloat(document.getElementById("bonds").value) || 0;

    const gold =
        parseFloat(document.getElementById("gold").value) || 0;

    const cash =
        parseFloat(document.getElementById("cash").value) || 0;


    const total =
        stocks + bonds + gold + cash;

    const message =
        document.getElementById("allocationMessage");


    // Validation

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


    // Fictional educational return assumptions

    const stockReturn = 8;
    const bondReturn = 4;
    const goldReturn = 5;
    const cashReturn = 2;


    // Weighted annual return

    const portfolioReturn =
        (stocks / 100) * stockReturn +
        (bonds / 100) * bondReturn +
        (gold / 100) * goldReturn +
        (cash / 100) * cashReturn;


    const startingAmount = 100000;


    // One-year result

    const profit =
        startingAmount *
        (portfolioReturn / 100);

    const finalValue =
        startingAmount + profit;


    // Risk level

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
        startingAmount * (stocks / 100);

    const bondsAmount =
        startingAmount * (bonds / 100);

    const goldAmount =
        startingAmount * (gold / 100);

    const cashAmount =
        startingAmount * (cash / 100);


    // Main results

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
        "AED " +
        stocksAmount.toLocaleString("en-US");

    document.getElementById("bondsAmount").textContent =
        "AED " +
        bondsAmount.toLocaleString("en-US");

    document.getElementById("goldAmount").textContent =
        "AED " +
        goldAmount.toLocaleString("en-US");

    document.getElementById("cashAmount").textContent =
        "AED " +
        cashAmount.toLocaleString("en-US");


    // Allocation chart

    document.getElementById("stocksBar").style.width =
        stocks + "%";

    document.getElementById("bondsBar").style.width =
        bonds + "%";

    document.getElementById("goldBar").style.width =
        gold + "%";

    document.getElementById("cashBar").style.width =
        cash + "%";


    // Allocation percentages

    document.getElementById("stocksPercent").textContent =
        stocks + "%";

    document.getElementById("bondsPercent").textContent =
        bonds + "%";

    document.getElementById("goldPercent").textContent =
        gold + "%";

    document.getElementById("cashPercent").textContent =
        cash + "%";


    // =========================
    // 5-YEAR COMPOUND GROWTH
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


        document.getElementById("year" + year).textContent =
            "AED " +
            Math.round(growthValue).toLocaleString("en-US");
    }


    // Growth rate

    document.getElementById("growthRate").textContent =
        portfolioReturn.toFixed(2) + "%";


    // =========================
    // GROWTH CHART
    // =========================

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


    // Success message

    message.textContent =
        "Portfolio allocation successfully calculated.";
}


// =========================
// LOAD DEFAULT PORTFOLIO
// =========================

document.addEventListener("DOMContentLoaded", function() {

    calculatePortfolio();

});
