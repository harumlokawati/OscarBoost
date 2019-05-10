import {
    SET_MOVIE_LIST,
    SET_SELECTED_MOVIES,
    SET_OPTIONS,
    SET_MOVIE_GROSS,
    SET_MOVIE_CATEGORY
} from '../../actions/main/constants'
import {isFSA} from 'flux-standard-action'
import invariant from 'invariant'

let initialState = {
    oscar_selected: '',
    nominated:null,
    won:null,
    selected_movies: [],
    year_start: 2018,
    year_end: 2018,
    week_start: 1,
    week_end: 5,
    movieList: [],
    movieGross: [],
    disable_form:false,
    movieCategory: {}
}


const reducer = (state = initialState, action) => {
    invariant(
        isFSA(action),
        `Invalid FSA action. See https://github.com/acdlite/flux-standard-action for info. Object: ${JSON.stringify(action)}`
    )

    const {payload = {}} = action
    switch (action.type) {
        case SET_MOVIE_LIST:
            return {...state, movieList: payload.movieList}
        case SET_SELECTED_MOVIES:
            return {...state, selected_movies: payload.selected_movies}
        case SET_OPTIONS:
            return {...state, year_start: payload.year_start, year_end: payload.year_end, week_start: payload.week_start, week_end: payload.week_end, nominated:payload.nominated, won:payload.won }
        case SET_MOVIE_GROSS:
            return {...state, movieGross: payload.movieGross}
        case SET_MOVIE_CATEGORY:
            return {...state, movieCategory: payload.movieCategory}
        default:
            return {...state}
    }
}

export {reducer}