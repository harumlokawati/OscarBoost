import {
    Line,
    CartesianGrid,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import Paper from "@material-ui/core/Paper";
import React, {Component} from "react";
import moment from "moment"

class TimeSeries extends Component {
    getInterval() {
        if (this.props.data) {
            return Math.round(this.props.data.length / 10)
        } else {
            return 1
        }

    }

    getTick(tick) {
        let diff = moment.duration(moment(tick).diff(moment()));
        console.log()
        if (diff.asDays() <= -1) {
            return moment(tick).format('DD/MM HH:mm')
        } else {
            return moment(tick).format('HH:mm')
        }
    }

    render() {

        return (
                <ResponsiveContainer width='100%' height={this.props.height}>
                    <LineChart data={this.props.data}
                               margin={{top: 20, right: 30, left: -10, bottom: 0}}>
                        <XAxis stroke="#FFFFFF" dataKey="time" interval={this.getInterval()} tickFormatter={this.getTick} dx={10}/>
                        <YAxis stroke="#FFFFFF"/>
                        <Tooltip/>
                        {this.renderLine(this.props.dataKeys)}
                    </LineChart>
                </ResponsiveContainer>
        )
    }

    renderLine(datakeys) {
        return datakeys.map((item, index) => {
            return (
                <Line key={index} dataKey={item.dataKey} stroke={item.color} strokeWidth={1} dot={false}/>
            );
        });
    }
}

export default TimeSeries;