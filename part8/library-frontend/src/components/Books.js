import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { BOOKS_BY_GENRE, BOOK_ADDED } from '../queries'

const Books = (props) => {
  const [getBooks, resultBooks] = useLazyQuery(BOOKS_BY_GENRE)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    getBooks({ variables: { genre: null } })
  }, []) // eslint-disable-line

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(item => item.id).includes(object)

    const dataInStore = client.readQuery({
      query: BOOKS_BY_GENRE,
      variables: { genre: null }
    })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: BOOKS_BY_GENRE,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      if (selectedGenre) {
        resultBooks.refetch({ genre: selectedGenre })
      } else {
        updateCacheWith(addedBook)
      }
    }
  })

  const clickHandlerGenerator = (genre) => {
    return () => {
      setSelectedGenre(genre)
      resultBooks.refetch({ genre })
    }
  }

  if (!props.show) {
    return null
  }

  if (resultBooks.loading) {
    return <div>loading...</div>
  }

  const books = resultBooks.data.allBooks
  const genres = books.reduce((a, c) => a.concat(c.genres), [])
    .filter((item, i, arr) => arr.indexOf(item) === i)

  return (
    <div>
      <h2>books</h2>
      <p>in  genre <strong>{selectedGenre ? selectedGenre : 'all'}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map((genre, i) =>
        <button key={i} onClick={clickHandlerGenerator(genre)}>
          {genre}
        </button>
      )}
      <button onClick={clickHandlerGenerator(null)}>all genres</button>
    </div>
  )
}

export default Books