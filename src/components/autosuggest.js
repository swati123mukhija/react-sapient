import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class Autocomplete extends Component {
  constructor(props) {
    super(props);
      this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.setState({
      filteredSuggestions: this.props.suggestions
    });
  }
  handleChange = e => {
    debugger;
    let currentList = [];
    let newList = [];
    const userInput = e.currentTarget.value;
    const { suggestions } = this.props;
    if (userInput !== "") {
      currentList = suggestions;
      newList = currentList.filter(
      suggestion =>{
      const lc = suggestion.title.toString().toLowerCase();
        const filter = userInput.toLowerCase();
        return lc.includes(filter);
    });
  }else{
    newList = suggestions.title;
  }
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: newList,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  render() {
    const {
      handleChange,
      onClick,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
        <li className={className} key={suggestion.mal_id} onClick={onClick}>
                  {suggestion.title}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }
    return (
      <Fragment>
        <input type="text" onChange={this.handleChange} value={userInput} />
        <button className="gobtn" onClick={this.handleChange}>GO</button>
        {suggestionsListComponent}
      </Fragment>
    );
  }
}
export default Autocomplete;
