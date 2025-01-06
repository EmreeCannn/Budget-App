import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom"

// actions  
import {DashboardAction, LogoutAction} from "./actions/actions"

// tostify message
import { ToastContainer,} from 'react-toastify';
// Layoust
import MainLayout, { MainLayoutLoader } from './Layout/MainLayout';
// pages
import Dashboard, { DashboardLoader } from './pages/Dashboard';
import Error from './pages/Error';
import ShowAllExpenses, { ShowAllExpenseLoader } from './pages/ShowAllExpenses';
import BudgetPage, { BudgetPageLoader } from './pages/BudgetPage';
function App() {

  const route= createBrowserRouter([
    {
      path:"/",
      element:<MainLayout/>,
      loader: MainLayoutLoader ,
      errorElement:<Error/>,
      children:[
      {
         index:true,
         element:<Dashboard/>,
         errorElement: <Error/>,
         loader: DashboardLoader,
         action: DashboardAction
      },
      {
        path:"budget/:id",
        element: <BudgetPage/>,
        loader: BudgetPageLoader,
        errorElement:<Error/>,
        action:DashboardAction
      },
      {
        path:"logout",
        action: LogoutAction,
        element:<p>bu rotadayım</p>
        // burada MainLayout içinde yer alan formumun action kısmında logout routeni işaret ettiğim için 
        // formum içindeki verilerime buradan ulaşabilirim
      },
      {
        path:"expenses",
        element: <ShowAllExpenses/>,
        loader: ShowAllExpenseLoader,
        action:DashboardAction
      }
     ]
    },
  
  ])

  return (
    <>

     <RouterProvider router={route} />
     <ToastContainer/>
    </>
  )
}

export default App
