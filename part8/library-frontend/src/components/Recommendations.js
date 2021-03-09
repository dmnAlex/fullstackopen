import { useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { BOOKS_BY_GENRE } from '../queries'

const Recommendations = ({ genre, show }) => {
  const [getBooks, resultBooks] = useLazyQuery(BOOKS_BY_GENRE)

  useEffect(() => {
    if (genre) {
      getBooks({ variables: { genre } })
    }
  }, [genre]) // eslint-disable-line

  if (!show) {
    return null
  }

  if (resultBooks.loading) {
    return <div>loading...</div>
  }

  const books = resultBooks.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{genre}</strong></p>
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
    </div>
  )
}

export default Recommendations