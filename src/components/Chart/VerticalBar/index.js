import Paper from "@material-ui/core/Paper";
import {Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, LabelList} from "recharts";
import React, {Component} from "react";
import './barstack.css'

class VerticalBar extends Component {
    render() {
        return (
            <Paper className="paper" style={{borderRadius: "7pt"}}>
                <p className="graph-title">{this.props.title}</p>
                <hr/>
                <ResponsiveContainer aspect={6.0 / 4.0} width='100%'>
                    <BarChart
                        data={this.props.data}
                        layout="vertical"
                        margin={{
                            top: 20, right: 30, left: 0, bottom: 5,
                        }}
                    >
                        <YAxis dataKey={this.props.axis} interval={0}/>
                        <XAxis type="number"/>
                        <Tooltip/>
                        <Legend/>
                        {this.renderBar(this.props.dataKeys)}
                    </BarChart>
                </ResponsiveContainer>
            </Paper>
        )
    }

    renderBar(datakeys) {
        return datakeys.map((item, index) => {
            return (
                <Bar key={index} dataKey={item.dataKey} stackId="a" fill={item.color} label={{ position:'right'}}/>
            );
        });
    }
}

export default VerticalBar