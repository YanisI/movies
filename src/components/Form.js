import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from './Card';

const Form = () => {

    const [moviesData, setMoviesData] = useState([]);
    const [search, setSearch] = useState("a");
    const [sortGoodBad, setSortGoodBad] = useState(null)

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=0923692ce1c6fcfd92e0ec90866426b3&language=en-US&query=${search}&page=1&include_adult=false`)
            .then((res) => setMoviesData(res.data.results))
    }, [search]);


    return (
        <div className='form-component'>
            <div className='form-container'>
                <form>
                    <input
                        type="text"
                        placeholder="Entrez le titre d'un film"
                        id="search-input"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <input
                        type="submit"
                        value="Rechercher"
                    />
                </form>
                <div className='btn-sort-container'>
                    <div
                        className="btn-sort"
                        id="goodToBad"
                        onClick={() => setSortGoodBad("goodToBad")}
                    >
                        Top
                        <span>
                            →
                        </span>
                    </div>
                    <div
                        className="btn-sort"
                        id="badToGood"
                        onClick={() => setSortGoodBad("badToGood")}
                    >
                        Flop
                        <span>
                            →
                        </span>
                    </div>
                </div>
            </div>
            <div className='result'>
                {moviesData
                    .sort((a, b) => {
                        if (sortGoodBad === "goodToBad") {
                            return b.vote_average - a.vote_average;
                        }
                        else if (sortGoodBad === "badToGood") {
                            return a.vote_average - b.vote_average;
                        }
                    })
                    .slice(0, 12)
                    .map((movie) => {
                        return <Card movie={movie} key={movie.id} />
                    })}
            </div>
        </div>
    )
}

export default Form