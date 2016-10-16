import React from 'react';
import '../stylesheets/InputButton.scss';
import cx from 'classnames';

class InputCard extends React.Component {

	handleClick = () => {
		const data = {
			group_ID: this.props.pageStore.get('roomID'),
			person_ID: this.props.userStore.getIn(['user', 'id']),
			answer: this.props.answer.toJS()
		}
    this.props.socket.emit('answer', data, (nextQuestion) => {
    	if (nextQuestion) {
    		//last one to emit response

    		this.props.actions.startVote(nextQuestion);
    	}
    	this.props.actions.finishedQuestion();
    });
  }

	render() {
		return (
			<div className='container'>
				<h3 onClick={this.handleClick}>{this.props.name}</h3>
				<div className='col-md-3'>
					<img src={this.props.rating} />
				</div>
				<div className='row'>
					<img src={this.props.image} />
				</div>
				<ul className='list-group'>
					{this.props.categories.map((categoryName, i) => 
						<li key={categoryName + i}
								className='list-group-item'>
								{categoryName}
						</li>
					)}
				</ul>
			</div>
		);
	}
}

export default InputCard;