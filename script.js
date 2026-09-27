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
    // FIRST-YEAR PROFIT
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
    // MAIN RESULTS
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
    // ALLOCATION CARDS
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
    // ALLOCATION CHART
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
    // CHART PERCENTAGES
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
    // 5-YEAR GROWTH PROJECTION
    // =========================

    const rate =
        portfolioReturn / 100;


    let year1 =
        startingAmount *
        Math.pow(1 + rate, 1);

    let year2 =
        startingAmount *
        Math.pow(1 + rate, 2);

    let year3 =
        startingAmount *
        Math.pow(1 + rate, 3);

    let year4 =
        startingAmount *
        Math.pow(1 + rate, 4);

    let year5 =
        startingAmount *
        Math.pow(1 + rate, 5);


    // =========================
    // UPDATE GROWTH RATE
    // =========================

    document.getElementById("growthRate").textContent =
        portfolioReturn.toFixed(2) + "%";


    // =========================
    // UPDATE YEAR VALUES
    // =========================

    document.getElementById("year1").textContent =
        "AED " +
        Math.round(year1).toLocaleString("en-US");

    document.getElementById("year2").textContent =
        "AED " +
        Math.round(year2).toLocaleString("en-US");

    document.getElementById("year3").textContent =
        "AED " +
        Math.round(year3).toLocaleString("en-US");

    document.getElementById("year4").textContent =
        "AED " +
        Math.round(year4).toLocaleString("en-US");

    document.getElementById("year5").textContent =
        "AED " +
        Math.round(year5).toLocaleString("en-US");


    // =========================
    // SUCCESS MESSAGE
    // =========================

    message.textContent =
        "Portfolio allocation successfully calculated.";
}
