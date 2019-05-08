import React, {Component} from 'react'
import './option.css'
import PropTypes from "prop-types";
import {FormControl, MenuItem, TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

const styles = {
    input: {
        fontSize: "14px"
    }
};

class IntervalOption extends Component {
    render() {

        const {classes} = this.props;
        return (
            <div className="option-container mr-3 mb-3">
                <div className="title-container">
                    <p className="option-title-text">
                        {this.props.title}</p>
                </div>
                <FormControl className="option-form" style={{
                    paddingLeft: '10px', className: {
                        input: {color: 'white'}
                    }
                }}>
                    <TextField
                        InputProps={{disableUnderline: true, className: classes.input}}
                        id="interval-form"
                        select
                        name={this.props.optionName ? this.props.optionName : "option"}
                        className="option-field w-100"
                        value={this.props.optionValue ? this.props.optionValue : "10s"}
                        onChange={this.props.handleChange}
                        SelectProps={{
                            MenuProps: {
                                className: "w-200",
                            },
                        }}
                        margin="normal">
                        {this.renderOption(this.props.menu)}
                    </TextField>
                </FormControl>
            </div>

        )
    }

    renderOption(menu) {
        return menu.map(function (item, index) {
            return (
                <MenuItem className="option-item" key={index} value={item.value}>
                    {item.text}
                </MenuItem>
            )
        })
    }

}

Option.propTypes = {
    classes: PropTypes.object.isRequired
};


export default withStyles(styles)(IntervalOption)