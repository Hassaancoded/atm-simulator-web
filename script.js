let balance = 0;
const transactionHistory = [];
const correctPIN = "1234"; // Set your desired 4-digit PIN

// Validate the entered PIN
function validatePIN() {
    const enteredPIN = document.getElementById("pinInput").value;
    const pinError = document.getElementById("pin-error");

    if (enteredPIN === correctPIN) {
        document.getElementById("pin-screen").style.display = "none";
        document.getElementById("atm-screen").style.display = "block";
    } else {
        pinError.textContent = "Incorrect PIN. Please try again.";
    }
}

// Display the current balance
function checkBalance() {
    alert(`Total Balance is: ${balance} RS`);
}

// Deposit amount into the account
function deposit() {
    const depositAmount = parseFloat(document.getElementById("depositAmount").value);
    if (depositAmount > 0) {
        balance += depositAmount;
        transactionHistory.push({ type: "Deposit", amount: depositAmount, date: new Date().toLocaleString() });
        updateBalanceDisplay();
        updateTransactionHistory();
        alert(`Deposited: ${depositAmount} RS`);
    } else {
        alert("Enter a valid amount to deposit.");
    }
    document.getElementById("depositAmount").value = "";
}

// Withdraw amount from the account
function withdraw() {
    const withdrawAmount = parseFloat(document.getElementById("withdrawAmount").value);
    if (withdrawAmount > 0 && withdrawAmount <= balance) {
        balance -= withdrawAmount;
        transactionHistory.push({ type: "Withdraw", amount: withdrawAmount, date: new Date().toLocaleString() });
        updateBalanceDisplay();
        updateTransactionHistory();
        alert(`Withdrawn: ${withdrawAmount} RS`);
    } else {
        alert("Invalid amount or insufficient funds.");
    }
    document.getElementById("withdrawAmount").value = "";
}

// Update the balance display
function updateBalanceDisplay() {
    document.getElementById("balance").textContent = balance;
}

// Update and display the transaction history
function updateTransactionHistory() {
    const historyList = document.getElementById("transaction-history");
    historyList.innerHTML = "";
    transactionHistory.forEach((transaction, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${transaction.date} - ${transaction.type}: ${transaction.amount} RS`;
        historyList.appendChild(listItem);
    });
}

// View transaction history
function viewTransactionHistory() {
    if (transactionHistory.length === 0) {
        alert("No transactions yet.");
    } else {
        updateTransactionHistory();
    }
}
