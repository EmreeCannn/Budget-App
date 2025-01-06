

//! helper funsiton 
import { useLoaderData } from "react-router-dom"
import {fetchData} from "../Helper" 
import Intro from "../components/Intro";
import Budgetpage from "../components/Budgetpage";

function Dashboard() {
  const {userName,budgets,expenses} = useLoaderData();

  return (
    <>
      {userName ? <Budgetpage userName={userName} budgets={budgets} expenses={expenses} /> : <Intro/>}
    </>
  )
}

export default Dashboard


//? loader function 

export const DashboardLoader = () =>{
  console.log("dashboard loader çalişti")
  //  form ile action içerinde belirrtiğim route adeğer gönderdikten sonra o routerin loader fonksiyonu yeniden tetiklenir
  const expenses = fetchData("expenses")  ;
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return {userName,budgets,expenses};
}

// Form gönderimi hangi rotaya aitse (action çağrıldığı rota), o rotanın loader fonksiyonu tekrar çalışır.

// Eğer form gönderiminin olduğu rota bir "child route" ise, o rotanın tüm üst rotalarının loader fonksiyonları da çalışır.
// Bu, üst rotaların tutarlılığını sağlamak içindir (örneğin, breadcrumb, layout gibi global veriler üst rotadan yüklenebilir).
