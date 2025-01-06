import {  useLoaderData} from "react-router-dom"
import { fetchData, getAllMatchingItems } from "../Helper";
import DisplayBudget from "../components/DisplayBudget";
import AddNewExpense from "../components/AddNewExpense";
import RecentExpenses from "../components/RecentExpenses";


function BudgetPage() {

    const {budget,all_expenses} = useLoaderData();
 
  
  return (
    <div className="grid-lg" style={{"--accent":budget.color}} >
      <h2 className="h2" >
        <span className="accent">{budget.name} </span>
          Overview
     </h2>
     <div className="flex-lg">
        <DisplayBudget budget={budget} showDelete={true} />
        <AddNewExpense budgets={[budget]} />
     </div>
     {all_expenses? (
        <>
        <h2><span className="accent">{budget.name} expenses </span></h2>
        <RecentExpenses expenses={all_expenses} showBudget ={false} />
        </>
     )
      :("")}
    </div>
  )
}

export default BudgetPage

export const BudgetPageLoader =async ({params})=>{
    console.log(params);
    const budget = await getAllMatchingItems({
        category:"budgets",
        key:"id",
        value:params.id,
      
    });
    // const expenses = await getAllMatchingItems({
    //     category:"expenses",
    //     key:"budgetId",
    //     value:params.id,
       
    // });
    const expenses= fetchData("expenses");
    
    const all_expenses=expenses.filter(expense=>expense.budgetId === params.id)

    // if(!budget){
    //     throw new Error("Aradığınız bütçe bulunamadı :( ")
    // }
    return {budget,all_expenses}
}

