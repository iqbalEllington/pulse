const { Modal } = require("react-bootstrap");
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{"text"}</div>;

const MapModal = ({ show, onHide }) => {
  const defaultProps = {
    center: {
      lat: 30.7046,
      lng: 76.7179,
    },
    zoom: 11,
  };
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Google Map</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {/* <GoogleComponent
         
          apiKey={"AIzaSyAWIVybfiQSwAYbThn21esbnueOHyHa3m0"}
          language={'en'}
          country={'country:in|country:us'}
          currentCoordinates={defaultProps.center}
          coordinates={true}
          locationBoxStyle={'custom-style'}
          locationListStyle={'custom-style-list'}
        //   onChange={(e) => { this.setState({ place: e }) }} 
          /> */}
          {/* <PlacesAutocomplete
        // value={this.state.address}
        // onChange={this.handleChange}
        // onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete> */}
        </div>

        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            bootstrapURLKeys={{
              key: "AIzaSyAWIVybfiQSwAYbThn21esbnueOHyHa3m0",
            }}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
        <div className="d-flex">
          <span>Latitude: </span>
          <span>Longitude: </span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MapModal;
