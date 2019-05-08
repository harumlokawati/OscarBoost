import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import {getServiceList} from 'actions/service/overview'
import {connect} from 'react-redux'
import React, {Component} from "react";

import './table.css'

class TableServiceList extends Component {
    state = {
        page: 0,
        rowsPerPage: 5,
    };

    handleChangePage = (event, page) => {
        this.setState({page});
        const {dispatch, start, end} = this.props
        dispatch(getServiceList(start, end,page + 1, this.state.rowsPerPage))
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
        const {dispatch, start, end} = this.props
        dispatch(getServiceList(start, end,this.state.page + 1, event.target.value))
    };

    componentWillMount() {
        const {dispatch, start, end} = this.props
        dispatch(getServiceList(start, end,this.state.page + 1, this.state.rowsPerPage))

    }

    constructor(props) {
        super(props)
    }

    render() {
        let rows = this.props.serviceList.services
        return (
            <Paper className="table-paper" style={{borderRadius: "7pt"}}>
                <p className="table-title">{this.props.title}</p>
                <hr/>
                <div className="table-container">
                    <Table className="table">
                        <TableHead className="table-header">
                            <TableRow>
                                <TableCell>Service</TableCell>
                                <TableCell align="left">Usage</TableCell>
                                <TableCell align="left">Latency</TableCell>
                                <TableCell align="left">Error Rate</TableCell>
                                <TableCell align="left">Bytes In</TableCell>
                                <TableCell align="left">Bytes Out</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.service}>
                                    <TableCell component="th" scope="row">
                                        {row.service}
                                    </TableCell>
                                    <TableCell align="left">{row.usage}%</TableCell>
                                    <TableCell align="left">{row.latency} ms</TableCell>
                                    <TableCell align="left">{row.error_rate}%</TableCell>
                                    <TableCell align="left">{row.bytes_in} bytes</TableCell>
                                    <TableCell align="left">{row.bytes_out} bytes</TableCell>
                                </TableRow>
                            ))}
                            {rows.length < this.state.rowsPerPage && (
                                <TableRow style={{height: 48 * (this.state.rowsPerPage - rows.length)}}>
                                <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={this.props.serviceList.num_of_service}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </div>
            </Paper>
        )
    }
}


function mapStateToProps(state) {
    const {serviceList} = state.serviceOverview
    return {
        serviceList: serviceList
    }
}

function mapDispatchToProps(dispatch) {
    return {dispatch}
}

export default connect(mapStateToProps, mapDispatchToProps)(TableServiceList)