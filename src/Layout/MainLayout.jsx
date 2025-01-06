import { Outlet, useLoaderData } from "react-router-dom";

//! helper funsiton
 import { fetchData } from "../Helper";

// assets
import wawe from "../assets/wave.svg"

// components
import Nav from "../components/Nav";

function MainLayout() {
  const userName = useLoaderData();
  console.log(userName);
  
  return (
    <div className="layout" >
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wawe} alt="wawe" />
    </div>
  );
}

export default MainLayout;

// loader function
export const MainLayoutLoader =() => {
  console.log("MAİN loader çalişti")
  const userName = fetchData("userName");
  return userName;
};
