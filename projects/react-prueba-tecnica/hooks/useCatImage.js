import { useEffect, useState } from 'react'

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    if (!fact) return

    const threeFirstWords = fact.split(' ', 3).join(' ')
    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=20&json=true`)
      .then(res => res.json())
      .then(data => {
        const { url } = data
        const urlFinal = new URL(url)
        setImageUrl(urlFinal)
      })

    return () => {
    }
  }, [fact])

  return { imageUrl }
}
