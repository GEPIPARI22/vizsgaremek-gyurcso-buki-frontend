import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
//import { useEffect, useState } from 'react';

import Layout from "./pages/Layout";
import Home from "./pages/Home";

import Oktatok from "./pages/Oktatok";
import OktatokNew from "./pages/Oktatok/New";
import OktatokDelete from "./pages/Oktatok/Delete";
import OktatokEdit from "./pages/Oktatok/Edit";
import OktatokShow from "./pages/Oktatok/Show";

import Iskolak from "./pages/Iskolak";
import IskolakNew from "./pages/Iskolak/New";
import IskolaDelete from "./pages/Iskolak/Delete";
import IskolaEdit from "./pages/Iskolak/Edit";
import IskolaShow from "./pages/Iskolak/Show";

import Munkakorok from "./pages/Munkakorok";
import MunkakorkNew from "./pages/Munkakorok/New";
import MunkakorDelete from "./pages/Munkakorok/Delete";
import MunkakorEdit from "./pages/Munkakorok/Edit";

import Szempontsorok from "./pages/Szempontsorok";
import SzempontsorNew from "./pages/Szempontsorok/New";
import SzempontsorDelete from "./pages/Szempontsorok/Delete";
import SzempontsorEdit from "./pages/Szempontsorok/Edit";
import SzempontsorShow from "./pages/Szempontsorok/Show";

import Szempontok from "./pages/Szempontok";
import SzempontNew from "./pages/Szempontok/New";
import SzempontDelete from "./pages/Szempontok/Delete";
import SzempontEdit from "./pages/Szempontok/Edit";
import SzempontShow from "./pages/Szempontok/Show";

import Ertekelesek from "./pages/Ertekelesek";
import ErtekelesNew from "./pages/Ertekelesek/New";
import ErtekelesDelete from "./pages/Ertekelesek/Delete";
import ErtekelesEdit from "./pages/Ertekelesek/Edit";
import ErtekelesShow from "./pages/Ertekelesek/Show";

import Users from "./pages/Users";
import UserNew from "./pages/Users/New";
import UserDelete from "./pages/Users/Delete";
import UserEdit from "./pages/Users/Edit";
import UserShow from "./pages/Users/Show";

import NoPage from "./pages/NoPage";

import Login from "./components/Login";
import Logout from "./components/Logout";


function App() {
  const token = localStorage.getItem("token")

  return (
    token ?
    <BrowserRouter>
      <Routes>
        Itt vagyok.
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="oktatok" element={<Oktatok />} />
          <Route path="oktatok/new" element={<OktatokNew />} />
          <Route path="oktatok/show/:index" element={<OktatokShow />} />
          <Route path="oktatok/edit/:index" element={<OktatokEdit />} />
          <Route path="oktatok/delete/:index" element={<OktatokDelete />} />

          <Route path="iskolak" element={<Iskolak />} />
          <Route path="iskolak/new" element={<IskolakNew />} />
          <Route path="iskolak/show/:index" element={<IskolaShow />} />
          <Route path="iskolak/edit/:index" element={<IskolaEdit />} />
          <Route path="iskolak/delete/:index" element={<IskolaDelete />} />

          <Route path="munkakorok" element={<Munkakorok />} />
          <Route path="munkakorok/new" element={<MunkakorkNew />} />
          <Route path="munkakorok/edit/:index" element={<MunkakorEdit />} />
          <Route path="munkakorok/delete/:index" element={<MunkakorDelete />} />

          <Route path="szempontsorok" element={<Szempontsorok />} />
          <Route path="szempontsorok/new" element={<SzempontsorNew />} />
          <Route path="szempontsorok/show/:index" element={<SzempontsorShow />} />
          <Route path="szempontsorok/edit/:index" element={<SzempontsorEdit />} />
          <Route path="szempontsorok/delete/:index" element={<SzempontsorDelete />} />

          <Route path="szempontok" element={<Szempontok />} />
          <Route path="szempontok/new" element={<SzempontNew />} />
          <Route path="szempontok/show/:index" element={<SzempontShow />} />
          <Route path="szempontok/edit/:index" element={<SzempontEdit />} />
          <Route path="szempontok/delete/:index" element={<SzempontDelete />} />

          <Route path="ertekelesek" element={<Ertekelesek />} />
          <Route path="ertekelesek/new" element={<ErtekelesNew />} />
          <Route path="ertekelesek/show/:index" element={<ErtekelesShow />} />
          <Route path="ertekelesek/edit/:index" element={<ErtekelesEdit />} />
          <Route path="ertekelesek/delete/:index" element={<ErtekelesDelete />} />

          <Route path="users" element={<Users />} />
          <Route path="users/new" element={<UserNew />} />
          <Route path="users/show/:index" element={<UserShow />} />
          <Route path="users/edit/:index" element={<UserEdit />} />
          <Route path="users/delete/:index" element={<UserDelete />} />

          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
    :<div><Login /></div>
  );
}

export default App;
