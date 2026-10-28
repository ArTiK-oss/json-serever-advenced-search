import Categories from './Categories'
import Category from './Category'
import MainContext from '../MainContext'
import ErrorPage from './ErrorPage'
import { useDebounce } from '../hook/useDebounce'
import { useFetch } from '../hook/useFetch'

import {
	useState,
	useEffect,
	useRef,
	useReducer,
	useMemo,
	useCallback,
} from 'react'
import {
	Link,
	NavLink,
	useNavigate,
	Outlet,
	Route,
	Routes,
} from 'react-router-dom'

export default function App() {
	const navigation = useNavigate()
	const [dataCategories, loadingCategories, errorCategories] = useFetch(
		'http://localhost:3000/categories',
	)
	console.log(dataCategories)
	return (
		<>
			<MainContext.Provider value={{}}>
				<NavLink to={'/categories'}>К категориям продуктов</NavLink>
				<button
					onClick={() => {
						navigation(-1)
					}}
				>
					пред стр
				</button>
				<button
					onClick={() => {
						navigation(+1)
					}}
				>
					след стр
				</button>
				<Routes>
					<Route
						path='/categories'
						element={
							<Categories
								dataCategories={dataCategories}
								loadingCategories={loadingCategories}
								errorCategories={errorCategories}
							/>
						}
					/>
					<Route path='/categories/:category' element={<Category />} />
					<Route path='*' element={<ErrorPage />} />
				</Routes>
			</MainContext.Provider>
		</>
	)
}
