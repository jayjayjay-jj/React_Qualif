import { useQuery } from '@apollo/client'
import { useContext, useState } from 'react'
import Card, { CardDetail } from '../components/Card'
import { GET_ALL_STARSHIPS } from '../lib/queries/GetAllStarships'
import { ThemeContext } from '../lib/theme'
import { Link } from 'react-router-dom'

export default function HomePage() {
    const {loading, data, error} = useQuery(GET_ALL_STARSHIPS)
    const [fav, setFav] = useState([])
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
    <div style={{
        display: "grid",
        backgroundColor: theme.primaryColor,
        color: theme.accentColor
    }}>
        <h1 style={{
            textAlign: "center"
        }}>Starships!</h1>
        
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "8 rem",
            backgroundColor: theme.primaryColor,
            color: theme.accentColor
        }}> 
        
        {data.allStarships.starships.map((ship) => {
            let isFav = fav.indexOf(ship.id) !== -1
            return <Card key={ship.id} style={{
                border: "2px solid #57797f",
                borderRadius: "35px",
                height: "auto",
                padding: "10px",
                margin: "10px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center"
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
                    <div>
                        <div>Model: {ship.model}</div>
                        <br></br>
                    </div>
                </CardDetail>
            </Card>
        })}
        </div>
    </div>
    )
}