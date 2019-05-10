import {put, call, takeLatest} from 'redux-saga/effects'
import {
    GET_MOVIE_LIST, SET_OPTIONS, GET_MOVIE_GROSS, SET_SELECTED_MOVIES
} from "actions/main/constants"
import * as act from 'actions/main'
import * as api from 'api/main'

function* getMovieList(request) {
    try {
        const {payload: {year_start,week_start, year_end, week_end, nominated,won}} = request
        let movieList = yield call(api.getMovieList,year_start,week_start, year_end, week_end, nominated,won)
        yield put(act.setMovieList(movieList))

    } catch (e) {
        console.log(e)
    } finally {
        console.log("success")
    }
}

function* getMovieGross(request) {
    try {
        const {payload: {year_start,week_start, year_end, week_end, selected_movies}} = request
        if(selected_movies.length>0){
            let movieGross = yield call(api.getMovieGross,year_start,week_start, year_end, week_end, selected_movies)
            let movieCategory = yield call(api.getMovieCategory,selected_movies)

            console.log(movieGross, movieCategory)
            yield put(act.setMovieGross(movieGross))
            yield put(act.setMovieCategory(movieCategory))
        }
    } catch (e) {
        console.log(e)
    } finally {
        console.log("success")
    }
}

export default function* mainSaga() {
    yield takeLatest([GET_MOVIE_LIST,SET_OPTIONS], getMovieList)
    yield takeLatest([SET_SELECTED_MOVIES, GET_MOVIE_GROSS], getMovieGross)
}