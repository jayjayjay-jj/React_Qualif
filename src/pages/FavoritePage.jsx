import { useQuery } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Card, { CardDetail } from '../components/Card'
import { GET_ALL_STARSHIPS } from '../lib/queries/GetAllStarships'
import { ThemeContext } from '../lib/theme'

export function FavoritePage() {
    const{loading, data, error} = useQuery(GET_ALL_STARSHIPS)
    const[fav, setFav] = useState([])
    const theme = useContext(ThemeContext)

    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>{error.message}</h1>
    if(!loading) console.log(data)

    const handleFav = (id) => {
        let favArr = [...fav]

        let search = favArr.indexOf(id)

        if(search !== -1)
            favArr.splice(search, 1)
        else
            favArr.push(id)

        setFav(favArr)
    }

    return (
        <div>
            <h1 style={{
                textAlign: "center"
            }}>Favorite Page! ❤</h1>

            {data.allStarships.starships.map((ship) => {
                let isFav = fav.indexOf(ship.id) !== -1
                return <Card key={ship.id} style={{
                    border: "2px solid #57797f",
                    borderRadius: "35px",
                    height: "auto",
                    padding: "10px",
                    margin: "10px",
                    textAlign: "center",
                }}>
                    <CardDetail style={{
                        display: "flex",
                        color: theme.accentColor,
                        justifyContent: "center"
                    }}>
                        <div>
                            <Link to={`/${ship.id}`} style={{
                                textDecoration: "none",
                                fontWeight: "bold",
                                color: theme.accentColor,
                                justifyContent: "center"
                            }}>{ship.name}</Link>
                            <button onClick={() => handleFav(ship.id)} style={{
                                backgroundColor: theme.primaryColor,
                                border: "0px solid black",
                                color: "#eb212c"
                            }}>{isFav ? "💖" : "🤍"}</button>
                        </div>
                    </CardDetail>
                </Card>
            })}
        </div>
    )
}