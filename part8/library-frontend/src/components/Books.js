import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {
  const [getBooks, resultBooks] = useLazyQuery(BOOKS_BY_GENRE, {
    fetchPolicy: 'no-cache'
  })
  const [selectedGenre, setSelectedGenre] = useState('')

  useEffect(() => {
    getBooks({
      variables: selectedGenre
        ? { genre: selectedGenre }
        : null
    })
  }, [selectedGenre]) // eslint-disable-line

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
        <button key={i} onClick={() => setSelectedGenre(genre)}>
          {genre}
        </button>
      )}
      <button onClick={() => setSelectedGenre('')}>all genres</button>
    </div>
  )
}

export default Books