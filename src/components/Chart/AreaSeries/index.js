import {
    Area,
    CartesianGrid,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import Paper from "@material-ui/core/Paper";
import React, {Component} from "react";
import moment from "moment"

class AreaSeries extends Component {
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

            <Paper className="paper" style={{borderRadius: "7pt"}}>
                <p className="graph-title">{this.props.title}</p>
                <hr/>
                <ResponsiveContainer width='100%' height={this.props.height}>
                    <AreaChart data={this.props.data}
                               margin={{top: 20, right: 30, left: -10, bottom: 0}}>
                        <defs>
                            {this.renderGradient(this.props.dataKeys, this.props.name)}
                        </defs>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="time" interval={this.getInterval()} tickFormatter={this.getTick} dx={10}/>
                        <YAxis domain={[0, 100]}/>
                        <Tooltip/>
                        {this.renderLine(this.props.dataKeys, this.props.name)}
                    </AreaChart>
                </ResponsiveContainer>
            </Paper>
        )
    }

    renderGradient(datakeys,name) {
        return datakeys.map((item, index) => {
            console.log(item.color)
            return (
                <linearGradient key={index} id={"color_"+name+"_"+item.dataKey} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={item.color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={item.color} stopOpacity={0.1}/>
                </linearGradient>
            );
        });
    }

    renderLine(datakeys,name) {
        return datakeys.map((item, index) => {
            return (
                <Area key={index} dataKey={item.dataKey} stroke={item.color} fillOpacity={1} fill={"url(#color_"+name+"_"+item.dataKey+")"}
                      strokeWidth={1} dot={false}/>
            );
        });
    }
}

export default AreaSeries;