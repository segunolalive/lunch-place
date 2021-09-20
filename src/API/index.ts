const client_id = process.env.REACT_APP_CLIENT_ID as string;
const client_secret = process.env.REACT_APP_CLIENT_SECRET as string;
const API_BASE = process.env.REACT_APP_API_BASE as string;

export async function getVenueDetails<T>(ids: string[]) {
  const promises = ids.map(async(id) => {
    const qs = new URLSearchParams({
      client_id,
      client_secret,
      v: '20210920',
    }).toString()
    const url = `${API_BASE}/${id}?${qs}`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        const text = await response.text()
        throw new Error(text)
      }
      return await response.json()
    } catch (error) {
      return Promise.reject(error)
    }
  })
  return Promise.allSettled<Promise<T>>(promises)
}