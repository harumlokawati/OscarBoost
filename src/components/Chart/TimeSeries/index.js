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
        if(Number(tick)>=100000){
            return Number(tick)/1000000 + "M";
        }else {
            return Number(tick)/1000 + "K";
        }
    }

    renderLabel(){
        return(<p className="color:white;">Nomination Week</p>)
    }
    render() {

        return (
                <ResponsiveContainer width='100%' height={this.props.height}>
                    <LineChart data={this.props.data}
                               margin={{top: 20, right: 30, left: 0, bottom: 0}}>
                        <XAxis stroke="#FFFFFF" dataKey="axis" dx={10}/>
                        <YAxis stroke="#FFFFFF" type="number" tickFormatter={this.getTick}/>
                        <Tooltip/>
                        <ReferenceLine x={this.props.oscarweek} stroke="white" />
                        {this.renderLine(this.props.dataKeys)}
                    </LineChart>
                </ResponsiveContainer>
        )
    }

    renderLine(datakeys) {
        return datakeys.map((item, index) => {
            return (
                <Line key={index} dataKey={item.value} stroke={this.getRandomColor()} strokeWidth={1} dot={false}/>
            );
        });
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        console.log(color)
        return color;
    }
}

export default TimeSeries;