import React, { useContext, useEffect, useState } from 'react'
import { GET_ALL_STARSHIPS } from '../lib/queries/GetAllStarships'
import { useQuery } from '@apollo/client'
import Card, { CardDetail } from '../components/Card'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../lib/theme'

export function SearchPage() {
    const [search, setSearch] = useState("")
    const {loading, data, error} = useQuery(GET_ALL_STARSHIPS)
    const theme = useContext(ThemeContext)

    useEffect(() => {
        console.log(search)
    },[search])

    
    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>{error.message}</h1>
    if(!loading) console.log(data)

    function getShip() {
        data.allStarships.starships.map((ship) => {
            <Card key={ship.id}>
                <div className='Card'>
                    <CardDetail>
                    <Link to={`/${ship.id}`}>{ship.name}</Link>
                    </CardDetail>
                </div>
            </Card>
        })
    }

    return (
        <div>
            <h1 style={{
                textAlign: "center"
            }}>Search Here! 🔎</h1>

            <div className='SearchBar'>
                <input type="text" placeholder='Type here!' onChange={e => setSearch(e.target.value)} style={{
                    alignItems: "center",
                    justifyItems: "center",
                    textAlign: "center",
                    marginLeft: "50px",
                    marginBottom: "20px",
                    height: "30px",
                    width: "300px",
                    border: "2px solid #57797f",
                    borderRadius: "20px",
                    opacity: "60%"
                }} />
            </div>

            <div className='Ships'>
                { data.allStarships.starships.map((ship) => {
                    if(ship.name.includes(search)) {
                        return <Card key={ship.id} style={{
                            border: "2px solid #57797f",
                            borderRadius: "35px",
                            height: "50px",
                            padding: "10px",
                            margin: "20px",
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
                                </div>
                                <div>
                                    <div>Model: {ship.model}</div>
                                    <br></br>
                                </div>
                            </CardDetail>
                        </Card>
                    } else {
                        return " "
                    }
                })}
            </div>
        </div>
    )
}
