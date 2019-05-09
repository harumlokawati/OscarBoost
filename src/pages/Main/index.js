import React, {Component} from 'react'
import './main.css'
import {connect} from "react-redux";
import IntervalOption from "../../components/Option/IntervalOption";
import OscarOption from "../../components/Option/OscarOption";
import {Col, Row} from "reactstrap";
import Button from '@material-ui/core/Button';
import {
    setOptionTimeEnd,
    setOptionTimeStart,
    setOptionInterval,
} from "../../actions/main";
import moment from "moment";
import TimeSeries from "../../components/Chart/TimeSeries";

class Main extends Component {

    componentWillMount() {

    }

    handleChange = event => {
        const {dispatch, timeEnd, timeStart} = this.props
        const {name, value} = event.target;
        if (name == 'interval') {
            dispatch(setOptionInterval(timeEnd, timeStart, value))
        }
    }

    handleDateStartChange = date => {
        const {dispatch, timeEnd, interval} = this.props
        dispatch(setOptionTimeStart(timeEnd, moment(date.toDate()).utc().format(), interval))
    }

    handleDateEndChange = date => {
        const {dispatch, timeStart, interval} = this.props
        dispatch(setOptionTimeEnd(moment(date.toDate()).utc().format(), timeStart, interval))
    }

    constructor(props) {
        super(props)
    }

    render() {
        let keys = [
            {
                "dataKey": "gross",
                "color": "#cc9933"
            }
        ]
        let oscar_option = [
            {
                "value": "won",
                "text": "won"
            },
            {
                "value": "nominated",
                "text": "nominated"
            },
            {
                "value": "non nominated",
                "text": "not nominated"
            },
        ]
        let movieoptions = [
            {
                "value": "Brooklyn",
                "text": "Brooklyn"
            }
        ]

        let weekoption = [{
            "value": 1,
            "text": 1
        },
            {
                "value": 2,
                "text": 2
            },
            {
                "value": 3,
                "text": 3
            },
            {
                "value": 50,
                "text": 50
            },
            {
                "value": 51,
                "text": 51
            },
            {
                "value": 52,
                "text": 52
            },
            {
                "value": 6,
                "text": 6
            },
            {
                "value": 7,
                "text": 7
            }
            ]
        let yearoption = [{
            "value": 2018,
            "text": 2018
        },
            {
                "value": 2019,
                "text": 2019
            }]
        let data = [
            {week: 50, week_film: 7, gross: 2962990},
            {week: 51, week_film: 8, gross: 2018502},
            {week: 52, week_film: 9, gross: 2227080},
            {week: 1, week_film: 10, gross: 1819964},
            {week: 2, week_film: 11, gross: 1565654},
            {week: 3, week_film: 12, gross: 2914708},
            {week: 4, week_film: 13, gross: 2806850},
            {week: 5, week_film: 14, gross: 2529772},
            {week: 6, week_film: 15, gross: 1755310},
            {week: 7, week_film: 16, gross: 1641848},
        ]
        return (<div className="app">
            <div className="header mb-5">
                <div className="dashboard-text">THE OSCAR BOOST</div>
                <Row>
                    <div className="partition-50 dashboard-title">Every year, Academy of Motion Picture Arts and Sciences nominate several movies as Best Motion Pictures. Although we often think that this award is about appreciation to art and science, there is money looming from behind.</div>
                    <div className="partition-50 dashboard-title">Most movies tend to have a hype. They have high grossing in the first week and then the amount of viewing starts diminishing. However, things are different with Oscar nominated movies. They get a bump in their viewing after the announcement of their nomination</div>

                </Row>
                </div>
            <div className="mb-5">
                <IntervalOption className="mr-1" valueYear={2018} valueWeek={50} title="Start"
                                optionYear={yearoption} optionWeek={weekoption} handleChange={this.handleChange}/>
                <IntervalOption className="mr-1" valueYear={2019} valueWeek={7} title="Start"
                                optionYear={yearoption} optionWeek={weekoption} handleChange={this.handleChange}/>
                <OscarOption className="mr-1" value={"won"} title="Oscar"
                             option={oscar_option} handleChange={this.handleChange}/>
                    <OscarOption className="mr-1" value={"Brooklyn"} title="Add Movie"
                             option={movieoptions} handleChange={this.handleChange}/>

            </div>
            <Row>
                <div className="partition-90">
                    <TimeSeries data={data} oscarweek={2} dataKeys={keys} title={"Weekly Gross"} height={350} name="weekly_gross"/>
                </div>
            </Row>

        </div>)
    }
}

function mapStateToProps(state) {
    const {interval, timeStart, timeEnd} = state.resource
    return {
        interval: interval,
        timeStart: timeStart,
        timeEnd: timeEnd
    }
}

function mapDispatchToProps(dispatch) {
    return {dispatch}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)