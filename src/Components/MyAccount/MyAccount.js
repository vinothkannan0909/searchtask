import React from 'react';
import ReactDOM from 'react-dom';
import  './MyAccount.css';
class MyAccountPage extends  React.Component    {
    constructor(props){

        this.state = {
            myPage:false,
            view:false
        }
    }
    render(){
        const  myPage  = '<div className="myPage"><div className="row"><div className="container"><br>  <p className="text-center">More bootstrap 4 components on</p> <hr><div className="row justify-content-center"><div className="col-md-6"><div className="card"><header className="card-header"> <h4 className="card-title mt-2">Sign up</h4></header><article className="card-body"><form><div className="form-row"><div className="col form-group"><label>First name </label><input type="text" className="form-control" placeholder=""></div> <div className="col form-group"><label>Last name</label><input type="text" className="form-control" placeholder=" "> </div> ';
        myPage  += '</div><div className="form-group"><label>Email address</label><input type="email" className="form-control" placeholder=""><small className="form-text text-muted"></small></div> ';
        myPage  += '<div className="form-group"><label className="form-check form-check-inline"><input className="form-check-input" type="radio" name="gender" value="option1"><span className="form-check-label"> Male </span></label><label className="form-check form-check-inline"><input className="form-check-input" type="radio" name="gender" value="option2"><span className="form-check-label"> Female</span></label></div> ';
        myPage  += '<div className="form-group"><label>Create password</label><input className="form-control" type="password"></div> <div className="form-group"><button type="submit" className="btn btn-primary btn-block"> Submit  </button></div> </form>';        
        return myPage;

    }
}
export default MyAccountPage;