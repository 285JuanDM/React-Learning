import { useEffect, useState } from 'react'
import { getRandomFact } from '../services/facts'

export function useCatFact () {
  const [fact, setFact] = useState()

  const refreshFact = () => {
    getRandomFact().then(newfact => setFact(newfact))
  }

  useEffect(refreshFact, [])

  return { fact, refreshFact }
}
