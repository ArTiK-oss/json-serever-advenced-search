import { Link } from 'react-router-dom';
export default function ErrorPage() {
	return (<><p> страница не найдена 404</p>  <Link to={'/categories'}>назад на главную</Link></>)
}
