import { useQuery } from '@apollo/client'
import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import Card, { CardDetail } from '../components/Card'
import { GET_ALL_STARSHIPS } from '../lib/queries/GetAllStarships'
import { ThemeContext } from '../lib/theme'

export function DetailPage() {
    const {loading, data, error} = useQuery(GET_ALL_STARSHIPS)
    let {id, name} = useParams()
    const theme = useContext(ThemeContext)

    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>{error.message}</h1>
    if(!loading) console.log(data)

    console.log(data)      
    return (
        <div>
            <h1 style={{
                textAlign: "center"
            }}>Detail Page!</h1>

            <div style={{
                textAlign: "center"
            }}>Ship id: {id}</div>

            <div>{data.allStarships.starships.map((ship) => {
            return <Card key={ship.id} style={{
                border: "2px solid #57797f",
                borderRadius: "35px",
                paddingTop: "20px",
                paddingBottom: "0px",
                padding: "5px",
                margin: "20px",
                textAlign: "center",
            }}>
                <CardDetail style={{
                    display: "flex",
                    color: theme.accentColor,
                    justifyContent: "center",
                    textAlign: "center"
                }}>
                    <div style={{
                        textAlign: "center"
                    }}>
                        <div>Name  &nbsp;: &nbsp;{ship.name}</div>
                        <div>Model  &nbsp;: &nbsp;{ship.model}</div>
                        <div>Class &nbsp;: &nbsp; {ship.starshipClass}</div>
                        <div>Manufacturers &nbsp;: &nbsp; {ship.manufacturers}</div>
                        <div>Cost in Credits &nbsp;: &nbsp; {ship.costInCredits}</div>
                        <div>Crew count &nbsp;: &nbsp; {ship.crew}</div>
                        <div>Passenger Count &nbsp;: &nbsp; {ship.passengers}</div>
                        <br></br>
                    </div>
                </CardDetail>
            </Card>
        })}</div>
        </div>
    )
}
