import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useSerarch } from './hooks/useSearch'
import { ThreeDot } from 'react-loading-indicators'
import { useCallback, useState } from 'react'
import debounce from 'just-debounce-it'
import './App.css'

export function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSerarch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debounceGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 500)
    , []
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    const newIsSort = !sort
    setSort(newIsSort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debounceGetMovies(newSearch)
  }

  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form action='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix...' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <label>Ordenar por Titulo</label>
          <button type='submit'>Buscar</button>
        </form>
        {error && <span style={{ color: '#f10009ff' }}>{error}</span>}
      </header>

      <main style={{ marginTop: '50px' }}>
        {
          loading ? <ThreeDot variant='bounce' color='#ffffff' size='medium' text='Cargando' /> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}
