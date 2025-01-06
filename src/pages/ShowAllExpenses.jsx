import { useLoaderData } from "react-router-dom"
import { fetchData } from "../Helper"
import RecentExpenses from "../components/RecentExpenses";


function ShowAllExpenses() {

  const expenses = useLoaderData();
  console.log(expenses)
  return (
    <div className="grid-lg" >
      <h2>All Expenses</h2>
      { expenses ? (
        <>
        <small>({expenses.length} total )</small>
        <RecentExpenses expenses={expenses} />
        </>
      ) :("") }
    </div>
  )
}

export default ShowAllExpenses


export const ShowAllExpenseLoader = () =>{

  const fetch_expenses = fetchData("expenses");
  return fetch_expenses
}