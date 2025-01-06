/* eslint-disable react/prop-types */


import ExpenseItem from "./ExpenseItem";

function RecentExpenses({ expenses,showBudget =true }) {
  

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {["Name", "Amount", "Date", showBudget ? "BudgetName" :"" , ""].map((i, index) => (
              <th key={index}>{i}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses
            ? expenses.map((expense) => (
                <tr key={expense.id}>
                  <ExpenseItem expense={expense} showBudget={showBudget} />
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </div>
  );
}

export default RecentExpenses;
