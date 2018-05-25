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

        let yAxisMax = 100;

        let trimmedArr1 = Array.from(this.props.retweetArr);
        trimmedArr1.splice(10, (this.props.retweetArr.length - 10));

        let trimmedArr2 = Array.from(this.props.favArr);
        trimmedArr2.splice(10, (this.props.favArr.length - 10));

        let joinedArrs = [...trimmedArr1, ...trimmedArr2];

        let trimmedArrSorted = joinedArrs.sort(function(a,b) {
            return a - b;
        });

        if(this.props.username !== "") {
            yAxisMax = Math.ceil((trimmedArrSorted[trimmedArrSorted.length - 1] * 1.1));
        }

        // Line Chart:
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


        /* SCORE */
        let score = 0;

        if(this.props.verifiedStatus === true) {
            score += 10;
        }

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

        if (engagementRateJSX > 0.7) {
            score += 20;
        } else if (engagementRateJSX > 0.2) {
            score += 15;
        } else if (engagementRateJSX > 0.02) {
            score += 10;
        } else {
            score += 0;
        }

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


        /* Follower Count */
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

        /*if (this.props.followersTotal > 10000000) {
            followersTotalTrimmed = this.props.followersTotal.split('').splice(2, 6).join('') + "M";
        } else if (this.props.followersTotal > 1000000) {
            followersTotalTrimmed = this.props.followersTotal.split('').splice(1, 6).join('') + "M";
        } else if (this.props.followersTotal > 100000) {
            followersTotalTrimmed = this.props.followersTotal.split('').splice(3, 3).join('') + "K";
        } else {
            followersTotalTrimmed = this.props.followersTotal;
        }*/



        return (<main>

                <header className="dashboard__header">
                    <h2>This is {this.props.username}'s dashboard.</h2>
                    <h1>Score: {score * 2}% </h1>
                </header>

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
                        Embedded Tweet
                    </article>
                    
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
                    
                    {/*
                    <div className="chart">
                    <Doughnut data={chart_1_data} options={chart_1_options} width={250} height={250}/>
                    </div>
                    <div className="chart">
                    <Doughnut data={chart_2_data} options={chart_2_options} width={250} height={250} /> 
                    </div>
                    <div className="chart-alt">
                    <Line data={chart_3_data} options={chart_3_options} height={400} />
                    </div>
                    */}
                    
                </section>

            </main>
        );
    }
}

export default Dashboard;