let application = new Application();
let serviceSelectionCounter = 0; // Increment every time the service data is updated

function saveServiceData(checkbox) {
    serviceSelectionCounter++;
    application.service = checkbox.id;

    /* Assign default values when first selecting a service */
    if (serviceSelectionCounter == 1) {

        application.creditAmount = 1000;
        if (["päikesepaneelid", "võrguvaba"].includes(application.service)) {
            application.creditAmount = 5000;
        }
    }

    /* Assign the most popular values at first and later change them depending on the credit amount */
    application.periodDefault = 48;

    if (application.service == "päikesepaneelid") {
        application.periodDefault = 60;
        application.periodMin = 6;
        application.periodMax = 120;
        application.interest = 7.9;
        application.contractFee = 50;
        application.managementFee = 1;
    } else if (application.service == "soojuspumbad") {
        application.periodMin = 6;
        application.periodMax = 72;
        application.contractFee = 20;
        application.managementFee = 1;
        if (application.creditAmount >= 300 && application.creditAmount <= 1999) {
            application.interest = 7.9;
            application.contractFee = 30;
        } else if (application.creditAmount >= 2000 && application.creditAmount <= 5999) {
            application.interest = 6.5;
        } else if (application.creditAmount >= 6000 && application.creditAmount <= 25000) {
            application.periodMax = 120;
            application.interest = 5.9;
        }
    } else if (application.service == "tööd") {
        application.periodMin = 6;
        application.periodMax = 72;
        application.contractFee = 20;
        application.managementFee = 1;
        if (application.creditAmount >= 300 && application.creditAmount <= 999) {
            application.interest = 9.9;
            application.contractFee = 30;
        } else if (application.creditAmount >= 1000 && application.creditAmount <= 1999) {
            application.interest = 8.9;
        } else if (application.creditAmount >= 2000 && application.creditAmount <= 5999) {
            application.interest = 7.5;
            application.managementFee = 0;
        } else if (application.creditAmount >= 6000 && application.creditAmount <= 25000) {
            application.periodMax = 120;
            application.interest = 6.9;
            application.managementFee = 0;
        }
    } else if (application.service == "võrguvaba") {
        application.periodDefault = 60;
        application.periodMin = 6;
        application.periodMax = 72;
        application.contractFee = 20;
        application.managementFee = 0;
        if (application.creditAmount >= 300 && application.creditAmount <= 1999) {
            application.interest = 7.9;
            application.contractFee = 30;
        } else if (application.creditAmount >= 2000 && application.creditAmount <= 5999) {
            application.interest = 6.5;
        } else if (application.creditAmount >= 6000 && application.creditAmount <= 25000) {
            application.periodMax = 120;
            application.interest = 5.9;
        }
    } else if (application.service == "elektriautod") {
        application.periodMin = 6;
        application.periodMax = 72;
        application.managementFee = 2;
        if (application.creditAmount >= 300 && application.creditAmount <= 1999) {
            application.interest = 5.9;
            application.contractFee = 50;
        } else if (application.creditAmount >= 2000 && application.creditAmount <= 5999) {
            application.interest = 4.5;
            application.contractFee = 40;
        } else if (application.creditAmount >= 6000 && application.creditAmount <= 25000) {
            application.periodMax = 120;
            application.interest = 3.9;
            application.contractFee = 30;
        }
    }

    if (serviceSelectionCounter == 1) {
        application.setPeriodToDefault();
        application.setFullCostValue(application.creditAmount); // fullCost = creditAmount + deposit, but deposit = 0 by default
        displayFullCost();
    }

    application.calculateMonthlyPayment();
    displayMonthlyPayment();

    generateDropdownContent();
    displayData();
}

function calculateMaxFullCost() {
    let maxFullCost = parseInt(25000) + parseInt(application.deposit);
    gid("full-cost").max = maxFullCost;
    gid("max").innerHTML = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(maxFullCost);
}

function generateDropdownContent() {
    gid("dropdown-content").innerHTML = "";
    for (i = application.periodMin; i <= application.periodMax; i += 6) {
        gid("dropdown-content").innerHTML += '<button value="' + i + '" class="dropdown-button" onclick="savePeriod(this)">' + i + ' kuud</button>';
    }
}

function saveFullCost() {
    if (application.service == null) {
        application.setFullCostValue(gid("full-cost").min);
        alert("Palun vali teenus!");
    } else {
        application.fullCost = gid("full-cost").value;
        displayFullCost();

        application.calculateCreditAmount();
        application.calculateMonthlyPayment();

        /* Check if changing the full cost made the credit amount too small. If yes, decrease the deposit value and
        recalculate the credit amount. */
        if (application.creditAmount < gid("full-cost").min) {
            application.decreaseDeposit();
            application.calculateCreditAmount();
            application.calculateMonthlyPayment();
        }

        /* Check if the current period is too long for the range of the credit amount. If yes, reset it to default. */
        if (application.period > application.periodMax) {
            application.setPeriodToDefault();
            displayPeriod();
        }

        saveServiceData(gid(application.service));
    }
}

function savePeriod(dropdownSelection) {
    application.period = dropdownSelection.value;
    toggleDropdown();
    displayPeriod();

    application.calculateMonthlyPayment();
    displayMonthlyPayment();
}

function saveDeposit() {
    if (application.service == null) {
        gid("deposit").value = gid("deposit").min;
        alert("Palun vali teenus!");
    } else {

        /* If the input is cleared, set deposit value to 0 */
        if (gid("deposit").value == "") {
            application.deposit = 0;
        } else {
            application.deposit = gid("deposit").value;
        }

        application.calculateCreditAmount();
        application.calculateMonthlyPayment();

        /* Check if changing the deposit value made the credit amount too small. If yes, decrease the deposit value and
        recalculate the credit amount. */
        if (application.creditAmount < gid("full-cost").min) {
            application.decreaseDeposit();
            application.calculateCreditAmount();
            application.calculateMonthlyPayment();
        }

        calculateMaxFullCost();
        saveServiceData(gid(application.service));
    }
}

function displayFullCost() {
    gid("value").innerHTML = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(application.fullCost);
}

function displayPeriod() {
    gid("period-selection").innerHTML = application.period + " kuud";
    gid("period").innerHTML = application.period + " kuud";
}

function displayMonthlyPayment() {
    gid("monthly-payment").innerHTML = new Intl.NumberFormat('he-HE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(application.monthlyPayment);
}

function displayData() {
    displayPeriod();
    displayMonthlyPayment();
    gid("interest").innerHTML = application.interest + " %";
    gid("contract-fee").innerHTML = new Intl.NumberFormat('he-HE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(application.contractFee);
    gid("management-fee").innerHTML = new Intl.NumberFormat('he-HE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(application.managementFee);
    gid("credit-amount").innerHTML = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(application.creditAmount);
}

function gid(elem) {
    return document.getElementById(elem);
}
