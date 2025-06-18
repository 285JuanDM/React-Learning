import { useCallback, useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // Este valor se inicializa una vez, guarda una referencia mutable a una variable en el componente
  const previousSearch = useRef(search) // -> Esto empieza vacío ''

  const getMovies = useCallback(
    async ({ search }) => {
    // La primera vez: 'Avengers' === '' 🔴, no retorna
    // Segunda vez (En caso de misma búsqueda): 'Avengers' === 'Avengers' 🟢, retona
      if (search === previousSearch.current) return

      try {
        setLoading(true)
        setError(null)
        // Se le asigna el valor de search a la busqueda anterior
        previousSearch.current = search
        const newMovies = await searchMovies({ search })

        setMovies(newMovies)
      } catch (e) {
        setError(e.message())
      } finally {
        setLoading(false)
      }
    }, [search])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, loading, error, sortedMovies, getMovies }
}
