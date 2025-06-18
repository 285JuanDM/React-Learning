const ListMovies = ({ movies }) => {
  return (
    (
      <ul className='movies'>
        {
          movies.map(movie => (
            <li key={movie.id}>
              <div className='content'>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
              </div>
              <img
                src={movie.poster}
                alt={`Poster de la película ${movie.title}`}
                onError={(e) => {
                  e.target.onError = null
                  e.target.src = 'https://placehold.co/300x450?text=No+se+encontr%C3%B3+Póster&font=roboto'
                }}
              />
            </li>
          ))
        }
      </ul>
    )
  )
}

const NoMoviesMessage = () => {
  return (
    <h2>No se encontraron peliculas relacionadas con tu busqueda 😔</h2>
  )
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    <>
      {
        hasMovies
          ? <ListMovies movies={movies} />
          : <NoMoviesMessage />
      }
    </>
  )
}
