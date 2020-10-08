// import {Card} from './card';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.minusScore = this.minusScore.bind(this);
		this.getCardToFind = this.getCardToFind.bind(this);
		this.shuffleDeck = this.shuffleDeck.bind(this);
		this.handlePick = this.handlePick.bind(this);
		this.giveUp = this.giveUp.bind(this);
		this.state = {
			timerVisible: true,
			score: 10,
			cards: ['Rachel', 'Monica', 'Ross', 'Joey', 'Chandler', 'Phoebe', 'David', 'Mike', 'Gunther', 'Janice'],
			cardsLeft: ['Rachel', 'Monica', 'Ross', 'Joey', 'Chandler', 'Phoebe', 'David', 'Mike', 'Gunther', 'Janice'],
			cardToFind: '',
			gameComplete: false
		}
	}

	minusScore() {
		this.setState(function (prevState, props) {
			if (prevState.score === 1) {
				return {
					score: 0,
					gameComplete: true
				}
			} else {
				return {score: prevState.score - 1}
			}
		});
	}

	shuffleDeck(array) {
		let currentIndex = array.length, temporaryValue, randomIndex;
		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		this.setState(() => ({cards: array}));
	}

	handlePick(card) {
		this.setState((prevState) => ({cardsLeft: prevState.cardsLeft.filter((cardToRemove) => card !== cardToRemove)}));

		if (this.state.cardsLeft === 0) {
			this.setState(() => ({
				gameComplete: true
			}))
		}

	}

	getCardToFind(array) {
		const cardToFind = array[Math.floor(Math.random() * array.length)];
		this.setState(() => ({cardToFind: cardToFind}));
		this.setState((prevState) => ({cardsLeft: prevState.cardsLeft.filter((cardToRemove) => cardToFind !== cardToRemove)}));
	}

	componentDidMount() {
		this.shuffleDeck(this.state.cards);
		setTimeout(() => {
			this.getCardToFind(this.state.cards);
			this.setState(() => ({timerVisible: false}))
		}, 10000);

	}

	giveUp() {
		this.setState(() => ({gameComplete: true}))
	}

	render() {
		if (this.state.gameComplete) {
			return (
				<div className="text-center">
					<h1>Game over</h1>
					<h3>Score: {this.state.score}</h3>
					<a className="button" href="/">Play again</a>
				</div>
			)
		}
		return (
			<div>
				{this.state.timerVisible ? <Timer timeleft={10}/> :
					<Instructions cardToFind={this.state.cardToFind}/>}
				<h3 className="text-right">Score: {this.state.score}</h3>
				<button onClick={this.giveUp}>Give Up</button>
				<Cards
					cards={this.state.cards}
					cardsLeft={this.state.cardsLeft}
					handlePick={this.handlePick}
					cardToFind={this.state.cardToFind}
					minusScore={this.minusScore}
					getCardToFind={this.getCardToFind}
				/>
			</div>
		)
	}
}

const Instructions = (props) => {
	return (
		<div className="instructions-box">
			<h1>Where is: {props.cardToFind}?</h1>
			<img src={`./img/${props.cardToFind.toLowerCase()}.jpg`}/>
		</div>
	);
};

const Timer = (props) => {
	const [counter, setCounter] = React.useState(props.timeleft);
	// Third Attempts
	React.useEffect(() => {
		const timer =
			counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
		return () => clearInterval(timer);
	}, [counter]);
	return (
		<div className="instructions-box">
			<h1>Remember the cards! Time left: {counter}</h1>
		</div>
	);
};

const Cards = (props) => {
	return (
		<div>
			{props.cards.map((card, index) =>
				<Card key={'card-' + index}
					cards={props.cards}
					cardsLeft={props.cardsLeft}
					handlePick={props.handlePick}
					cardToFind={props.cardToFind}
					minusScore={props.minusScore}
					getCardToFind={props.getCardToFind}
					cardName={card}
				/>
			)}
		</div>
	);
};

class Card extends React.Component {
	constructor(props) {
		super(props);
		this.wrongcard = this.wrongcard.bind(this);
		this.displayCard = this.displayCard.bind(this);
		this.state = {
			visible: true,
			incorrect: false
		}
	}

	wrongcard() {
		this.setState({incorrect: true}, () => {
			setTimeout(() => this.setState({incorrect: false}), 500)
		})
	}

	displayCard(cardToDisplay) {
		if (cardToDisplay === this.props.cardToFind) {
			console.log('correct');
			this.setState((prevState) => ({
				visible: true
			}));

			this.props.handlePick(cardToDisplay);
			this.props.getCardToFind(this.props.cardsLeft);
		} else if (!this.state.visible) {

			this.wrongcard(cardToDisplay);
			this.props.minusScore();
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState(() => ({
				visible: false
			}));
		}, 10000);
	}

	render() {
		const backgroundStyle = {
			backgroundImage: `url(./img/${this.props.cardName.toLowerCase()}.jpg)`
		};

		return (
			<div className={`card ${this.state.visible ? 'visible' : ''} ${this.state.incorrect ? 'incorrect' : ''}`} onClick={(e) => {
				this.displayCard(this.props.cardName)
			}}>
				<div className="card-inner">
					<div className="flip-card-front">
						<span>?</span>
					</div>
					<div className="flip-card-back">
						{this.state.visible &&
						<div style={backgroundStyle} className={`card-img ${this.props.cardName}`}>
							<p>{this.props.cardName}</p>
						</div>}
					</div>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));