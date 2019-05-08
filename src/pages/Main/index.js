import React, {Component} from 'react'
import './main.css'
import {connect} from "react-redux";
import DateOption from "../../components/Option/DateOption";
import IntervalOption from "../../components/Option/IntervalOption";
import Gauge from "../../components/Chart/Gauge";
import {Col, Row} from "reactstrap";
import {
    setOptionTimeEnd,
    setOptionTimeStart,
    setOptionInterval,
} from "../../actions/main";
import moment from "moment";
import Number from "../../components/Chart/Number";
import AreaSeries from "../../components/Chart/AreaSeries";

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
                "color": "#82ca9d"
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
        return (<div className="app">
            <div className="header">
                <div className="dashboard-text">DASHBOARD</div>
                <div className="dashboard-title">Resource Overview</div>
            </div>
            <DateOption className="mr-1" value={this.props.timeStart} title="Start"
                        handleChange={this.handleDateStartChange}/>
            <DateOption className="mr-1" value={this.props.timeEnd} title="End"
                        handleChange={this.handleDateEndChange}/>
            <IntervalOption className="mr-1" optionValue={"won"} optionName="oscar" title="Oscar"
                            menu={oscar_option} handleChange={this.handleChange}/>
            <IntervalOption className="mr-1" optionValue={"yes"} optionName="movie" title="Movie"
                            menu={["hello","yes"]} handleChange={this.handleChange}/>
            <Row>
                <div className="partition-16">
                    <Gauge name="pintar" title="Pintar" value={90} height={130}/>
                </div>
                <div className="partition-16">
                    <Number title="Number of Movie" value={20}
                            unit="movie"/>
                </div>
                <div className="partition-80">
                    <AreaSeries data={[{"gross":90, "time":moment()}]} dataKeys={keys} title={"Weekly Gross"} height={350} name="weekly_gross"/>
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