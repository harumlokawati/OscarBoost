import {
    RESOURCE_SET_OPTION_TIME_END,
    RESOURCE_SET_OPTION_TIME_START,
    RESOURCE_SET_OPTION_INTERVAL,
} from '../../actions/main/constants'
import {isFSA} from 'flux-standard-action'
import invariant from 'invariant'
import moment from "moment";

let initialState = {
    interval: '1m',
    timeEnd: moment().utc().format(),
    timeStart: moment().add(-2, 'hour').utc().format(),
    data:[],
}


const reducer = (state = initialState, action) => {
    invariant(
        isFSA(action),
        `Invalid FSA action. See https://github.com/acdlite/flux-standard-action for info. Object: ${JSON.stringify(action)}`
    )

    const {payload = {}} = action
    switch (action.type) {
        case RESOURCE_SET_OPTION_TIME_END:
            return {...state, timeEnd: payload.timeEnd}
        case RESOURCE_SET_OPTION_TIME_START:
            return {...state, timeStart: payload.timeStart}
        case RESOURCE_SET_OPTION_INTERVAL:
            return {...state, interval: payload.interval}
        default:
            return {...state}
    }
}

export {reducer}