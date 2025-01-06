/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

function AddNewExpense({ budgets }) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state ==="submitting"

  const FormRef = useRef();
  const inputRef = useRef();

  useEffect(()=>{
    if(!isSubmitting){
      // form gönderme işlemim bittiğinde formun içindeki verilerimi temizle diyorum 
       FormRef.current.reset();
       inputRef.current.focus();
    }
   
  },[isSubmitting])

  return (
    <div className="form-wrapper">
      <h3 className="h3">
        Add New
        <span className="accent" style={{ marginLeft: "4px" }}>
          {budgets.length === 1 ? budgets[0].name : ""}
        </span>{" "}
        Expense
      </h3>
      <fetcher.Form ref={FormRef} method="POST"  className="grid-sm">
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              ref={inputRef}
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Coffee"
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input 
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g., 3.50"
              required
            />
            <input type="hidden" name="_action" value={"AddExpense"}  />
          </div>
          <div className="grid-xs" >
            {budgets.length >=0 ? (
              <>
              <label htmlFor="BudgetCategory">Budget Category</label>
               <select name="BudgetCategory" id="BudgetCategory">
                {budgets.map(budget=>(
                    <option key={budget.id} value={budget.id}>{budget.name}</option>
                ))}
               </select>
             </>
            ) :("") }
          </div>
       
        </div>
        <button disabled={isSubmitting} className="btn btn--dark "type="submit">
          {isSubmitting ? <span>Submitting...</span> :<span>Add Expense</span>}
         
        </button>
      </fetcher.Form>
    </div>
  );
}

export default AddNewExpense;
