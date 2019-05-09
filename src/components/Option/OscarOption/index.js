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

class OscarOption extends Component {
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
                        disabled={this.props.disabled}
                        InputProps={{disableUnderline: true, className: classes.input}}
                        id="oscar-form"
                        select
                        name={this.props.name}
                        className="option-field w-100"
                        value={this.props.value}
                        onChange={this.props.handleChange}
                        SelectProps={{
                            MenuProps: {
                                className: "w-200 menu-props",
                            },
                        }}
                        margin="normal">

                        <MenuItem className="option-item" key={1} value={true}>
                            true
                        </MenuItem>

                        <MenuItem className="option-item" key={2} value={false}>
                            false
                        </MenuItem>
                    </TextField>
                </FormControl>
            </div>

        )
    }

    renderOption(menu) {
        return menu.map(function (item, index) {
            return (
                <MenuItem className="option-item" key={index} value={item}>
                    {item}
                </MenuItem>
            )
        })
    }

}

Option.propTypes = {
    classes: PropTypes.object.isRequired
};


export default withStyles(styles)(OscarOption)