import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap';
import './fontawesome-free-5.14.0-web/css/all.css'
import './App.css';
import './styles/canvas.scss';
import './styles/editor.scss';
import './styles/layout.scss';
import './styles/fonts.scss';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Showing from './components/ShowingCsv';
import Forgot from './components/Forgot';
import SingleUser from './components/SingleUser';
import PublicUser from './components/PublicUser';
import Editor from './components/editor/Editor';
import { useDispatch } from 'react-redux';
import ActivateAccount from './components/ActivateAccount';

// Redux imports
import { useSelector } from 'react-redux';
// Abdullah --custom implement
import RegisterMain from './components/RegisterMain';
import PrivateRoute from './PrivateRoute'
import setAuthToken from './utils/setAuthToken';
import axios from 'axios'
import { logoutUser, setCurrentUser } from './redux/actions';
import { adminLink, getUserData } from './configurations/urls';
import ResetPassword from './components/ResetPassword';
import { setAllUsers } from './redux/actions/index';

const App = (props) => {

  const user = useSelector((state) => state.user.user);
  const [render, setRender] = useState(false)
  const dispatch = useDispatch()
  //const [first, setFirst] = useState(0)
  const withToken = (access) => {
    // Decode token and get user info and exp
   
    // Set auth token header auth
    setAuthToken(access)
    

    axios.get(getUserData)
    .then(res=>{
        dispatch(setCurrentUser(res.data))
        if(res.data.email==='israrulhaq34907@gmail.com'){
          axios.get(adminLink)
          .then(res=>{
            dispatch(setAllUsers(res.data))
          })
          .catch(err=>console.log(err))
          localStorage.setItem('type', 'admin')
        }else{
          localStorage.setItem('type', 'public')
        }
       
        setRender(true)
    }).catch(err=>{
      dispatch(logoutUser())
      window.location.replace('/login')
        console.log(err)
    })

  }

  useEffect(() => {

    const userCreds=JSON.parse(localStorage.getItem('userCreds'))
    if(userCreds)
    withToken(userCreds.access)
    else
    setRender(true)


  }, [])
  return (
    <Router>
      {render &&
        <Switch>
          <PrivateRoute exact path="/" component={ Home } />
           
          <PrivateRoute exact path="/inventory-list" component={Home} />
          <PrivateRoute exact path="/clients" component={ Home } />
          <PrivateRoute exact path="/listusers" component={Home} />
          <PrivateRoute exact path="/inventory-images" component={Home} />
          <PrivateRoute exact path="/inventory-summary" component={Home} />
          <PrivateRoute exact path="/cutout" component={ Home } />
          <PrivateRoute exact path="/users" component={ Home } />
          <PrivateRoute exact path="/images" component={ Home } />
          <PrivateRoute exact path="/admin-summary" component={ Home } />
          <PrivateRoute exact path="/summary" component={ Home } />
          <PrivateRoute exact path="/editor" component={ Editor } />
          <PrivateRoute exact path="/client/:id" component={ SingleUser } />
            
          <PrivateRoute exact path="/public" component={ PublicUser} />
            
          <PrivateRoute exact path="/show" component={ Showing} />
          <Route exact path="/login">
            <Login />
          </Route>
           
          
          <Route path="/register">
            {user && user.email ?user.has_submitted_info?
            <RegisterMain />:
              <Register /> :<RegisterMain />
              
            }
          </Route>
          <Route path="/forgot">
            <Forgot />
          </Route>
          <Route path="/activate/:uid/:token">
            <ActivateAccount />
          </Route>
          <Route path="/password/reset/confirm/:uid/:token">
              <ResetPassword />
          </Route>
        </Switch>
      }
    </Router>
  );
}

export default App;
