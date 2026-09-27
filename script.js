function calculatePortfolio() {

    // Get the percentages entered by the user
    const stocks = parseFloat(document.getElementById("stocks").value) || 0;
    const bonds = parseFloat(document.getElementById("bonds").value) || 0;
    const gold = parseFloat(document.getElementById("gold").value) || 0;
    const cash = parseFloat(document.getElementById("cash").value) || 0;

    // Total allocation
    const total = stocks + bonds + gold + cash;

    const message = document.getElementById("allocationMessage");

    // Make sure the allocation equals 100%
    if (total !== 100) {
        message.textContent =
            "Your allocation must add up to exactly 100%.";

        return;
    }

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

    // Fictional educational annual return assumptions
    const stockReturn = 8;
    const bondReturn = 4;
    const goldReturn = 5;
    const cashReturn = 2;

    // Calculate estimated portfolio return
    const portfolioReturn =
        (stocks / 100) * stockReturn +
        (bonds / 100) * bondReturn +
        (gold / 100) * goldReturn +
        (cash / 100) * cashReturn;

    // Starting portfolio
    const startingAmount = 100000;

    // Estimated profit/loss
    const profit =
        startingAmount * (portfolioReturn / 100);

    // Estimated final value
    const finalValue =
        startingAmount + profit;

    // Determine risk level
    let riskLevel;

    if (stocks >= 70) {
        riskLevel = "High";
    } else if (stocks >= 40) {
        riskLevel = "Moderate";
    } else {
        riskLevel = "Lower";
    }

    // Calculate amounts invested in each asset
    const stocksAmount =
        startingAmount * (stocks / 100);

    const bondsAmount =
        startingAmount * (bonds / 100);

    const goldAmount =
        startingAmount * (gold / 100);

    const cashAmount =
        startingAmount * (cash / 100);

    // Update main results
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

    // Update allocation cards
    document.getElementById("stocksAmount").textContent =
        "AED " + stocksAmount.toLocaleString("en-US");

    document.getElementById("bondsAmount").textContent =
        "AED " + bondsAmount.toLocaleString("en-US");

    document.getElementById("goldAmount").textContent =
        "AED " + goldAmount.toLocaleString("en-US");

    document.getElementById("cashAmount").textContent =
        "AED " + cashAmount.toLocaleString("en-US");
    // Update allocation chart
    document.getElementById("stocksBar").style.width =
        stocks + "%";

    document.getElementById("bondsBar").style.width =
        bonds + "%";

    document.getElementById("goldBar").style.width =
        gold + "%";

    document.getElementById("cashBar").style.width =
        cash + "%";


    // Update chart percentages
    document.getElementById("stocksPercent").textContent =
        stocks + "%";

    document.getElementById("bondsPercent").textContent =
        bonds + "%";

    document.getElementById("goldPercent").textContent =
        gold + "%";

    document.getElementById("cashPercent").textContent =
        cash + "%";
    // Success message
    message.textContent =
        "Portfolio allocation successfully calculated.";
}
