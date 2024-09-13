import React, { Component } from 'react';
import Reset from "../components/layouts/page/login/Reset"
class reset extends Component {
    render() {
        return (
            <div>
                <Reset isMailSend={false} />
            </div>
        );
    }
}

export default reset;