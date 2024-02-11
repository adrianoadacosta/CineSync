import { useState, useEffect } from "react"; // useState para gerenciar o estado dos filmes e o useEffect para fazer a chamada da API quando a pg recarregar

import MovieCard from "../components/MovieCard";

import './MovieGrid.css';

// variaveis para trazer os dados da api que esta configurado no env
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
	const [topMovies, setTopMovies] = useState([]);

	const getTopRatedMovies = async(url) => {
		const res = await fetch(url);
		const data = await res.json();

		setTopMovies(data.results);
		
	}

	//chamar a function para pegar os filmes mais bem rankeados mas não chama igual ao JS no react, usa o useEffect
	useEffect(() => {
		// filtro o site da api com a minha chave para buscar os top rated (ver documentação da API)
		const topRateUrl = `${moviesURL}top_rated?${apiKey}`;
		getTopRatedMovies(topRateUrl);
	}, []);

	return <div className="container">
		<h2 className="title">Melhores filmes:</h2>
			<div className="movies-container">
				{topMovies.length === 0 && <p>Carregando ...</p> }
				{topMovies.length > 0 && topMovies.map((movie, index) => (
    <MovieCard key={movie.id ? movie.id : index} movie={movie} />
  ))}
			</div>
		</div>;
};

export default Home;
