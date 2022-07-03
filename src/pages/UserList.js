import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from "axios";
import Card from '../components/Card';

const UserList = () => {

  const [listData, setListData] = useState([])

  useEffect(() => {
    let movieId = (window.localStorage.movies ? window.localStorage.movies.split(",") : []);

    for (let i = 0; i < movieId.length; i++) {
      axios.get(`https://api.themoviedb.org/3/movie/${movieId[i]}?api_key=0923692ce1c6fcfd92e0ec90866426b3&language=en-US`)
        .then((res) => {
          console.log(res.data)
          setListData((listData) => [...listData, res.data])
        })
    }

  }, [])

  return (
    <div className='user-list-page'>
      <Header />
      <h2>Coup de coeur <span>🧡</span></h2>
      <div className="result">
        {listData.length > 0 ?
          listData.map((movie) => {
            return <Card movie={movie} key={movie.id} />
          })
          :
          <h2>Aucun coup de coeur</h2>
        }
      </div>
    </div>
  )
}


export default UserList