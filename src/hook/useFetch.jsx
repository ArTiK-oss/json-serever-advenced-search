import { useEffect, useState } from 'react'

export function useFetch(url, debounceValue) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [erorr, setError] = useState(null)

	useEffect(() => {
		let isCancelled = false
		const controller = new AbortController()
		const { signal } = controller

		const timeoutId = setTimeout(() => {
			controller.abort()
		}, 1500)

		async function getFetch() {
			try {
				setData(null)
				setError(null)
				setLoading(true)

				const response = await fetch(url, { signal })

				clearTimeout(timeoutId)

				if (!response.ok) {
					throw new Error(
						`Ошибка HTTP: ${response.status} (${response.statusText})`,
					)
				}

				const text = await response.text()
				const fetchData = text ? JSON.parse(text) : null

				if (isCancelled) return
				setData(fetchData)
			} catch (err) {
				if (isCancelled) return

				setData(null)
				if (err.name === 'AbortError') {
					setError(
						'Превышено время ожидания данных (сервер не ответил вовремя)',
					)
					return
				}
				setError(err.message || err)
			} finally {
				if (!isCancelled) {
					setLoading(false)
				}
			}
		}

		getFetch()

		return () => {
			isCancelled = true
			clearTimeout(timeoutId)
			controller.abort()
		}
	}, [url, debounceValue])

	return [data , loading , erorr]
}
