import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { useState } from 'react';
import { THEME, ThemeContext } from './lib/theme';
import HomePage from './pages/HomePage';
import {
    createBrowserRouter,
    Link,
    RouterProvider,
} from "react-router-dom";
import { DetailPage } from './pages/DetailPage';
import { SearchPage } from './pages/SearchPage';
import { FavoritePage } from './pages/FavoritePage';

export default function App() {
    const client = new ApolloClient({
        uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
        cache: new InMemoryCache(),
    });

    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage/>,
        },
        {
            path: "/:id",
            element: <DetailPage/>,
        },
        {
            path: "/searchpage",
            element: <SearchPage />,
        },
        {
            path: "/favoritepage",
            element: <FavoritePage />,
        }
    ]);

    const [theme, setTheme] = useState(THEME.light)

    const themeHandler = () => {
        if(theme === THEME.light)
            setTheme(THEME.dark)
        else
            setTheme(THEME.light)
    }

    return (
        <ApolloProvider client={client}>
            <ThemeContext.Provider value={theme}>
                <div style={{
                    backgroundColor: theme.primaryColor,
                    color: theme.accentColor,
                    width: "412px",
                }}>
                    
                    <div style={{
                        paddingTop: "10px",
                        paddingLeft: "50px",
                        alignItems: "center"
                    }}>
                        <button style={{
                            width: "35px",
                            height: "35px",
                            backgroundColor: theme.primaryColor,
                            color: theme.accentColor,
                            border: "0px solid black"
                        }} onClick={themeHandler}>Theme&nbsp;{theme === THEME.light? "🌞" : "🌛"}&nbsp;</button>

                        <button style={{
                            height: "35px",
                            marginLeft: "40px",
                            backgroundColor: theme.primaryColor,
                            color: theme.accentColor,
                            border: "0px solid black"
                        }} onClick={e =>  window.location.href='/'}>
                            Home&nbsp;🏠 
                        </button>

                        <button style={{
                            height: "35px",
                            backgroundColor: theme.primaryColor,
                            color: theme.accentColor,
                            border: "0px solid black"
                        }} onClick={e =>  window.location.href='/searchpage'}>
                            Search&nbsp;🔎 
                        </button>

                        <button style={{
                            height: "35px",
                            backgroundColor: theme.primaryColor,
                            color: theme.accentColor,
                            border: "0px solid black"
                        }} onClick={e =>  window.location.href='/favoritepage'}>
                            Favorite&nbsp;💝 
                        </button>
                    </div>

                    <RouterProvider router={router} />
                </div>
            </ThemeContext.Provider>
        </ApolloProvider>
    )
}