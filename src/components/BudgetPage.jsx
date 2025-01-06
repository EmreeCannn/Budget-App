/* eslint-disable react/prop-types */
// component
import { Link} from "react-router-dom";
import AddBudgetForm from "./AddBudgetForm";
import AddNewExpense from "./AddNewExpense";
import DisplayBudget from "./DisplayBudget";
import RecentExpenses from "./RecentExpenses";

function Budgetpage({ userName, budgets,expenses}) {

  return (
    <>
      <h2 style={{ color: "black" }}>
        Welcome Back <span className="accent">{userName}</span>
      </h2>
      <div className="dashboard">
        <div className="grid-sm">
          {budgets ? (
            <div className="grid-lg" >
              <div className="flex-lg" style={{display:"flex"}} >
              <AddBudgetForm />
              <AddNewExpense budgets={budgets} />
              
              {budgets.map(budget=>(
                  <DisplayBudget key={budget.id} budget={budget}/>
               ))}
               { expenses && expenses.length>0 ? 
                <div className="grid-md">
                  <h2>Recent Expenses</h2>
                  <RecentExpenses expenses={expenses.sort((a,b) =>b.createdAt-a.createdAt).slice(0,3)} />
                    {/* slice ile dediğim sadece ilk 3 expensi göster 100 tane expensim olsa bile  */}
                    {expenses.length > 3 ? (
                      <Link className="btn btn--dark" to={"expenses"}>View All expenses</Link>
                    ):("")
                  
                    } 
                </div>
                
               :""}
              </div>
              {/* <button onClick={()=>navigate("expenses")} className="btn btn--dark" >View All expenses</button> */}
            </div>
            
          ) : (
            <AddBudgetForm />
          )}
        </div>
      </div>
    </>
  );
}

export default Budgetpage;
