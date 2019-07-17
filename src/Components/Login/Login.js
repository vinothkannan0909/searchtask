import React, {Component} from 'react';
//import {withRouter} from 'react-router-dom'
import  './Login.css';
import Home from '../Home/';
import Header from '../Shared/Header'
import Footer from '../Shared/Footer'
import axios from 'axios';

class LoginForm extends Component{
constructor(props){
    super(props);
   
     this.state= {
        UserName : this.props.UserName || "",
        password: this.props.password || "" ,
        isLoggedIn : false,
        formErrors: {UserName: '', password: ''},
        emailValid: false,
        passwordValid: false,
        formValid: false
    };
   // console.log(this.state);
   
}
validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    fieldValidationErrors.UserName     = (fieldName.UserName == '')?'Enter the username':fieldName.UserName
    fieldValidationErrors.password     =  (fieldName.password == '')?'Enter the password':fieldName.password
    if(fieldValidationErrors.UserName !== '' && fieldValidationErrors.password !== ''){    
        fieldValidationErrors.UserName =   (fieldName.UserName.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))?'':'Please enter the email address';
        fieldValidationErrors.password =  (fieldName.password.length >= 6)?'':'Pleas enter the password (min 5 to max 15 characters)';

    }else{
        this.setState({formErrors: fieldValidationErrors,emailValid : true,
            passwordValid : true, formValid : true
        });
    }
    
  }
  

  
    handleChange(e){
        e.preventDefault();
        const name = e.target.name;
        this.setState({[name]: e.target.value});
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(this.props.isLoggedIn, nextProps.isLoggedIn)
    //     if (nextProps.isLoggedIn !== this.props.isLoggedIn) {
    //       return true;
    //     }
    //     return false; //this is the missing piece
    //  } 
    async LoginForm() {
        const self = this;
        const apiLogin_URL = 'http://172.16.25.199:8081';
        const usersPath = 'login';
        const { UserName, password } = this.state;
        this.validateField(this.state, this.state);
        console.log(this.state)
        if(this.state.formErrors.UserName === '' && this.state.formErrors.password === ''){
            try {
                await axios.get(`${apiLogin_URL}/${usersPath}`,{params:{username:UserName,password:password}})
                .then(function (response) {
                    if(response.status === 200)self.setState({isLoggedIn: true});
                    localStorage.setItem('isLoggedIn',response.data.isLoggedIn);
                    localStorage.setItem("data",JSON.stringify(response.data))
                  })
                  .catch(function (error) {
                    console.log("error ",error);
                  })
             } catch (err) {
                 console.log(err)
             }
        }
        
    }
    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
     }
    render(){  
        let Redirects =  (localStorage.getItem('isLoggedIn') === 'null')?'null':'1';
        console.log('Redirects =>',localStorage.getItem('isLoggedIn'));
        //(localStorage.getItem('isLoggedIn'))?this.state.isLoggedIn:localStorage.setItem('isLoggedIn', Redirects);
        //(localStorage.getItem('isLoggedIn'))?localStorage.setItem('isLoggedIn',Redirects):localStorage.setItem('isLoggedIn', Redirects);
        
        const tpl = (Redirects === 'null')?<div className="page-background"><div className="loginform formErrors">
        <div className="username-error">{(this.state.formErrors.UserName !== '')?this.state.formErrors.UserName:''}</div>
        <div className="password-error">{(this.state.formErrors.password !== '')?this.state.formErrors.password:''}</div>
        <form  className="form-signin hero-image" >
        <h2 className="form-signin-heading">login</h2>
         <label name="UserName"><input type="text" name="UserName" className="form-control " placeholder="Enter the login name" value={this.state.UserName} onChange={this.handleChange.bind(this)} /></label><br />
         <label name="Password"><input type="password" name="password" className="form-control " placeholder="Enter the password" value={this.state.password} onChange={this.handleChange.bind(this)} /></label><br />
         <input className="btn btn-primary" type="button" onClick={this.LoginForm.bind(this)} value="Login" ></input>
         </form>
      </div></div>: <div> <Header /> <Home /><Footer/></div>  ;
        return tpl;
    }
}




export default LoginForm;

