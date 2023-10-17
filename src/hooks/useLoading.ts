import { useState } from 'react'

export default function useLoading() {
  const [loading, setLoading] = useState(false)

  function startLoading() {
    setLoading(true)
  }
  function stopLoading() {
    setLoading(false)
  }

  return {
    loading,
    startLoading,
    stopLoading,
  }
}
