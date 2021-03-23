class Application {

    constructor() {
        this.deposit = 0;
        this.service = null;
        this.fullCost = null;
        this.periodDefault = null;
        this.periodMin = null;
        this.periodMax = null;
        this.period = null;
        this.interest = null;
        this.contractFee = null;
        this.managementFee = null;
        this.creditAmount = null;
        this.monthlyPayment = null;
    }

    setFullCostValue(value) {
        this.fullCost = value;
        gid("full-cost").value = value;
    }

    setDepositValue(value) {
        this.deposit = value;
        gid("deposit").value = value;
    }

    decreaseDeposit() {
        if ((gid("full-cost").min - this.creditAmount) <= this.deposit) { // Check that the deposit doesn't become negative
            this.deposit -= (gid("full-cost").min - this.creditAmount);
        }
        this.setDepositValue(this.deposit);
    }

    setPeriodToDefault() {
        this.period = this.periodDefault;
    }

    calculateCreditAmount() {
        this.creditAmount = this.fullCost - this.deposit;
    }

    calculateMonthlyPayment() {
        this.monthlyPayment = (this.creditAmount * (1 + this.interest / 100) + this.contractFee) / this.period + this.managementFee;
    }
}