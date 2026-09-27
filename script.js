const stocksInput = document.getElementById("stocks");
const bondsInput = document.getElementById("bonds");
const goldInput = document.getElementById("gold");
const cashInput = document.getElementById("cash");

const conservativeButton = document.getElementById("conservativeButton");
const balancedButton = document.getElementById("balancedButton");
const growthButton = document.getElementById("growthButton");
const calculateButton = document.getElementById("calculateButton");

const languageButton = document.getElementById("languageButton");

let currentLanguage = "en";


// ===============================
// LANGUAGE SYSTEM
// ===============================

function updateLanguage() {
    const elements = document.querySelectorAll("[data-en][data-ar]");

    elements.forEach((element) => {
        element.textContent = currentLanguage === "en"
            ? element.getAttribute("data-en")
            : element.getAttribute("data-ar");
    });

    if (currentLanguage === "en") {
        document.documentElement.lang = "en";
        document.body.classList.remove("rtl");
        languageButton.textContent = "العربية";
    } else {
        document.documentElement.lang = "ar";
        document.body.classList.add("rtl");
        languageButton.textContent = "English";
    }
}


languageButton.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "ar" : "en";
    updateLanguage();
});


// ===============================
// PORTFOLIO PRESETS
// ===============================

conservativeButton.addEventListener("click", () => {
    stocksInput.value = 20;
    bondsInput.value = 40;
    goldInput.value = 10;
    cashInput.value = 30;

    calculatePortfolio();
});


balancedButton.addEventListener("click", () => {
    stocksInput.value = 50;
    bondsInput.value = 25;
    goldInput.value = 10;
    cashInput.value = 15;

    calculatePortfolio();
});


growthButton.addEventListener("click", () => {
    stocksInput.value = 70;
    bondsInput.value = 15;
    goldInput.value = 10;
    cashInput.value = 5;

    calculatePortfolio();
});


calculateButton.addEventListener("click", calculatePortfolio);


// ===============================
// PORTFOLIO CALCULATOR
// ===============================

function calculatePortfolio() {

    const stocks = Number(stocksInput.value);
    const bonds = Number(bondsInput.value);
    const gold = Number(goldInput.value);
    const cash = Number(cashInput.value);

    const totalAllocation = stocks + bonds + gold + cash;

    const message = document.getElementById("allocationMessage");

    // Validate allocation

    if (
        stocks < 0 ||
        bonds < 0 ||
        gold < 0 ||
        cash < 0
    ) {
        message.textContent = currentLanguage === "en"
            ? "Percentages cannot be negative."
            : "لا يمكن أن تكون النسب مئوية سالبة.";

        return;
    }


    if (totalAllocation !== 100) {

        message.textContent = currentLanguage === "en"
            ? `Your allocation must equal 100%. Current total: ${totalAllocation}%.`
            : `يجب أن يكون مجموع التوزيع 100٪. المجموع الحالي: ${totalAllocation}٪.`;

        return;
    }


    // Fictional educational return assumptions

    const stockReturn = 8;
    const bondReturn = 4;
    const goldReturn = 5;
    const cashReturn = 2;

    const startingAmount = 100000;


    // Weighted portfolio return

    const portfolioReturn =
        (stocks / 100) * stockReturn +
        (bonds / 100) * bondReturn +
        (gold / 100) * goldReturn +
        (cash / 100) * cashReturn;


    const profit = startingAmount * (portfolioReturn / 100);
    const finalValue = startingAmount + profit;


    // Risk level

    let riskLevel;

    if (stocks >= 70) {
        riskLevel = currentLanguage === "en"
            ? "High"
            : "مرتفع";
    } else if (stocks >= 40) {
        riskLevel = currentLanguage === "en"
            ? "Moderate"
            : "متوسط";
    } else {
        riskLevel = currentLanguage === "en"
            ? "Lower"
            : "أقل";
    }


    // ===============================
    // UPDATE RESULTS
    // ===============================

    document.getElementById("portfolioValue").textContent =
        `AED ${finalValue.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;


    document.getElementById("portfolioReturn").textContent =
        `${portfolioReturn.toFixed(2)}%`;


    document.getElementById("portfolioProfit").textContent =
        `AED ${profit.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;


    document.getElementById("riskLevel").textContent = riskLevel;


    // ===============================
    // ALLOCATION CHART
    // ===============================

    document.getElementById("stocksBar").style.width = `${stocks}%`;
    document.getElementById("bondsBar").style.width = `${bonds}%`;
    document.getElementById("goldBar").style.width = `${gold}%`;
    document.getElementById("cashBar").style.width = `${cash}%`;


    document.getElementById("stocksPercent").textContent = `${stocks}%`;
    document.getElementById("bondsPercent").textContent = `${bonds}%`;
    document.getElementById("goldPercent").textContent = `${gold}%`;
    document.getElementById("cashPercent").textContent = `${cash}%`;


    // ===============================
    // ALLOCATION AMOUNTS
    // ===============================

    document.getElementById("stocksAmount").textContent =
        `AED ${(startingAmount * stocks / 100).toLocaleString("en-US")}`;

    document.getElementById("bondsAmount").textContent =
        `AED ${(startingAmount * bonds / 100).toLocaleString("en-US")}`;

    document.getElementById("goldAmount").textContent =
        `AED ${(startingAmount * gold / 100).toLocaleString("en-US")}`;

    document.getElementById("cashAmount").textContent =
        `AED ${(startingAmount * cash / 100).toLocaleString("en-US")}`;


    // ===============================
    // 5-YEAR COMPOUND GROWTH
    // ===============================

    const growthRate = portfolioReturn / 100;

    document.getElementById("growthRate").textContent =
        `${portfolioReturn.toFixed(2)}%`;


    const yearlyValues = [];

    for (let year = 1; year <= 5; year++) {

        const value =
            startingAmount * Math.pow(1 + growthRate, year);

        yearlyValues.push(value);

        document.getElementById(`year${year}`).textContent =
            `AED ${value.toLocaleString("en-US", {
                maximumFractionDigits: 0
            })}`;
    }


    // ===============================
    // GROWTH CHART
    // ===============================

    const maxGrowth = yearlyValues[4];

    yearlyValues.forEach((value, index) => {

        const percentage =
            (value / maxGrowth) * 100;

        document.getElementById(`growthBar${index + 1}`)
            .style.height = `${percentage}%`;
    });


    // Success message

    message.textContent = currentLanguage === "en"
        ? "Portfolio calculated successfully."
        : "تم حساب المحفظة بنجاح.";
}


// ===============================
// INITIAL CALCULATION
// ===============================

calculatePortfolio();


// ===============================
// INITIAL LANGUAGE
// ===============================

updateLanguage();
