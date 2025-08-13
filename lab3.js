// Lab 3
// Banking System
// Develop a system serving a bank including functionalities dealing with accounts and transactions
// Write a Function to Create a new bank account with validation for required fields.
// Rules:
// Must have firstName, lastName, initialDeposit (min $50)
// Generate a unique 10-digit account number
// Example Input:
// {
//   firstName: "John",
//   lastName: "Doe",
//   initialDeposit: 100
// }
// ​
// Example Output:
// {
//   accountNumber: "1000000001",
//   firstName: "John",
//   lastName: "Doe",
//   balance: 100,
//   createdAt: "2023-11-15T10:30:00Z"
// }
// ​
// Solution:
function createBankAccount(customerData) {
  if (!customerData.firstName || !customerData.lastName) {
    throw new Error("First and last name are required");
  }
  if (customerData.initialDeposit < 50) {
    throw new Error("Minimum initial deposit is $50");
  }

  const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  
  return {
    accountNumber,
    firstName: customerData.firstName,
    lastName: customerData.lastName,
    balance: customerData.initialDeposit,
    createdAt: new Date().toISOString()
  };
}
​
// Write the Function to Deposit money into an account with transaction recording.
// Rules:
// Amount must be positive
// Update balance and transaction history
// Example Input:
// (account, 200)
// ​
// Where account is:
// {
//   accountNumber: "1000000001",
//   balance: 100,
//   transactions: []
// }
// ​
// Example Output:
// {
//   accountNumber: "1000000001",
//   balance: 300,
//   transactions: [{
//     type: "DEPOSIT",
//     amount: 200,
//     date: "2023-11-15T10:35:00Z",
//     newBalance: 300
//   }]
// }
// ​
// Solution:
function processDeposit(account, amount) {
  if (amount <= 0) throw new Error("Deposit amount must be positive");

  account.balance += amount;
  account.transactions.push({
    type: "DEPOSIT",
    amount,
    date: new Date().toISOString(),
    newBalance: account.balance
  });

  return account;
}
​
// Write a Function to Process withdrawals with overdraft protection.
// Rules:
// Reject if insufficient funds
// $5 penalty for overdraft attempts
// Example Input:
// (account, 50)
// ​
// Where account is:
// {
//   accountNumber: "1000000001",
//   balance: 100,
//   transactions: []
// }
// ​
// Example Output (Success):
// {
//   accountNumber: "1000000001",
//   balance: 50,
//   transactions: [{
//     type: "WITHDRAWAL",
//     amount: 50,
//     date: "2023-11-15T10:40:00Z",
//     newBalance: 50
//   }]
// }
// ​
// Example Output (Overdraft):
// {
//   accountNumber: "1000000001",
//   balance: 95,// $100 - $5 penaltytransactions: [{
//     type: "OVERDRAFT_ATTEMPT",
//     amount: 150,
//     date: "2023-11-15T10:45:00Z",
//     penalty: 5
//   }]
// }
// ​
// Solution:
function processWithdrawal(account, amount) {
  if (amount <= 0) throw new Error("Withdrawal amount must be positive");

  if (account.balance >= amount) {
    account.balance -= amount;
    account.transactions.push({
      type: "WITHDRAWAL",
      amount,
      date: new Date().toISOString(),
      newBalance: account.balance
    });
  } else {
    account.balance -= 5; // Overdraft penalty
    account.transactions.push({
      type: "OVERDRAFT_ATTEMPT",
      amount,
      date: new Date().toISOString(),
      penalty: 5
    });
    throw new Error("Insufficient funds - $5 penalty applied");
  }

  return account;
}
​
// Write a function to Transfer money between accounts with validation.
// Rules:
// Both accounts must exist
// No negative transfers
// Transaction recorded in both accounts
// Example Input:
// (fromAccount, toAccount, 75)
// ​
// Where accounts are:
// const fromAccount = {
//   accountNumber: "1000000001",
//   balance: 100
// };

// const toAccount = {
//   accountNumber: "1000000002",
//   balance: 200
// };
// ​
// Example Output:
// [
//   {// From AccountaccountNumber: "1000000001",
//     balance: 25,
//     transactions: [{
//       type: "TRANSFER_OUT",
//       to: "1000000002",
//       amount: 75,
//       date: "2023-11-15T11:00:00Z"
//     }]
//   },
//   {// To AccountaccountNumber: "1000000002",
//     balance: 275,
//     transactions: [{
//       type: "TRANSFER_IN",
//       from: "1000000001",
//       amount: 75,
//       date: "2023-11-15T11:00:00Z"
//     }]
//   }
// ]
// ​
// Solution:
function transferFunds(fromAccount, toAccount, amount) {
  if (amount <= 0) throw new Error("Transfer amount must be positive");
  if (fromAccount.balance < amount) throw new Error("Insufficient funds");

  // Debit from account
  fromAccount.balance -= amount;
  fromAccount.transactions.push({
    type: "TRANSFER_OUT",
    to: toAccount.accountNumber,
    amount,
    date: new Date().toISOString()
  });

  // Credit to account
  toAccount.balance += amount;
  toAccount.transactions.push({
    type: "TRANSFER_IN",
    from: fromAccount.accountNumber,
    amount,
    date: new Date().toISOString()
  });

  return [fromAccount, toAccount];
}
​
// Write a Function to Calculate monthly interest (compound) for savings accounts.
// Rules:
// 2% annual interest (0.167% monthly)
// Applied only if balance > $500
// Example Input:
// {
//   accountNumber: "1000000001",
//   balance: 1000,
//   type: "SAVINGS"
// }
// ​
// Example Output:
// {
//   accountNumber: "1000000001",
//   balance: 1001.67,// 1000 * (1 + 0.00167)transactions: [{
//     type: "INTEREST",
//     amount: 1.67,
//     date: "2023-11-30T23:59:59Z"
//   }]
// }
// ​
// Solution:
function calculateMonthlyInterest(account) {
  if (account.type !== "SAVINGS" || account.balance < 500) return account;

  const interest = account.balance * 0.00167; // 0.167% monthly
  account.balance += interest;
  account.transactions.push({
    type: "INTEREST",
    amount: parseFloat(interest.toFixed(2)),
    date: new Date().toISOString()
  });

  return account;
}
​
// Write a Function to Retrieve transactions within a date range.
// Rules:
// Support filtering by type (deposit/withdrawal/etc.)
// Sort by date descending
// Example Input:
// (account, {
//   startDate: "2023-11-01",
//   endDate: "2023-11-30",
//   type: "DEPOSIT"
// })
// ​
// Where account has:
// transactions: [
//   { type: "DEPOSIT", amount: 200, date: "2023-11-15T10:00:00Z" },
//   { type: "WITHDRAWAL", amount: 50, date: "2023-11-20T14:00:00Z" }
// ]
// ​
// Example Output:
// [
//   {
//     type: "DEPOSIT",
//     amount: 200,
//     date: "2023-11-15T10:00:00Z"
//   }
// ]
// ​
// Solution:
function getFilteredTransactions(account, filters = {}) {
  let results = account.transactions;

  // Date filtering
  if (filters.startDate) {
    results = results.filter(t => new Date(t.date) >= new Date(filters.startDate));
  }
  if (filters.endDate) {
    results = results.filter(t => new Date(t.date) <= new Date(filters.endDate));
  }

  // Type filtering
  if (filters.type) {
    results = results.filter(t => t.type === filters.type);
  }

  // Sorting
  return results.sort((a, b) => new Date(b.date) - new Date(a.date));
}
​
// Write a function to manage account freeze/unfreeze , toggle account status with security checks.
// Rules:
// Require manager approval for freeze
// Prevent transactions on frozen accounts
// Example Input:
// (account, "FREEZE", "manager123")
// ​
// Where account is:
// {
//   accountNumber: "1000000001",
//   status: "ACTIVE"
// }
// ​
// Example Output:
// {
//   accountNumber: "1000000001",
//   status: "FROZEN",
//   statusHistory: [{
//     action: "FREEZE",
//     by: "manager123",
//     date: "2023-11-15T12:00:00Z"
//   }]
// }
// ​
// Solution:
function setAccountStatus(account, action, authorizedBy) {
  if (!["FREEZE", "UNFREEZE"].includes(action)) {
    throw new Error("Invalid action - must be FREEZE or UNFREEZE");
  }

  if (action === "FREEZE" && !authorizedBy.startsWith("manager")) {
    throw new Error("Only managers can freeze accounts");
  }

  account.status = action === "FREEZE" ? "FROZEN" : "ACTIVE";
  
  account.statusHistory = account.statusHistory || [];
  account.statusHistory.push({
    action,
    by: authorizedBy,
    date: new Date().toISOString()
  });

  return account;
}
​
// Write a function to Enforce $500 daily withdrawal limit.
// Rules:
// Calculate sum of today's withdrawals
// Reject if limit exceeded
// Example Input:
// (account, 300)
// ​
// Where account has:
// transactions: [
//   { type: "WITHDRAWAL", amount: 250, date: "2023-11-15T09:00:00Z" }
// ]
// ​
// Example Output (Success):
// {
//   accountNumber: "1000000001",
//   balance: 450,// 1000 - 250 - 300transactions: [
//     ...existingTransactions,
//     {
//       type: "WITHDRAWAL",
//       amount: 300,
//       date: "2023-11-15T14:00:00Z",
//       newBalance: 450
//     }
//   ]
// }
// ​
// Example Output (Failure):
// Error: Daily withdrawal limit exceeded ($500 max)
// ​
// Solution:
function processLimitedWithdrawal(account, amount) {
  const today = new Date().toISOString().split('T')[0];
  const todaysWithdrawals = account.transactions
    .filter(t => t.type === "WITHDRAWAL" && t.date.startsWith(today))
    .reduce((sum, t) => sum + t.amount, 0);

  if (todaysWithdrawals + amount > 500) {
    throw new Error(`Daily withdrawal limit exceeded ($500 max)`);
  }

  return processWithdrawal(account, amount); // Reuse withdrawal logic
}
​
// Write a function to validate password
// Rules:
// Minimum 12 characters
// Require uppercase, lowercase, number, and special character
// No common passwords
// Example Input:
// validatePassword("BankAccount123!")
// ​
// Example Output (Success):
// { valid: true }
// ​
// Example Output (Failure):
// {
//   valid: false,
//   reasons: [
//     "Password must be at least 12 characters",
//     "Password must contain a special character"
//   ]
// }
// ​
// Solution:
function validatePassword(password) {
  const errors = [];
  const commonPasswords = ["password", "123456", "qwerty"];

  if (password.length < 12) {
    errors.push("Password must be at least 12 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("Password must contain a special character");
  }
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push("Password is too common");
  }

  return {
    valid: errors.length === 0,
    reasons: errors
  };
}
​
// Write a function to check and detect suspicious activities, and flags unusual transaction patterns
// Rules:
// Alert on transactions >$10,000
// Alert on rapid sequence of small transactions (3+ in 5 minutes)
// Example Input:
// checkForSuspiciousActivity(account)
// ​
// Where account has:
// transactions: [
//   { type: "WITHDRAWAL", amount: 300, date: "2023-11-15T10:00:00Z" },
//   { type: "WITHDRAWAL", amount: 300, date: "2023-11-15T10:02:00Z" },
//   { type: "WITHDRAWAL", amount: 300, date: "2023-11-15T10:04:00Z" },
//   { type: "TRANSFER_OUT", amount: 15000, date: "2023-11-15T09:00:00Z" }
// ]
// ​
// Example Output:
// {
//   isSuspicious: true,
//   alerts: [
//     "High-value transaction: $15000 transfer",
//     "Rapid withdrawals: 3 transactions within 4 minutes"
//   ]
// }
// ​
// Solution:
function checkForSuspiciousActivity(account) {
  const alerts = [];
  const withdrawals = account.transactions
    .filter(t => t.type === "WITHDRAWAL")
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Check for high-value transactions
  account.transactions.forEach(t => {
    if (t.amount > 10000) {
      alerts.push(`High-value transaction: $${t.amount} ${t.type.toLowerCase()}`);
    }
  });

  // Check for rapid withdrawals
  for (let i = 2; i < withdrawals.length; i++) {
    const timeDiff = (new Date(withdrawals[i].date) - new Date(withdrawals[i-2].date)) / (1000 * 60);
    if (timeDiff < 5) {
      alerts.push(`Rapid withdrawals: ${i+1} transactions within ${Math.ceil(timeDiff)} minutes`);
      break;
    }
  }

  return {
    isSuspicious: alerts.length > 0,
    alerts
  };
}