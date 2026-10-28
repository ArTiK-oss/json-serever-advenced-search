import { useParams } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { useDebounce } from '../hook/useDebounce'
import { useFetch } from '../hook/useFetch'

export default function Category() {
	const { category } = useParams() 
	const [inputState, setInputState] = useState('')
	const debouncedValue = useDebounce(inputState, 300)

	const [dataProducts, loadingProducts, errorProducts] = useFetch(
		`http://localhost:3000/products?category=${category}`,
	)


	const filteredProducts = useMemo(() => {
		if (!dataProducts) return []
		return dataProducts.filter(product =>
			product.title.toLowerCase().includes(debouncedValue.toLowerCase()),
		)
	}, [dataProducts, debouncedValue])

	if (loadingProducts) return <p>Загрузка...</p>
	if (errorProducts) return <p className='error-text'>{errorProducts}</p>

	if (dataProducts.length === 0) {
		return (
			<div>
				<input
					type='text'
					placeholder='search...'
					value={inputState}
					onChange={e => setInputState(e.target.value)}
				/>
				{/* Раз в базе вообще нет товаров с такой категорией, значит, такой категории нет! */}
				<div className='error-box'>
					<h2>❌ Нет такой категории: "{category}"</h2>
					<p>Проверьте правильность адреса или вернитесь к списку категорий.</p>
				</div>
			</div>
		)
	}
	return (
		<div>
			<h2>Категория: {category}</h2>

			<input
				type='text'
				placeholder='search...'
				value={inputState}
				onChange={e => setInputState(e.target.value)}
			/>

			<div className='products-list'>

				{filteredProducts.length === 0 ? (
					<p>🔍 В этой категории нет такого товара по запросу "{debouncedValue}"</p>
				) : (
					filteredProducts.map(product => (
						<div key={product.id} className='product-card'>
							<h3>{product.title}</h3>
							<p>{product.price} ₽</p>
						</div>
					))
				)}
			</div>
		</div>
	)
}
