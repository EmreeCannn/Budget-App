/* eslint-disable react/prop-types */
import { Link, useFetcher } from "react-router-dom";
import { formatCurrenct, FormatDate, getAllMatchingItems } from "../Helper";

function ExpenseItem({ expense,showBudget }) {
  const fetcher = useFetcher();
  // const isSubmitting = fetcher.state === "submitting";

  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  });

  console.log(budget);

  // const getBudget = (expenseId) => {
    // const filtered_budget = budgets.find((budget) => budget.id == expenseId);
    // return filtered_budget;
    // {getBudget(expense.budgetId).name}
  // };
  return (
    <>
    {budget ?
    <>
     <td>{expense.name}</td>
     <td>{formatCurrenct(expense.amount)}</td>
     <td>{FormatDate(expense.createdAt)}</td>
     {showBudget ? (
      <td>
      <Link
        style={{ "--accent": budget.color }}
        to={`/budget/${budget.id}`}
        className="btn btn--red"
      >
        {budget.name}
      </Link>
    </td>
     ) :"" }
     
     <td>
       <fetcher.Form method="POST" >
         <input type="hidden" name="_action" value="DeleteExpense" />
         <input type="hidden" name="expenseId" value={expense.id} />
         <button type="submit" className="btn btn--red" >X</button>
       </fetcher.Form>
     </td>
     </>
      :"" }
     
    </>
  );
}

export default ExpenseItem;
