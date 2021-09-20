import { useCallback, useEffect, useRef, useState, MutableRefObject } from 'react'

export enum REQUEST_STATUSES {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}

export function useRequest<T extends Record<string, unknown>>(url: string, config: Omit<RequestInit, 'signal'> = {}) {
  const [status, setStatus] = useState(REQUEST_STATUSES.IDLE)
  const [data, setData] = useState<T | null>(null)

  const makeRequest = useCallback(
    async function (signal: AbortSignal) {
      if (!url) {
        setStatus(REQUEST_STATUSES.IDLE)
        setData(null);
        return;
      }
      setStatus(REQUEST_STATUSES.LOADING)
      try {
        const response = await fetch(url, { ...config, signal })
        if (!response.ok) {
          throw new Error('Server Error')
        }
        const jsonData = await response.json()
        setStatus(REQUEST_STATUSES.SUCCESS)
        setData(jsonData)
      } catch (error) {
        if (!signal.aborted) {
          setStatus(REQUEST_STATUSES.ERROR)
          setData(null)
        }
      }
    },
    [url]
  )
  return { status, data, makeRequest }
}

export function useAbortableFetch<T extends Record<string, unknown>>(url: string, config: Omit<RequestInit, 'signal'> = {}) {
  const {data, status, makeRequest} = useRequest<T>(url, config)
  const abortRef: MutableRefObject<AbortController | null> = useRef(null)

  useEffect(() => {
    if (abortRef.current) {
      abortRef.current.abort()
    }
    const controller = new AbortController()
    abortRef.current = controller

    makeRequest(controller.signal)
    return () => {
      controller.abort()
    }
  }, [url, makeRequest])

  return { status, data }
}


