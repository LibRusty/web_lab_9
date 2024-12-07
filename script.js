class Calculator {
    constructor() {
        this.currentValue = "0";
        this.fullExpression = "";
        this.displayElement = document.querySelector(".calc-display__content");
        this.initializeButtons();
        this.updateDisplay();
    }

    initializeButtons() {
        document.querySelectorAll(".calc-buttons__key").forEach(button => {
            button.addEventListener("click", () => {
                const value = button.dataset.value;
                this.handleInput(value);
            });
        });
    }

    handleInput(value) {
        if (!isNaN(value) || value === ".") {
            this.appendNumber(value);
        } else if (["+", "-", "*", "/"].includes(value)) {
            this.selectOperator(value);
        } else if (value === "=") {
            this.calculate();
        } else if (value === "C") {
            this.reset();
        } else if (value === "<-") {
            this.deleteLast();
        }
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === "." && this.currentValue.includes(".")) {
            return;
        }
        if (this.currentValue === "0" && number !== ".") {
            this.currentValue = number;
        } else {
            this.currentValue += number;
        }
        this.fullExpression += number;
    }

    selectOperator(operator) {
        if (this.currentValue === "0" && operator !== "-") return;
        if (["+", "-", "*", "/"].includes(this.fullExpression.slice(-1))) {
            this.fullExpression = this.fullExpression.slice(0, -1) + operator;
        } else {
            this.fullExpression += operator;
        }
        this.currentValue = `<span style="color: gray">${this.currentValue}</span>${operator}`;
    }

    calculate() {
        try {
            const result = eval(this.fullExpression);
            this.currentValue = result.toString();
            this.fullExpression = result.toString();
        } catch {
            this.currentValue = "Error";
            this.fullExpression = "";
        }
    }

    reset() {
        this.currentValue = "0";
        this.fullExpression = "";
    }

    deleteLast() {
        if (this.fullExpression.length > 0) {
            const lastChar = this.fullExpression.charAt(this.fullExpression.length - 1);
            if (["+", "-", "*", "/"].includes(lastChar)) {
                this.currentValue = this.currentValue.slice(0, -1) || "0";
                this.fullExpression = this.fullExpression.slice(0, -1);
            } else {
                this.currentValue = this.currentValue.slice(0, -1) || "0";
                this.fullExpression = this.fullExpression.slice(0, -1) || "0";
            }
        }
    }

    updateDisplay() {
        this.displayElement.innerHTML = this.currentValue;
    }
}

new Calculator();
