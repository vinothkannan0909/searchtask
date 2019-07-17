import React, { Component } from 'react'
import LoginForm from './Components/Login/Login'
import Home from './Components/Home/'
import Header from './Components/Shared/Header'
import Footer from './Components/Shared/Footer'
class App extends Component {
  render() {
    console.log('Home =>',localStorage.getItem('isLoggedIn'))
    return (localStorage.getItem('isLoggedIn') == '1' )?<div> <Header /> <Home /><Footer/></div>:  <div><LoginForm /></div> ;
  }
} 
export default App