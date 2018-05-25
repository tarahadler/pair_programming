import React, { Component } from 'react';
import {Line, Doughnut} from 'react-chartjs-2';

class Dashboard extends Component {

    render() {

        //Declaring Engagement Rate variable. 
        let engagementRateJSX = 0;

        //Setting Engagement Rate to two decimal places only. 
        engagementRateJSX = parseFloat((this.props.favTotal+ this.props.retweetTotal) / (this.props.followersTotal) + '').toFixed(2)

        //If Engagement Rate is NaN, set to zero.  
        if (isNaN(engagementRateJSX)) {
            engagementRateJSX = 0;
        }

        //Doughnut Chart: Followers to Following 
        let chart_1_data = {
            labels: ['Followers', 'Following'],
            datasets: [{
                data: [this.props.followersTotal, this.props.followingTotal],
                backgroundColor: ['#fbc619', '#f74f5f'],
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
                backgroundColor: ['#2d335f', '#7dc7a9'],
                borderColor: 'rgba(0,0,0,0)'
            }]
        }

        let chart_2_options = {
            maintainAspectRatio: false,
        }

        // Set a default value for our line chart yAxis
        let yAxisMax = 100;

        // trim and splice the first array (retweets)
        let trimmedArr1 = Array.from(this.props.retweetArr);
        trimmedArr1.splice(10, (this.props.retweetArr.length - 10));

        // trim and splice second array (faves)
        let trimmedArr2 = Array.from(this.props.favArr);
        trimmedArr2.splice(10, (this.props.favArr.length - 10));

        // join the two together into one array
        let joinedArrs = [...trimmedArr1, ...trimmedArr2];

        // sort them lowest to highest
        let trimmedArrSorted = joinedArrs.sort(function(a,b) {
            return a - b;
        });


        // once we know page is loaded, set the yAxisMax to be the highest number in our joined
        // arrays times 1.1 - will be used to set a yAxes on our line chart
        if(this.props.username !== "") {
            yAxisMax = Math.ceil((trimmedArrSorted[trimmedArrSorted.length - 1] * 1.1));
        }

        // Line Chart: Faves and retweets over time
        let chart_3_data = {
            labels: ['1','2','3','4','5','6','7','8','9','10'],
            datasets: [
                {
                    label: "Retweets",
                    borderColor: '#3f7caa',
                    backgroundColor: 'rgba(0,0,0,0)',
                    data: trimmedArr1
                },
                {
                    label: "Favourites",
                    borderColor: '#e36473',
                    backgroundColor: 'rgba(0,0,0,0)',
                    data: trimmedArr2
                }
            ]
        }

        let chart_3_options = {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        max: yAxisMax
                    }
                }]
            }
        }


        /* SCORING */

        // default
        let score = 0;

        // if they are verified
        if(this.props.verifiedStatus === true) {
            score += 10;
        }

        // How many tweets they have
        if(this.props.tweetTotal > 1000) {
            score += 10;
        } else if (this.props.tweetTotal > 750) {
            score += 8;
        } else if (this.props.tweetTotal > 500) {
            score += 6;
        } else if (this.props.tweetTotal > 250) {
            score += 4;
        } else if (this.props.tweetTotal > 100) {
            score += 2;
        } else {
            score += 0;
        }

        // how much engagement they have
        if (engagementRateJSX > 0.7) {
            score += 16;
        } else if (engagementRateJSX > 0.2) {
            score += 11;
        } else if (engagementRateJSX > 0.02) {
            score += 7;
        } else {
            score += 0;
        }

        // How many followers they have
        if (this.props.followersTotal > 1000000) {
            score += 10;
        } else if (this.props.followersTotal > 100000) {
            score += 8;
        } else if (this.props.followersTotal > 1000) {
            score += 6;
        } else if (this.props.followersTotal > 100) {
            score += 4;
        } else if (this.props.followersTotal > 10) {
            score += 2;
        } else {
            score += 0;
        }

        // Do they have more followers than they are following
        if (this.props.followersTotal > this.props.followingTotal) {
            score += 4
        }


        // Follower Count
        // Trim the follower count number for users with over 100,000
        let followersTotalTrimmed = this.props.followersTotal +  '';

        if (this.props.followersTotal > 10000000) {
            followersTotalTrimmed = followersTotalTrimmed.split('').splice(0, 2).join('') + "M";
        } else if (this.props.followersTotal > 1000000) {
            followersTotalTrimmed = followersTotalTrimmed.split('').splice(0, 1).join('') + "M";
        } else if (this.props.followersTotal > 100000) {
            followersTotalTrimmed = followersTotalTrimmed.split('').splice(0, 3).join('') + "K";
        } else {
            followersTotalTrimmed = followersTotalTrimmed;
        }

        // Return
        return (
            <main>
                
                {/* Header (score) */}
                <header className="dashboard__header">
                    <h2>Sitter score for <span>@{this.props.username}</span></h2>
                    <h4>{score * 2}%</h4>
                </header>

                {/* Main grid of data */}
                <section className="grid">

                    <article className="grid__item">
                        <Doughnut data={chart_1_data} options={chart_1_options} width={200} height={200} />
                    </article>

                    <article className="grid__item">
                        <Doughnut data={chart_2_data} options={chart_2_options} width={250} height={200} /> 
                    </article>

                    <article className="grid__item inner-grid">

                        <div className="card">
                            <div className="card__content">
                            <i className="far fa-check-square"></i>
                            <h3>Verified Status</h3>
                            {this.props.verifiedStatus === true ? "Verified" : "Unverified" }
                            </div>
                        </div>

                        <div className="card">
                            <div className="card__content">
                            <i className="far fa-comment"></i> 
                            <h3>Total Tweets</h3>
                            {this.props.tweetTotal}
                            </div>
                        </div>

                        <div className="card">
                            <div className="card__content">
                            <i className="far fa-user-circle"></i>
                            <h3>Followers</h3>
                            {followersTotalTrimmed}
                            </div>
                        </div>

                        <div className="card">
                            <div className="card__content">
                            <i className="far fa-heart"></i>
                            <h3>Engagement</h3>
                            {engagementRateJSX}%
                            </div>
                        </div>

                    </article>

                    <article className="grid__item">
                        <Line data={chart_3_data} options={chart_3_options} height={300} />
                    </article>

                    <article className="grid__item">
                        <blockquote className="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">✔️ updated Tweet compose box <br/><br/>The new Tweet compose box makes it possible for you to move more easily between your Tweet and timeline, so all of your Tweets are on point.</p>&mdash; Twitter (@Twitter) <a href="https://twitter.com/Twitter/status/999033114197446661?ref_src=twsrc%5Etfw">May 22, 2018</a></blockquote>
                    </article>
                    
                    {/* Old stuff */}
                    {/*
                    <h2>Verified Status: {this.props.verifiedStatus === true ? "Verified" : "Unverified" }</h2>
                    <h2>Followers: {this.props.followersTotal}</h2> 
                    <h2>Following: {this.props.followingTotal}</h2>
                    <h2>Total Tweets: {this.props.tweetTotal}</h2> 
                    <h2>retweetArr: {this.props.retweetArr}</h2>
                    <h2>Total Retweets: {this.props.retweetTotal}</h2>
                    <h2>favArr: {this.props.favArr}</h2>
                    <h2>Faves: {this.props.favTotal}</h2>
                    <h2>Engagement Rate: {engagementRateJSX}%</h2>
                    */}
                    
                </section>

            </main>
        );
    }
}

export default Dashboard;