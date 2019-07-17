import React from 'react';
import axios from 'axios';
import Pagination from "react-js-pagination";
import  '../../App.css'
class SearchPage extends React.Component{
  constructor(props){
      super(props);
      this.state ={
          moviename: null,
          result: [],
          errors: false,
          total:0,
          submithandler:false,
          activePage: 1
      }
  
      this.changehandler = this.changehandler.bind(this);
      this.submissionhandler = this.submissionhandler.bind(this);
      this.callApi = this.callApi.bind(this);
      this.displayError = this.displayError.bind(this);
  }
  
  changehandler(event){
      this.setState({moviename: event.target.value});
      //this.callApi();
      // if(event.target.value  == null){
      //     this.callApi();
      // }
  }
  
  submissionhandler(){
      this.setState({submithandler:true})
      this.callApi();
  }
  componentWillMount(){
    this.callApi();
  }
  displayError(){
      if(this.state.errors === true){
          return(
              <div className="newerror">
              <div className="alert alert-danger" role="alert">
              No movie with that name found! Please try again.
              </div>
              </div>
          )
      }
  }

 callApi(){
      const BASEURL = "http://www.omdbapi.com/";
      const APIKEY  = "fa281222"; 
      const IVAL    = "tt3896198"; 
      let self = this;
      let resultData = [];
      axios.get(`${BASEURL}?i=${IVAL}&apikey=${APIKEY}&s=${this.state.moviename}&page=${this.state.activePage}`)
      .then(function (response) {
        console.log(response)
        if(response.data.Response && response.data.totalResults > 0){
          (response.data.Search).map(async movieList =>{
            await resultData.push(movieList);
          });
          self.setState({result: resultData, errors: false , total:response.data.totalResults});
        }else{
           self.setState({result: 'No data found !',error: true ,total:response.data.totalResults});
        }
      })
   }
  
   async handlePageChange(pageNumber) {
      await this.setState({activePage: pageNumber});
      this.callApi();
   }
    render(){   
      let resultlist = []
      if(this.state.result != null && typeof (this.state.result) != undefined) {
        resultlist = this.state.result.map(function(res, index)
        {   console.log(res.Poster)
            return (
                <div className="col-md-3 mb-3 resultfetch"  key = {index}>
                  <article className="withhover card  border position-relative d-block">
                    <img className="d-block mb-2 lazy rounded-top movieImageClass img-responsive" src={(res.Poster !== 'N/A')?res.Poster:'https://www.bathroomcity.co.uk/sites/default/files/default_images/no_image_available_1.png'} alt=''/> 
                    <div className="card-content movieCardClass">
                            <h2 className="h5 text-black mb-3 movietitle">{index+1}. {res.Title}</h2>
                            <p className="text-inherit releasedate"><strong>Release Date: </strong>{res.Year}</p>
                            <p className="text-inherit imdbID"><strong>imdbID: </strong>{res.imdbID}</p>
                            <p className="text-inherit Type"><strong>Type: </strong>{res.Type}</p>
                    </div>
                  </article>
                  </div>
              )
        });
      }
        return(
          <div className="container search_item_class" >
              <div className ="col-md-4 mb-4">
                <div className="row text-center">
                  <div className="col-md-4">
                      <label htmlFor="Movie Catalog">Movie Catalog</label>
                  </div>
                  <div className="col-md-6" >
                      <input type="text" placeholder="Type the name of a movie here" className="form-control" onChange = {this.changehandler}/>
                  </div>
                  <div className="col-md-2" >
                      <input type="submit" className="btn btn-primary" value="Search" onClick={this.submissionhandler}/>
                  </div>
                </div>
              </div>
          <div className ="row pricing_main no-gutter"> 
              <h2 className="text-inherit search_esults"><strong>{ this.state.submithandler && this.state.moviename != null ? 'Your search for :  '+this.state.moviename +' , '+this.state.total :'' }</strong></h2>
              {resultlist}
          </div>
          {this.displayError()}
            <div className="row">
              <div className="col-md-3 offset-md-5" >
                  <Pagination
                    activePage={this.state.activePage}
                    pageRangeDisplayed={10}
                    itemsCountPerPage={this.state.result.length}
                    totalItemsCount={this.state.total}
                    onChange={this.handlePageChange.bind(this)}
                  />
                  </div>
              </div>
          </div>
        )
    }
}
export default SearchPage;
