// generate color


const generateColor = () => {
  const existingbudgetLength = fetchData("budgets")
    ? fetchData("budgets").length
    : 0;

  return `${existingbudgetLength * 34} 65% 52%  `
};

export const fetchData = (key) => {
   return  JSON.parse(localStorage.getItem(key));
};

// delete item

export const deleteItem = (key) => {
  return localStorage.removeItem(key);
};

// create budget

export const CreateBudget = (budget) => {
   const {newBudget,newBudgetAmount} = budget
  //  burada  yazdığım değerler AddBudgetFrom jsx içindeki inputlarımın name i dir
  const newItem = {
    id: crypto.randomUUID(),
    name:newBudget,
    createdAt: Date.now(),
    amount: Number(newBudgetAmount),
    color:generateColor(),
  };
  const existingbudget = fetchData("budgets") ? fetchData("budgets")  : ""
  
  //eğer ?? kullanırsam aşşağıdaki durumlar geçerli  // içinde yaza
  // eğer fetchData null veya undefined ise "" döner
  // eğer fetchData null veya undefined değilse (örneğin, 0, false,[],{}, '' gibi değerlere sahip olsa bile fetchData  döner
   return localStorage.setItem("budgets",JSON.stringify([...existingbudget, newItem]));
  
};

export const getAllMatchingItems = (values)=>{
   const {category,key,value} = values
   const budgets= fetchData(category);
  
    return budgets.find(budget=>budget[key] === value)
   
   
}

export const CreateExpense = (expense) => {
  const {name,amount,budgetId} = expense
 //  burada  yazdığım değerler AddBudgetFrom jsx içindeki inputlarımın name i dir
 const newItem = {
   id: crypto.randomUUID(),
   name,
   createdAt: Date.now(),
   amount: Number(amount),
   budgetId
 };
  
 const existingExpense = fetchData("expenses") ?? []

 localStorage.setItem("expenses",JSON.stringify([...existingExpense,newItem]));
 
};

export const getTotalSpentByBudget = (budgetId) =>{

  // burada select içindeki option ın value değerini karşılık gelen budget id ile  budgetimden gelen id parametresi
  // eşleşirse ben sen git eşleşen budgetimi bul bu budget için ne kadar harcanmış hesapla diyorum 
  const expenses = fetchData("expenses") ? fetchData("expenses") :[];

  const total_expense = expenses.reduce((acc,expense)=>{

    if(expense.budgetId != budgetId) return acc

     return acc += expense.amount;
  },0)
  return total_expense
}




// Formatting


export const FormatDate =(date)=>{
  const userLanguage = navigator.language
  // navigatör kullanarak kullıcının hangi bölgede ve hangi dili kullandığını anlayıp ona göre formatlıyorum 
  // örneğin farklı bir ülkede önce gün sonra ay gözükebilir  diğer bir ülkede önce ay sonra gün gözükebilir 
  // bunları ayırt edebilmek içi
   return new Date(date).toLocaleDateString(userLanguage);
}


// format currency

export const formatCurrenct = (amount) =>{
  return amount.toLocaleString(undefined,{
    style:"currency",
    currency:"USD"
  })
}