import Header from "./Header";
import Footer from "./Footer";

import { Outlet } from "react-router-dom";

export default function DefaultLayout(){
   return(
    <div className="bg-black text-white">
       <Header />

       <main>
        <Outlet />
       </main>

       <Footer />
    </div>
  )
}