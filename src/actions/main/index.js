import {
    RESOURCE_SET_OPTION_TIME_END,
    RESOURCE_SET_OPTION_TIME_START,
    RESOURCE_SET_OPTION_INTERVAL,
} from './constants'

export function setOptionTimeEnd(timeEnd, timeStart, interval, cpu, disk, host) {
    return {type: RESOURCE_SET_OPTION_TIME_END, payload: {timeEnd, timeStart, interval, cpu, disk, host}}
}

export function setOptionTimeStart(timeEnd, timeStart, interval, cpu, disk, host) {
    return {type: RESOURCE_SET_OPTION_TIME_START, payload: {timeEnd, timeStart, interval, cpu, disk, host}}
}

export function setOptionInterval(timeEnd, timeStart, interval, cpu, disk, host) {
    return {type: RESOURCE_SET_OPTION_INTERVAL, payload: {timeEnd, timeStart, interval, cpu, disk, host}}
}

