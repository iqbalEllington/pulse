// server.autosuggest.js
import React from 'react';
import Autosuggest from 'react-autosuggest';
import CMSService from '../../../services/CMSService';
// import './autosuggest.css';
const cmsServices= new CMSService();
class Autosuggests extends React.Component {
    constructor() {
        super();

        //Define state for value and suggestion collection
        this.state = {
            value: '',
            suggestions: []
        };
    }

    // Filter logic
    getSuggestions = async (value) => {
        const inputValue = value.trim().toLowerCase();
        
        let response = await cmsServices.teamSearch(value) 
        // let data = await response.json()
        response=await (response.props.data.data.filter(
            (person) =>
              ((person.attributes.firstName +" "+ person.attributes.LastName) || "")
                .toLowerCase()
                .includes(inputValue)
          ))
        return response;
    };

    // Trigger suggestions
    getSuggestionValue = suggestion => suggestion.attributes.firstName +" "+ suggestion.attributes.LastName;

    // Render Each Option
    renderSuggestion = suggestion => (
        <span className="sugg-option">
            <span data-agent={suggestion.attributes.firstName + suggestion.attributes.LastName} className="name">
                {suggestion.attributes.firstName} {suggestion.attributes.LastName}
            </span>
        </span>
    );

    // OnChange event handler
    onChange = (event, { newValue }) => {
        this.props.change(newValue)
        this.setState({
            value: newValue
        });
    };

    // Suggestion rerender when user types
    onSuggestionsFetchRequested =async ({ value }) => {
        await this.getSuggestions(value)
            .then(data => {
                if (data.Error) {
                    this.setState({
                        suggestions: []
                    });
                } else {
                    this.setState({
                        suggestions: data
                    });
                }
            })
    };

    // Triggered on clear
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;

        // Option props
        const inputProps = {
            placeholder: 'Agent Name',
            value,
            required:'required',
            className:"white_input",
            onChange: this.onChange
        };

        // Adding AutoSuggest component
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}

export default Autosuggests;