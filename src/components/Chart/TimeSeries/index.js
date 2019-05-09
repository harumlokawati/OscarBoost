import {
    Line,
    ReferenceLine,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import React, {Component} from "react";

class TimeSeries extends Component {

    getTick(tick) {
        return tick/1000000 + "M";
    }

    renderLabel(){
        return(<p className="color:white;">Nomination Week</p>)
    }
    render() {

        return (
                <ResponsiveContainer width='100%' height={this.props.height}>
                    <LineChart data={this.props.data}
                               margin={{top: 20, right: 30, left: 0, bottom: 0}}>
                        <XAxis stroke="#FFFFFF" dataKey="week" dx={10} label="week"/>
                        <YAxis stroke="#FFFFFF" type="number" tickFormatter={this.getTick} label="gross"/>
                        <Tooltip/>
                        <ReferenceLine x={this.props.oscarweek} stroke="white" label={this.renderLabel} />
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