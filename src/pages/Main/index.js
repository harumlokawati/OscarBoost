import React, {Component} from 'react'
import './main.css'
import {connect} from "react-redux";
import IntervalOption from "../../components/Option/IntervalOption";
import OscarOption from "../../components/Option/OscarOption";
import MovieOption from "../../components/Option/MovieOption";
import {Col, Row} from "reactstrap";
// import Button from '@material-ui/core/Button';
import {
    getMovieList, setOptions
} from "../../actions/main";
// import moment from "moment";
import TimeSeries from "../../components/Chart/TimeSeries";

let optionWeek = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53]
let yearOption = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]

class Main extends Component {

    componentWillMount() {
        const {dispatch, year_start, week_start, year_end, week_end} = this.props
        dispatch(getMovieList(year_start, week_start, year_end, week_end, false, false))
    }

    handleChange = event => {
        const {dispatch, year_start, week_start, year_end, week_end, nominated, won} = this.props
        console.log(event.target.name, event.target.value, this.props)
        switch (event.target.name) {
            case "year_start":
                dispatch(setOptions(event.target.value, week_start, year_end, week_end, nominated, won))
                return;
            case "year_end":
                dispatch(setOptions(year_start, week_start, event.target.value, week_end, nominated, won))

                return;
            case "week_start":
                dispatch(setOptions(year_start, event.target.value, year_end, week_end, nominated, won))

                return;
            case "week_end":
                dispatch(setOptions(year_start, week_start, year_end, event.target.value, nominated, won))

                return;
            case "nominated":
                dispatch(setOptions(year_start, week_start, year_end, week_end, event.target.value, won))

                return;
            case "won":
                dispatch(setOptions(year_start, week_start, year_end, week_end, nominated, event.target.value))
        }


    }

    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.movieGross)
        let keys = [
            {
                "dataKey": "gross",
                "color": "#cc9933"
            }
        ]
        let data = [
            {week: 50, week_film: 7, gross: 2962990},
            {week: 51, week_film: 8, gross: 2018502},
            {week: 52, week_film: 9, gross: 2227080},
            {week: 1, week_film: 10, gross: 1819964},
            {week: 2, week_film: 11, gross: 1565654},
            {week: 3, week_film: 12, gross: 2914708},
            {week: 4, week_film: 13, gross: 2806850},
            {week: 5, week_film: 14, gross: 2529772},
            {week: 6, week_film: 15, gross: 1755310},
            {week: 7, week_film: 16, gross: 1641848},
        ]
        return (<div className="app">
            <div className="header mb-3">
                <div className="dashboard-text">THE OSCAR BOOST</div>
                <Row>
                    <div className="partition-50 dashboard-title">Every year, Academy of Motion Picture Arts and
                        Sciences nominate several movies as Best Motion Pictures. Although we often think that this
                        award is about appreciation to art and science, there is money looming from behind.
                    </div>
                    <div className="partition-50 dashboard-title">Most movies tend to have a hype. They have high
                        grossing in the first week and then the amount of viewing starts diminishing. However, things
                        are different with Oscar nominated movies. They get a bump in their viewing after the
                        announcement of their nomination
                    </div>

                </Row>
            </div>
            <div className="mb-5">
                <IntervalOption type="start" className="mr-1" valueYear={this.props.year_start}
                                valueWeek={this.props.week_start} title="Start"
                                disabled={this.props.selected_movies.length > 0}
                                optionYear={yearOption} optionWeek={optionWeek} handleChange={this.handleChange}/>
                <IntervalOption type="end" className="mr-1" valueYear={this.props.year_end}
                                valueWeek={this.props.week_end} title="End"
                                disabled={this.props.selected_movies.length > 0}
                                optionYear={yearOption} optionWeek={optionWeek} handleChange={this.handleChange}/>
                <OscarOption name="nominated" className="mr-1" value={this.props.nominated} title="Nominated"
                             disabled={this.props.selected_movies.length > 0}
                             handleChange={this.handleChange}/>
                {/*<OscarOption name="won" className="mr-1" value={this.props.won} title="Awarded"*/}
                {/*             disabled={this.props.selected_movies.length > 0}*/}
                {/*             handleChange={this.handleChange}/>*/}
                <MovieOption movielist={this.props.movieList}/>

            </div>
            <TimeSeries data={this.props.movieGross} oscarweek={'2018/2'} dataKeys={this.props.selected_movies}
                        title={"Weekly Gross"} height={350}
                        name="weekly_gross" categories={this.props.movieCategory}/>


        </div>)
    }
}

function mapStateToProps(state) {
    const {year_start, year_end, week_start, week_end, oscar_selected, selected_movies, movieList, movieGross, nominated, won,movieCategory} = state.resource
    return {
        oscar_selected: oscar_selected,
        selected_movies: selected_movies,
        year_start: year_start,
        year_end: year_end,
        week_start: week_start,
        week_end: week_end,
        movieList: movieList,
        movieGross: movieGross,
        nominated: nominated,
        won: won,
        movieCategory:movieCategory
    }
}

function mapDispatchToProps(dispatch) {
    return {dispatch}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)