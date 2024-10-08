import {useEffect, useState} from 'react'
import './App.css'
import SearchIcon from './search.svg'
import MoviesCard from './MoviesCard'


const App = () => {
    const API_URL = 'https://www.omdbapi.com/?apikey=a219056b'

    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()
        setMovies(data.Search);     
    }

    useEffect(()=> {
        searchMovies('Jumanji')
    },[])

    return (
        <div className='app'>
            <h1>MovieLand</h1>

            <div className='search'>
                <input
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                />
                <img
                    src = {SearchIcon}
                    alt = 'search'
                    onClick={()=>searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                ?(
                    <div className='container'>
                        {movies.map((movie) => (
                            <MoviesCard movie={movie}/>
                        ))}
                    </div>
                ):(
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
            }

        </div>
    )
}

export default App