import { useAbortableFetch } from './useAbortableFetch'

const client_id = process.env.REACT_APP_CLIENT_ID as string;
const client_secret = process.env.REACT_APP_CLIENT_SECRET as string;
const API_BASE = process.env.REACT_APP_API_BASE as string;


export function useVenues <T extends Record<string, unknown>>(address: string) {
  const qs = new URLSearchParams({
    client_id,
    client_secret,
    near: address,
    limit: '3',
    query: 'lunch',
    sortByPopularity: 'true',
    v: '20210920',
  }).toString()

  const searchUrl = address ? `${API_BASE}/explore?${qs}` : ''
  return useAbortableFetch<T>(searchUrl)
}
