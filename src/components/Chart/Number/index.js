import React, {Component} from 'react'
import './number.css'
import Paper from "@material-ui/core/Paper";

class Number extends Component {
    render() {
        return (
            <Paper className="paper" style={{borderRadius: "7pt"}}>

                <p className="graph-title">
                    {this.props.title}
                </p>
                <hr/>
                <div className="value-container">
                    <div className="value">
                        <span className="number-graph">{this.props.value}</span>
                        <span className="unit">   {this.props.unit}</span>
                    </div>
                </div>
            </Paper>
        )
    }
}

export default Number