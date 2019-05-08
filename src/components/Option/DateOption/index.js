import React, {Component} from 'react'
import './option.css'
import {MuiPickersUtilsProvider, DateTimePicker} from 'material-ui-pickers';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import MomentUtils from "@date-io/moment"

class DateOption extends Component {
    openPicker = e => {
        this.picker.open(e);
    };

    render() {
        return (
            <div className="option-container mr-3 mb-5">
                <div className="title-container">
                    <p className="option-title-text">
                        {this.props.title}</p>
                </div>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DateTimePicker keyboard
                                    className="input-profile date-pickers"
                                    name="dateOfBirth"
                                    autoOk={true}
                                    ref={node => {
                                        this.picker = node;
                                    }}
                                    autoComplete={"off"}
                                    margin="normal"
                                    format='DD MMMM YYYY hh:mm'
                                    openToYearSelection={true}
                                    maxDate={new Date()}
                                    onChange={this.props.handleChange}
                                    value={this.props.value}
                                    InputProps={{
                                        disableUnderline: true,
                                        style: {

                                            fontFamily: ['Muli', 'sans-serif'],
                                            fontSize: 14,
                                            marginTop: 5,
                                            marginLeft: 7
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Icon className="btn-dropdown" onClick={this.openPicker}>
                                                    arrow_drop_down
                                                </Icon>
                                            </InputAdornment>
                                        ),
                                    }}
                    />
                </MuiPickersUtilsProvider>
            </div>

        )
    }
}

export default (DateOption)