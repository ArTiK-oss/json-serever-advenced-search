import { useEffect, useState } from 'react'

export  function useDebounce(value , ms) {
	const [debounceState, setDebounceState] = useState(value)
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebounceState(value)
		}, ms)
		return () => {
			clearTimeout(timer)
		}
	}, [value, ms])

	return debounceState
}
