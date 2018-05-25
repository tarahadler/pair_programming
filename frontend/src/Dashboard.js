import React, { Component } from 'react';
import {Line, Doughnut} from 'react-chartjs-2';

class Dashboard extends Component {

    render() {

        //Declaring Engagement Rate variable. 
        let engagementRateJSX = 0;

        //Setting Engagement Rate to two decimal places only. 
        engagementRateJSX = parseFloat((this.props.favTotal+ this.props.retweetTotal) / (this.props.followersTotal) + "").toFixed(2)

        //If Engagement Rate is NaN, set to zero.  
        if (isNaN(engagementRateJSX)) {
            engagementRateJSX = 0;
        }

        //Doughnut Chart: Followers to Following 
        let chart_1_data = {
            labels: ['Followers', 'Following'],
            datasets: [{
                data: [this.props.followersTotal, this.props.followingTotal],
                backgroundColor: ['#DED419', '#78BDA7'],
                borderColor: 'rgba(0,0,0,0)'
            }]
        }

        let chart_1_options = {
            maintainAspectRatio: false,
        }

        //Doughnut Chart: Faves to Retweets
        let chart_2_data = {
            labels: ['Faves', 'Retweets'],
            datasets: [{
                data: [this.props.favTotal, this.props.retweetTotal],
                backgroundColor: ['salmon', 'red'],
                borderColor: 'rgba(0,0,0,0)'
            }]
        }

        let chart_2_options = {
            maintainAspectRatio: false,
        }

        return (
            <div>
                <h1>This {this.props.username}'s dashboard.</h1>
                <h2>Verified Status: {this.props.verifiedStatus === true ? "Verified" : "Unverified" }</h2>
                <h2>Followers: {this.props.followersTotal}</h2> 
                <h2>Following: {this.props.followingTotal}</h2>
                <h2>Total Tweets: {this.props.tweetTotal}</h2> 
                {/* <h2>retweetArr: {this.props.retweetArr}</h2> */}
                <h2>Total Retweets: {this.props.retweetTotal}</h2>
                {/* <h2>favArr: {this.props.favArr}</h2> */}
                <h2>Faves: {this.props.favTotal}</h2>
                <h2>Engagement Rate: {engagementRateJSX}%</h2>

                <Doughnut data={chart_1_data} options={chart_1_options} width={250} height={250}/>
                <Doughnut data={chart_2_data} options={chart_2_options} width={250} height={250} /> 
                
                
            </div>
        );
    }
}

export default Dashboard;