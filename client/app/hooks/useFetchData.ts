'use client'

import { useState, useEffect } from 'react'
import { Data } from '../types/Data'

const useFetchData = (url: string) => {
	const [data, setData] = useState<Data | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url)
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const jsonData: Data = await response.json()

				setData(jsonData)
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message)
				} else {
					setError('An unexpected error occurred')
				}
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [url])

	return { data, loading, error }
}

export default useFetchData
