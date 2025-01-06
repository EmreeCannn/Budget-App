/* eslint-disable react/prop-types */

import { useFetcher,Link } from "react-router-dom";
import {  formatCurrenct, getTotalSpentByBudget } from "../Helper"


function DisplayBudget({budget,showDelete=false}){
 const fetcher = useFetcher();
  // const deletebudget = (id) =>{
  //   const budgets = fetchData("budgets");
  //   const filtered_budget = budgets.filter(budget=> budget.id != id)
  //   localStorage.setItem("budgets",JSON.stringify(filtered_budget));
  // }
 
  const spent =getTotalSpentByBudget(budget.id);

  return (
    <div  className="budget" style={{"--accent":budget.color}} >
        <div className="progress-text">
            <h3>{budget.name}</h3>
            <p>{formatCurrenct(budget.amount)} Budgeted</p>
        </div>
        <progress max={budget.amount} value={spent} >
            {/* buraki value değerim expensimden gelen value değeri olmalı  */}
            {/* value ilerlemenin mevcut durumunu  belirler max ise ilerlemenin tamamlanması için gerkeli max değeri */}
        </progress>
        <div className="progress-text">
            <small> {formatCurrenct(spent)} spent</small>
            <small> {formatCurrenct(budget.amount-spent)} remaining</small>
        </div>
        {showDelete ? (
            ""
        )  :(
          <fetcher.Form method="post" >
          <input type="hidden" name="_action" value="Deletebudget" />
          <input type="hidden" name="budgetId" value={budget.id} />
          <button type="submit" className="btn btn--red">delete budget</button>
        </fetcher.Form>
      
        )}
      
    </div>
  )
}

export default DisplayBudget
