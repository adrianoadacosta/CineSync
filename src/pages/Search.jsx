import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import './MovieGrid.css'

const searchUrl = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY



const Search = () => {
		const [searchParams] = useSearchParams();
		const [topMovies, setMovies] = useState([]);
		const query = searchParams.get('q');

		const getSearchMovies = async(url) => {
			const res = await fetch(url);
			const data = await res.json();
	
			setMovies(data.results);
		}
	
		useEffect(() => {
			const searchWithQueryUrl = `${searchUrl}?${apiKey}&query=${query}`;
			getSearchMovies(searchWithQueryUrl);
		}, [query]);


	return <div className="container">
			<h2 className="title">
				Resultados para: <span className="query-text">{query}</span>
			</h2>
		<div className="movies-container">
			{topMovies.length === 0 && <p>Carregando ...</p> }
			{topMovies.length > 0 && topMovies.map((movie, index) => (
<MovieCard key={movie.id ? movie.id : index} movie={movie} />
))}
		</div>
	</div>;
};

export default Search;