import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
	BsGraphUp,
	BsWallet2,
	BsHourglassSplit,
	BsFillFileEarmarkTextFill,
	BsCalendar3,
} from 'react-icons/bs'
import { MdLanguage } from "react-icons/md";

const imageUrl = import.meta.env.VITE_IMG;
import MovieCard from "../components/MovieCard";
import './Movie.css'


const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;


const Movie = () => {
	const {id} = useParams();
	const [movie, setMovie] = useState(null);

	const getMovie = async(url) => {
		const res = await fetch(url);
		const data = await res.json();

		setMovie(data);
	}

	const formatCurrency = (number) => {
		return number.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
		});
	};

	const formatDate = (dateString) => {
		const [year, month, day] = dateString.split("-");
		return `${day}-${month}-${year}`;
	};

	useEffect(() => {
		const movieUrl = `${moviesURL}${id}?${apiKey}`;
		getMovie(movieUrl);
	},[id]);


	return <div className="movie-page">
		{movie && (
			<>
			<div className="movie-card">
			<MovieCard movie={movie} showLink={false} />
			<p className="tagline">{movie.tagline}</p>
			<div className="info">
				<h3>
				<MdLanguage />Idioma original:
				</h3>
				<p>{movie.original_language}</p>
			</div>
			<div className="info">
				<h3>
					<BsCalendar3 /> Ano de lançamento:
				</h3>
				<p>{formatDate(movie.release_date)}</p>
			</div>
			<div className="info">
				<h3>
					<BsWallet2 /> Orçamento:
				</h3>
				<p>{formatCurrency(movie.budget)}</p>
			</div>
			<div className="info">
				<h3>
					<BsGraphUp /> Receita:
				</h3>
				<p>{formatCurrency(movie.revenue)}</p>
			</div>
			<div className="info">
				<h3>
					<BsHourglassSplit /> Duração:
				</h3>
				<p>{movie.runtime} minutos</p>
			</div>
			<div className="info description">
				<h3>
					<BsFillFileEarmarkTextFill /> Descrição:
				</h3>
				<p>{movie.overview}</p>
			</div>
			<div className="info">
				<h3>
				<img src={imageUrl + movie.backdrop_path} alt={movie.title} />
				</h3>
				
			</div>
			
			</div>
			</>
		)}
	</div>;
};

export default Movie;
