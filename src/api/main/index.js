import * as url from '../constants'
import axios from 'axios'

export function getMovieList(year_start, week_start, year_end, week_end, nominated, won) {
    return axios.get(url.GET_MOVIE_LIST_URL,
        {
            params: {
                year_start: year_start,
                week_start: week_start,
                year_end: year_end,
                week_end: week_end,
                nominated: nominated,
                won: won
            }
        }
    )
        .then(res => {
            return Promise.resolve(res.data)
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

export function getMovieGross(year_start, week_start, year_end, week_end, selected_movies) {
    return axios.post(url.GET_MOVIE_GROSS_URL,
        {
            year_start: year_start,
            week_start: week_start,
            year_end: year_end,
            week_end: week_end,
            movies: selected_movies
        }
    )
        .then(res => {
            return Promise.resolve(res.data)
        })
        .catch(err => {

            return Promise.reject(err)
        })
}