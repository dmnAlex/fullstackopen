
import { useApolloClient } from '@apollo/client'
import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import { USER } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('authors')
  const [getUser, resultUser] = useLazyQuery(USER, {
    fetchPolicy: 'no-cache'
  })
  const client = useApolloClient()

  useEffect(() => {
    if (token) {
      getUser()
    }
  }, [token]) // eslint-disable-line

  useEffect(() => {
    if (resultUser.data) {
      setUser(resultUser.data.me)
    }
  }, [resultUser])

  const logoutHandler = (event) => {
    event.preventDefault()

    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token
          ? <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logoutHandler}>logout</button>
          </>
          : <button onClick={() => setPage('login')}>login</button>
        }


      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        setToken={setToken}
        setPage={setPage}
        show={page === 'login'}
      />

      <Recommendations
        genre={user ? user.favoriteGenre : null}
        show={page === 'recommend'}
      />

    </div>
  )
}

export default App