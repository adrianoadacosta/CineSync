import { Link } from "react-router-dom";
import { FaStar } from 'react-icons/fa';

import PropTypes from 'prop-types'; // validar usando propTypes

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({movie, showLink = true}) => {
    return <div className="movieCard">
        <img src={imageUrl + movie.poster_path} alt={movie.title} />
        <h2>{movie.title}</h2>
        <p>
            <FaStar /> {movie.vote_average.toFixed(1)}
        </p>
        {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>;
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string.isRequired,
        vote_average: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired
    }).isRequired,
    showLink: PropTypes.bool
};


export default MovieCard;