import Paper from "@material-ui/core/Paper";
import {Cell, PieChart, Pie, ResponsiveContainer} from 'recharts';
import React, {Component} from "react";

const threshold = [{name: 'low', value: 70}, {name: 'medium', value: 15},
    {name: 'high', value: 15}];
const COLORS = ['#00C49F', '#FFBB28', '#FF4F68'];

const renderActiveShape = (props) => {
    const {
        cx, cy,
        fill, payload
    } = props;

    return (
        <g>
            <text x={cx} y={cy} style={{fontSize: 34}} dy={8} textAnchor="middle" fill={fill}>
                {100 - payload.value + "%"}
            </text>
        </g>
    );
};

class Gauge extends Component {

    getColor() {
        if (this.props.value <= 70) {
            return '#00C49F'
        } else if (this.props.value <= 85) {
            return '#FFBB28'
        } else {
            return '#FF4F68'
        }
    }

    getData() {
        return ([
            {name: this.props.name, value: Math.round(this.props.value)},
            {name: "dummy", value: Math.round(100 - this.props.value)}
        ])
    }

    render() {
        return (
            <Paper className="paper" style={{borderRadius: "7pt", minWidth:160}} >
                <p className="graph-title">{this.props.title}</p>
                <hr/>
                <ResponsiveContainer height={this.props.height} width='100%' minWidth={150}>
                    <PieChart margin={{
                        top: 0, right: 10, left: 10, bottom: -60,
                    }}>

                        <Pie
                            startAngle={200}
                            endAngle={-20}
                            data={this.getData()}
                            innerRadius={48}
                            outerRadius={68}
                            fill="#E2E2E2"
                            dataKey="value"
                        />
                        <Pie
                            activeIndex={1}
                            startAngle={200}
                            endAngle={-20}
                            activeShape={renderActiveShape}
                            data={this.getData()}
                            dataKey="value"
                            innerRadius={48}
                            outerRadius={68}
                            fill={this.getColor()}
                        />
                        <Pie
                            data={threshold}
                            startAngle={200}
                            endAngle={-20}
                            innerRadius={70}
                            outerRadius={75}
                            fill="#8884d8"
                            dataKey="value"
                            paddingAngle={1}
                        >
                            {
                                threshold.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </Paper>
        )
    }

}

export default Gauge