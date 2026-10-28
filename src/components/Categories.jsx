import { Link } from 'react-router-dom'
export default function Categrories({
	dataCategories,
	loadingCategories,
	errorCategories,
}) {
	return (
		<>
			{loadingCategories && 'Загрузка данных...'}
			{errorCategories && <p className='error-text'>{errorCategories}</p>}
			{dataCategories && (
				<ul className='categories'>
					{dataCategories.map(category => (
						<li key={category.id}>
							<Link to={`/categories/${category.slug}`}>
								<h2 className='categories__category'>{category.name}</h2>
							</Link>
						</li>
					))}
				</ul>
			)}
		</>
	)
}
