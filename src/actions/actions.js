import {  redirect } from "react-router-dom";
import { CreateBudget, CreateExpense,deleteItem, fetchData, } from "../Helper";
import { toast } from "react-toastify";


const wait = ()=> new Promise(res=>setTimeout(res,800))

export const LogoutAction = async () => {
  // senkron çalışmasını istememim sebebi  form verilerim gelene kadar bekle onlar gelmeden bir alt satıra geçme diyorum

  deleteItem("userName");
  deleteItem("budgets");
  deleteItem("expenses");
  toast.success("you have deleted your account");

  return redirect("/");
  //  beni ana sayfama geri götür diyorum
};

export const DashboardAction = async ({ request }) => {
  console.log("dashboard action çalıştı");
  // bu url ime 2 tane action geldi peki ben bunları nasıl ayırt edicem
  await wait();
  const data = await request.formData();
  // request.formData() çağrıldığında, gönderilen formdaki her bir name ve value çiftini içerir
   console.log(data);
   console.log( Object.fromEntries(data.entries()));
  //  object.Fromentries diyerek  inputlarımın namesine karşılık gelen value değerlerini key value şeklinde bana döndür diyorum
  const { _action, ...values } = Object.fromEntries(data.entries());
  // name i _action dışındaki inputlarımın nameni ve bu name ye karşılık gelen içine yazdığım değerleri ...values de tutuyorum
  // console.log(values);
  // console.log(_action);
  // name i userName olan inputun value değerini bana getir diyorum
  if (_action == "NewUser") {
    // eğer name i _action olan inputumun valuesi "NewUser" ise diyorum 
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`welcome ${values.userName}`);
    } catch (e) {
      throw new Error("Ther Was a problem cerating your account", e);
    }
  }
  if(_action =="NewBudget"){
    try{
        CreateBudget(values);

        return toast.success("budget succesfuly created")
    } catch(e){
        throw new Error("There was a problem creating your budget",e)
    }
  }
  if(_action =="AddExpense"){
    try{
      console.log(values.BudgetCategory);
       CreateExpense({
         name:values.newExpense,
         amount:values.newExpenseAmount,
         budgetId:values.BudgetCategory
       })

      
       

      return toast.success(`Expense ${values.newExpense} created`);
    }catch{
      throw new Error("There Was a problem Creating Your Budget")
    }
  }
  if(_action =="DeleteExpense"){
    try{
      const expenses = fetchData("expenses");
      const filtered_expenses = expenses.filter(expense=>expense.id != values.expenseId)
      localStorage.setItem("expenses",JSON.stringify(filtered_expenses));
      return toast.error("expense deleted")
    }catch(e){
      throw new Error("There was a problem deleting your expense",e)
    }
  }
  if(_action =="Deletebudget"){
    // expenslerimi alıp map ile dönüp daha sonra budgetId si  sildiğim budgetin id si ile aynı olan expenslerimi
    // local storageden silmem kazım 

    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    const filtered_expenses= expenses.filter(expense=>expense.budgetId != values.budgetId );
    console.log(filtered_expenses);
    const filtered_budgets = budgets.filter(budget=> budget.id != values.budgetId )
    localStorage.setItem("budgets",JSON.stringify(filtered_budgets));
    localStorage.setItem("expenses",JSON.stringify(filtered_expenses));
    redirect("/");
    return toast.error("budget deleted");
  }
};

// export const  ShowAllExpenses = async ({request}) =>{
//   const data = await request.formData()
//   const {_action,...values} = Object.fromEntries(data.entries());
//   if(_action =="DeleteExpense"){
//     try{
//       const expenses = fetchData("expenses");
//       const filtered_expenses = expenses.filter(expense=>expense.id != values.expenseId)
//       localStorage.setItem("expenses",JSON.stringify(filtered_expenses));
//       return toast.error("expense deleted")
//     }catch(e){
//       throw new Error("There was a problem deleting your expense",e)
//     }
//   }
// }