import React from 'react';
import axios from 'axios';
export default class Filter extends React.Component {
  constructor(props){
    super(props);
  this.state = {
    yearFilter: [],
    filterdata: this.props.find,
  }
}

  componentDidMount() {
    axios.get(`https://api.spacexdata.com/v3/launches?limit=100&amp;launch_success=true`)
      .then(res => {
        const yearFilter = res.data;
        this.setState({ yearFilter });
      })
      this.setState({
        filterdata: this.props.find
      });
  }
  getLaunchYears () {
    let years = this.state.yearFilter.map(launch => launch.launch_year);
    years = years.filter((value, index, self) => (self.indexOf(value) == index));
    return years;
  }
  getLaunch() {
    let success = this.state.yearFilter.map(launch => launch.launch_success);
    success = success.filter((value, index, self) => (self.indexOf(value) == index));
    return success;
  }
  getLanding(){
    let success = this.state.yearFilter.map(launch => launch.rocket);
    success.filter((value, index, self) => (self.indexOf(value) == index));
    return success;
  }
  handleClick = year => {
    debugger;
    let filterdata = [];
      filterdata = this.props.find.filter(
        data => data.launch_year === year
    );
    this.setState({ filterdata });
  }
  render() {
    const renderAll = this.state.filterdata.map((filterlist,index) => (
      <li key={index}>{filterlist.launch_year}</li>
    ));
    return (
      <>
      
      <div className="filter_year">
      <h2>Filters</h2>
      <div>
      <span>Launch Year</span>
      <ul>
      {this.getLaunchYears().map((data,index) => <li key={index} onClick ={this.handleClick.bind(this, data)}>{data}</li>)  
      }
      </ul>
      <p>year example Filter: {renderAll}</p>
      </div>
      <span>Sucsessful Launch</span>
      <ul>
      {this.getLaunch().map((sucessdata,index) => <li key={index}>{sucessdata ? "true" : "false"}</li>)  
      }
      </ul>
      <span>Sucsessful Landing</span>
      <ul>
      {this.getLanding().map((data,index) => <li key={index}>{data.first_stage.cores[0].land_success ? "true" : "false"}</li>) 
       }
      </ul>
      </div>
      </>
    )
  }
}