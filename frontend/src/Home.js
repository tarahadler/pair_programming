import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div>
                <form>
                    <input type="text" ref="twitterHandle" placeholder="Enter a valid Twitter handle." required />  
                    <button onClick={(e) => this.props.onSubmit(e, this.refs.twitterHandle.value) }> 
                        Submit name 
                    </button> 
                </form>
            </div>
        );
    }
}

export default Home;