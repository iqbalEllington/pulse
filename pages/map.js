import React, { Component } from 'react';
import Googlemap from "../components/map/googlemap";

class map extends Component {
    render() {
        return (
            <div>
                  <Googlemap></Googlemap>
            </div>
        );
    }
}

export default map;