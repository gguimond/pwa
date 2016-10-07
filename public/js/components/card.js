import React from 'react';

const Card = React.createClass({
    componentDidMount() {
        componentHandler.upgradeElement(this.refs.myCard);
    },
    componentDidUpdate() {
        console.log("update");
        componentHandler.upgradeElement(this.refs.myCard);
    },
    render() {
        return (
            <div className="demo-card mdl-card mdl-shadow--2dp" ref="myCard">
              <div className="mdl-card__title">
                <h2 className="mdl-card__title-text">{this.props.card.title}</h2>
              </div>
              <div className="mdl-card__supporting-text">
                {this.props.card.content}
              </div>
              <div className="mdl-card__actions mdl-card--border">
                <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.props.updateCard}>
                  Update
                </a>
              </div>
              <div className="mdl-card__menu">
                <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                  <i className="material-icons">share</i>
                </button>
              </div>
            </div>
        );
    }
});

export default Card;