import {
    GET_MOVIE_LIST,
    SET_MOVIE_LIST,
    SET_SELECTED_MOVIES,
    SET_OPTIONS
} from './constants'

export function getMovieList(year_start,week_start, year_end, week_end, nominated,won) {
    return {type: GET_MOVIE_LIST, payload: {year_start,week_start, year_end, week_end, nominated,won}}
}


export function setMovieList(movieList) {
    return {type: SET_MOVIE_LIST, payload: {movieList}}
}

export function setSelectedMovies(selected_movies){
    return {type: SET_SELECTED_MOVIES, payload: {selected_movies}}
}

export function setOptions(year_start,week_start, year_end, week_end, nominated,won){
    return {type: SET_OPTIONS, payload: {year_start,week_start, year_end, week_end, nominated,won}}
}

// export function setYearStart(year_start,week_start, year_end, week_end, nominated,won){
//     return {type: SET_SELECTED_MOVIES, payload: {year_start,week_start, year_end, week_end, nominated,won}}
// }
//
// export function setYearEnd(year_start,week_start, year_end, week_end, nominated,won){
//     return {type: SET_SELECTED_MOVIES, payload: {year_start,week_start, year_end, week_end, nominated,won}}
// }
//
// export function setWeekStart(year_start,week_start, year_end, week_end, nominated,won){
//     return {type: SET_SELECTED_MOVIES, payload: {year_start,week_start, year_end, week_end, nominated,won}}
// }
//
// export function setWeekEnd(year_start,week_start, year_end, week_end, nominated,won){
//     return {type: SET_SELECTED_MOVIES, payload: {year_start,week_start, year_end, week_end, nominated,won}}
// }
//
// export function setWeekEnd(year_start,week_start, year_end, week_end, nominated,won){
//     return {type: SET_SELECTED_MOVIES, payload: {year_start,week_start, year_end, week_end, nominated,won}}
// }