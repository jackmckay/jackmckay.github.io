'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import {Card} from './card';

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.minusScore = _this.minusScore.bind(_this);
		_this.getCardToFind = _this.getCardToFind.bind(_this);
		_this.shuffleDeck = _this.shuffleDeck.bind(_this);
		_this.handlePick = _this.handlePick.bind(_this);
		_this.giveUp = _this.giveUp.bind(_this);
		_this.state = {
			timerVisible: true,
			score: 10,
			cards: ['Rachel', 'Monica', 'Ross', 'Joey', 'Chandler', 'Phoebe', 'David', 'Mike', 'Gunther', 'Janice'],
			cardsLeft: ['Rachel', 'Monica', 'Ross', 'Joey', 'Chandler', 'Phoebe', 'David', 'Mike', 'Gunther', 'Janice'],
			cardToFind: '',
			gameComplete: false
		};
		return _this;
	}

	_createClass(App, [{
		key: 'minusScore',
		value: function minusScore() {
			this.setState(function (prevState, props) {
				if (prevState.score === 1) {
					return {
						score: 0,
						gameComplete: true
					};
				} else {
					return { score: prevState.score - 1 };
				}
			});
		}
	}, {
		key: 'shuffleDeck',
		value: function shuffleDeck(array) {
			var currentIndex = array.length,
			    temporaryValue = void 0,
			    randomIndex = void 0;
			while (currentIndex !== 0) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}
			this.setState(function () {
				return { cards: array };
			});
		}
	}, {
		key: 'handlePick',
		value: function handlePick(card) {
			this.setState(function (prevState) {
				return { cardsLeft: prevState.cardsLeft.filter(function (cardToRemove) {
						return card !== cardToRemove;
					}) };
			});

			if (this.state.cardsLeft === 0) {
				this.setState(function () {
					return {
						gameComplete: true
					};
				});
			}
		}
	}, {
		key: 'getCardToFind',
		value: function getCardToFind(array) {
			var cardToFind = array[Math.floor(Math.random() * array.length)];
			this.setState(function () {
				return { cardToFind: cardToFind };
			});
			this.setState(function (prevState) {
				return { cardsLeft: prevState.cardsLeft.filter(function (cardToRemove) {
						return cardToFind !== cardToRemove;
					}) };
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.shuffleDeck(this.state.cards);
			setTimeout(function () {
				_this2.getCardToFind(_this2.state.cards);
				_this2.setState(function () {
					return { timerVisible: false };
				});
			}, 10000);
		}
	}, {
		key: 'giveUp',
		value: function giveUp() {
			this.setState(function () {
				return { gameComplete: true };
			});
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.state.gameComplete) {
				return React.createElement(
					'div',
					{ className: 'text-center' },
					React.createElement(
						'h1',
						null,
						'Game over'
					),
					React.createElement(
						'h3',
						null,
						'Score: ',
						this.state.score
					),
					React.createElement(
						'a',
						{ className: 'button', href: '/' },
						'Play again'
					)
				);
			}
			return React.createElement(
				'div',
				null,
				this.state.timerVisible ? React.createElement(Timer, { timeleft: 10 }) : React.createElement(Instructions, { cardToFind: this.state.cardToFind }),
				React.createElement(
					'h3',
					{ className: 'text-right' },
					'Score: ',
					this.state.score
				),
				React.createElement(
					'button',
					{ onClick: this.giveUp },
					'Give Up'
				),
				React.createElement(Cards, {
					cards: this.state.cards,
					cardsLeft: this.state.cardsLeft,
					handlePick: this.handlePick,
					cardToFind: this.state.cardToFind,
					minusScore: this.minusScore,
					getCardToFind: this.getCardToFind
				})
			);
		}
	}]);

	return App;
}(React.Component);

var Instructions = function Instructions(props) {
	return React.createElement(
		'div',
		{ className: 'instructions-box' },
		React.createElement(
			'h1',
			null,
			'Where is: ',
			props.cardToFind,
			'?'
		),
		React.createElement('img', { src: './img/' + props.cardToFind.toLowerCase() + '.jpg' })
	);
};

var Timer = function Timer(props) {
	var _React$useState = React.useState(props.timeleft),
	    _React$useState2 = _slicedToArray(_React$useState, 2),
	    counter = _React$useState2[0],
	    setCounter = _React$useState2[1];
	// Third Attempts


	React.useEffect(function () {
		var timer = counter > 0 && setInterval(function () {
			return setCounter(counter - 1);
		}, 1000);
		return function () {
			return clearInterval(timer);
		};
	}, [counter]);
	return React.createElement(
		'div',
		{ className: 'instructions-box' },
		React.createElement(
			'h1',
			null,
			'Remember the cards! Time left: ',
			counter
		)
	);
};

var Cards = function Cards(props) {
	return React.createElement(
		'div',
		null,
		props.cards.map(function (card, index) {
			return React.createElement(Card, { key: 'card-' + index,
				cards: props.cards,
				cardsLeft: props.cardsLeft,
				handlePick: props.handlePick,
				cardToFind: props.cardToFind,
				minusScore: props.minusScore,
				getCardToFind: props.getCardToFind,
				cardName: card
			});
		})
	);
};

var Card = function (_React$Component2) {
	_inherits(Card, _React$Component2);

	function Card(props) {
		_classCallCheck(this, Card);

		var _this3 = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

		_this3.wrongcard = _this3.wrongcard.bind(_this3);
		_this3.displayCard = _this3.displayCard.bind(_this3);
		_this3.state = {
			visible: true,
			incorrect: false
		};
		return _this3;
	}

	_createClass(Card, [{
		key: 'wrongcard',
		value: function wrongcard() {
			var _this4 = this;

			this.setState({ incorrect: true }, function () {
				setTimeout(function () {
					return _this4.setState({ incorrect: false });
				}, 500);
			});
		}
	}, {
		key: 'displayCard',
		value: function displayCard(cardToDisplay) {
			if (cardToDisplay === this.props.cardToFind) {
				console.log('correct');
				this.setState(function (prevState) {
					return {
						visible: true
					};
				});

				this.props.handlePick(cardToDisplay);
				this.props.getCardToFind(this.props.cardsLeft);
			} else if (!this.state.visible) {

				this.wrongcard(cardToDisplay);
				this.props.minusScore();
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this5 = this;

			setTimeout(function () {
				_this5.setState(function () {
					return {
						visible: false
					};
				});
			}, 10000);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this6 = this;

			var backgroundStyle = {
				backgroundImage: 'url(./img/' + this.props.cardName.toLowerCase() + '.jpg)'
			};

			return React.createElement(
				'div',
				{ className: 'card ' + (this.state.visible ? 'visible' : '') + ' ' + (this.state.incorrect ? 'incorrect' : ''), onClick: function onClick(e) {
						_this6.displayCard(_this6.props.cardName);
					} },
				React.createElement(
					'div',
					{ className: 'card-inner' },
					React.createElement(
						'div',
						{ className: 'flip-card-front' },
						React.createElement(
							'span',
							null,
							'?'
						)
					),
					React.createElement(
						'div',
						{ className: 'flip-card-back' },
						this.state.visible && React.createElement(
							'div',
							{ style: backgroundStyle, className: 'card-img ' + this.props.cardName },
							React.createElement(
								'p',
								null,
								this.props.cardName
							)
						)
					)
				)
			);
		}
	}]);

	return Card;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
