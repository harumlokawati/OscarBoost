import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import {getTenantList} from 'actions/tenant/overview'
import {connect} from 'react-redux'
import React, {Component} from "react";

import './table.css'

class TableOverviewTenant extends Component {
    state = {
        page: 0,
        rowsPerPage: 5,
    };

    handleChangePage = (event, page) => {
        this.setState({page});
        const {dispatch} = this.props
        dispatch(getTenantList(page + 1, this.state.rowsPerPage))
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
        const {dispatch} = this.props
        dispatch(getTenantList(this.state.page + 1, event.target.value))
    };

    componentWillMount() {
        const {dispatch} = this.props
        console.log("dispatch")
        dispatch(getTenantList(this.state.page + 1, this.state.rowsPerPage))

    }

    constructor(props) {
        super(props)
    }

    render() {
        let rows = this.props.tenantList
        return (
            <Paper className="table-paper" style={{borderRadius: "7pt"}}>
                <p className="table-title">{this.props.title}</p>
                <hr/>
                <div className="table-container">
                    <Table className="table">
                        <TableHead className="table-header">
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="left">Tenant</TableCell>
                                <TableCell align="left">Plan</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Usage</TableCell>
                                <TableCell align="left">SLA</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        #{row.id}
                                    </TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.plan}</TableCell>
                                    <TableCell align="left">{row.status}</TableCell>
                                    <TableCell align="left"><p className="status-ok">{row.usage_status}</p></TableCell>
                                    <TableCell align="left"><p className="view-sla">view</p></TableCell>
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
                        count={this.props.rows ? this.props.rows : 0}
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
    const {tenantList} = state.tenantOverview
    return {
        tenantList: tenantList
    }
}

function mapDispatchToProps(dispatch) {
    return {dispatch}
}

export default connect(mapStateToProps, mapDispatchToProps)(TableOverviewTenant)