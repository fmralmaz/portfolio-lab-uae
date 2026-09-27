function calculatePortfolio() {

    // =========================
    // GET USER INPUTS
    // =========================

    const stocks =
        parseFloat(document.getElementById("stocks").value) || 0;

    const bonds =
        parseFloat(document.getElementById("bonds").value) || 0;

    const gold =
        parseFloat(document.getElementById("gold").value) || 0;

    const cash =
        parseFloat(document.getElementById("cash").value) || 0;


    // =========================
    // TOTAL ALLOCATION
    // =========================

    const total =
        stocks + bonds + gold + cash;

    const message =
        document.getElementById("allocationMessage");


    // =========================
    // VALIDATION
    // =========================

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


    // =========================
    // EDUCATIONAL RETURN
    // ASSUMPTIONS
    // =========================

    const stockReturn = 8;
    const bondReturn = 4;
    const goldReturn = 5;
    const cashReturn = 2;


    // =========================
    // PORTFOLIO RETURN
    // =========================

    const portfolioReturn =
        (stocks / 100) * stockReturn +
        (bonds / 100) * bondReturn +
        (gold / 100) * goldReturn +
        (cash / 100) * cashReturn;


    // =========================
    // STARTING PORTFOLIO
    // =========================

    const startingAmount = 100000;


    // =========================
    // ONE-YEAR VALUE
    // =========================

    const profit =
        startingAmount *
        (portfolioReturn / 100);

    const finalValue =
        startingAmount + profit;


    // =========================
    // RISK LEVEL
    // =========================

    let riskLevel;

    if (stocks >= 70) {
        riskLevel = "High";
    } else if (stocks >= 40) {
        riskLevel = "Moderate";
    } else {
        riskLevel = "Lower";
    }


    // =========================
    // ASSET AMOUNTS
    // =========================

    const stocksAmount =
        startingAmount * (stocks / 100);

    const bondsAmount =
        startingAmount * (bonds / 100);

    const goldAmount =
        startingAmount * (gold / 100);

    const cashAmount =
        startingAmount * (cash / 100);


    // =========================
    // UPDATE MAIN RESULTS
    // =========================

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


    // =========================
    // UPDATE ALLOCATION CARDS
    // =========================

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


    // =========================
    // UPDATE ALLOCATION CHART
    // =========================

    document.getElementById("stocksBar").style.width =
        stocks + "%";

    document.getElementById("bondsBar").style.width =
        bonds + "%";

    document.getElementById("goldBar").style.width =
        gold + "%";

    document.getElementById("cashBar").style.width =
        cash + "%";


    // =========================
    // UPDATE CHART PERCENTAGES
    // =========================

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


    // =========================
    // UPDATE GROWTH RATE
    // =========================

    document.getElementById("growthRate").textContent =
        portfolioReturn.toFixed(2) + "%";


    // =========================
    // UPDATE GROWTH CHART
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


    // =========================
    // SUCCESS MESSAGE
    // =========================

    message.textContent =
        "Portfolio allocation successfully calculated.";
}
