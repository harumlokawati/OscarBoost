import {put, call, takeLatest} from 'redux-saga/effects'
import {
    GET_MOVIE_LIST, SET_OPTIONS
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

export default function* mainSaga() {
    yield takeLatest([GET_MOVIE_LIST,SET_OPTIONS], getMovieList)
}