import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

//1.jest > react test
//2.typescript > vsc
//3.graphQL + apollo
//4.react hooks > 
//5.serverless 

// const movieTitles = [
//   "Matrix",
//   "Full Metal Jacket",
//   "Oldboy"  
// ]

// const movieImages = [
//   "https://images-na.ssl-images-amazon.com/images/I/51EG732BV3L._SY445_.jpg",
//   "https://images-na.ssl-images-amazon.com/images/I/81U3cu+0RAL._RI_.jpg",
//   "https://images-na.ssl-images-amazon.com/images/I/91ONQ8FNHJL._SY445_.jpg"
// ]



class App extends Component {

  //Mounting
  //constructor() > static getDerivedStateFromProps() > render() > componentDidMount()

  //Updating
  //static getDerivedStateFromProps() > shouldComponentUpdate() > render() > getSnapshotBeforeUpdate() > componentDidUpdate()

  //unMounting
  //componentWillUnmount()

  state = {      
  }

  componentWillMount(){
    console.log('will mount')
  }

  componentDidMount(){
    this._getMovies();
  }

  _getMovies = async () => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie =>{
      console.log(movie)      
      return <Movie 
      title={movie.title_long} 
      poster={movie.medium_cover_image} 
      key={movie.id} 
      genres={movie.genres}
      synopsis={movie.synopsis}
       />
    })
    return movies
  }


  render() {
    console.log('did render')
    const {movies} = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies():'Loading'}
      </div>
    );
  }
}

export default App;
