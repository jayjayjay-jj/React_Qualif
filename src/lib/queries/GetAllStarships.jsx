import { gql } from '@apollo/client'

export const GET_ALL_STARSHIPS = gql`
query getAllStarships {
    allStarships {
        starships {
            id
            name
            model
            starshipClass
            manufacturers
            costInCredits
            crew
            passengers
            filmConnection {
                totalCount
                films {
                    title
                    episodeID
                    releaseDate
                }
            }
        }
    }
}
`;