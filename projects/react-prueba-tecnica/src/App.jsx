import { useCatImage } from '../hooks/useCatImage'
import { useCatFact } from '../hooks/useCatFact'

export function App () {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })
  console.log(imageUrl)

  const handleClick = async () => {
    refreshFact()
  }

  return (
    <main style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
      <h1>App de gatitos</h1>
      <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '30px', marginBottom: '50px' }}>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={imageUrl} alt={`Imagen con estas primeras 3 palabras de este hecho: ${fact}`} />}
      </section>
      <button onClick={handleClick}>Cambiar fact</button>
    </main>
  )
}
