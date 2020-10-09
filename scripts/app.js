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

		_this.startGame = _this.startGame.bind(_this);
		_this.state = {
			gameStarted: false
		};
		return _this;
	}

	_createClass(App, [{
		key: 'startGame',
		value: function startGame() {
			this.setState(function () {
				return { gameStarted: true };
			});
		}
	}, {
		key: 'render',
		value: function render() {
			if (!this.state.gameStarted) {
				return React.createElement(WelcomeScreen, { startGame: this.startGame });
			} else {
				return React.createElement(FriendsGame, null);
			}
		}
	}]);

	return App;
}(React.Component);

var FriendsGame = function (_React$Component2) {
	_inherits(FriendsGame, _React$Component2);

	function FriendsGame(props) {
		_classCallCheck(this, FriendsGame);

		var _this2 = _possibleConstructorReturn(this, (FriendsGame.__proto__ || Object.getPrototypeOf(FriendsGame)).call(this, props));

		_this2.useMove = _this2.useMove.bind(_this2);
		_this2.getCardToFind = _this2.getCardToFind.bind(_this2);
		_this2.shuffleDeck = _this2.shuffleDeck.bind(_this2);
		_this2.handlePick = _this2.handlePick.bind(_this2);
		_this2.addPoint = _this2.addPoint.bind(_this2);
		_this2.state = {
			timerVisible: true,
			points: 0,
			movesLeft: 10,
			cards: ['Rachel', 'Monica', 'Ross', 'Joey', 'Chandler', 'Phoebe', 'David', 'Mike', 'Gunther', 'Janice'],
			cardsLeft: ['Rachel', 'Monica', 'Ross', 'Joey', 'Chandler', 'Phoebe', 'David', 'Mike', 'Gunther', 'Janice'],
			cardToFind: '',
			gameComplete: false
		};
		return _this2;
	}

	_createClass(FriendsGame, [{
		key: 'useMove',
		value: function useMove() {
			if (this.state.movesLeft > 1) {
				this.setState(function (prevState, props) {
					return { movesLeft: prevState.movesLeft - 1 };
				});
			} else {
				this.setState(function () {
					return { movesLeft: 0, gameComplete: true };
				});
			}
		}
	}, {
		key: 'addPoint',
		value: function addPoint() {
			this.setState(function (prevState) {
				return { points: prevState.points + 1 };
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
			if (this.state.cardsLeft.length === 0) {
				this.setState({ gameComplete: true });
			} else {
				this.setState(function (prevState) {
					return { cardsLeft: prevState.cardsLeft.filter(function (cardToRemove) {
							return card !== cardToRemove;
						}) };
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
			var _this3 = this;

			this.shuffleDeck(this.state.cards);
			setTimeout(function () {
				_this3.getCardToFind(_this3.state.cards);
				_this3.setState(function () {
					return { timerVisible: false };
				});
			}, 20000);
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.state.gameComplete) {
				return React.createElement(
					'div',
					{ className: 'windows-panel' },
					React.createElement(
						'div',
						{ className: 'header' },
						'Friends.exe'
					),
					React.createElement(
						'div',
						{ className: 'body text-center' },
						React.createElement(
							'h1',
							null,
							this.state.points === 10 ? 'You Win!' : 'Game over!'
						),
						React.createElement('img', { width: 30, src: this.state.points === 10 ? './img/smiley-happy.png' : './img/smiley-dead.png' }),
						React.createElement(
							'h2',
							null,
							'Score: ',
							this.state.points
						),
						this.state.points === 10 ? React.createElement(
							'p',
							null,
							'Congratulations! You found all of the F.R.I.E.N.D.S. Now let\'s celebrate with a meatball sub sandwich and never go on the internet ever again.'
						) : React.createElement(
							'p',
							null,
							'Oh no! You didn\'t find all of your F.R.I.E.N.D.S. Now they\'re trapped in the internet forever! Drown your sorrows with a meatball sub sandwich and never go on the internet ever again.'
						),
						React.createElement(
							'a',
							{ href: '/', className: 'button' },
							'Play Again'
						)
					)
				);
			}
			return React.createElement(
				'div',
				null,
				this.state.timerVisible ? React.createElement(Timer, { timeleft: 20 }) : React.createElement(Instructions, { points: this.state.points, movesLeft: this.state.movesLeft, cardToFind: this.state.cardToFind }),
				React.createElement(Cards, {
					cards: this.state.cards,
					cardsLeft: this.state.cardsLeft,
					handlePick: this.handlePick,
					cardToFind: this.state.cardToFind,
					useMove: this.useMove,
					getCardToFind: this.getCardToFind,
					addPoint: this.addPoint
				})
			);
		}
	}]);

	return FriendsGame;
}(React.Component);

var WelcomeScreen = function WelcomeScreen(props) {
	return React.createElement(
		'div',
		{ className: 'welcome-screen windows-panel text-center' },
		React.createElement(
			'div',
			{ className: 'header' },
			'Friends.exe'
		),
		React.createElement(
			'div',
			{ className: 'body' },
			React.createElement(
				'h1',
				null,
				'The cast of'
			),
			React.createElement('img', { width: 500, src: './img/friendsLogo.png', alt: 'friends' }),
			React.createElement(
				'h1',
				null,
				'Where are they now?'
			),
			React.createElement(
				'h2',
				{ className: 'dark' },
				'Digital Edition'
			),
			React.createElement(
				'p',
				null,
				'Mama Mia! Famous Days of our Lives star Joey Tribbiani has decided to get ',
				React.createElement(
					'em',
					null,
					'on line'
				),
				'. But there\u2019s a problem \u2013 he\'s accidentally spilled marinara sauce from his meatball sub sandwich all over the wires of his new PC, causing each of his F.R.I.E.N.D.S to become ',
				React.createElement(
					'strong',
					null,
					'trapped inside an internet-based card game!'
				)
			),
			React.createElement(
				'p',
				null,
				'Use your memory skills to find the F.R.I.E.N.D hidden behind each of the cards. But be careful - You only have 10 moves to save them. Good Luck!'
			),
			React.createElement(
				'button',
				{ onClick: props.startGame },
				'Start game'
			)
		)
	);
};

var Instructions = function Instructions(props) {
	return React.createElement(
		'div',
		{ className: 'windows-panel' },
		React.createElement(
			'div',
			{ className: 'header' },
			'Friends.exe'
		),
		React.createElement(
			'div',
			{ className: 'instructions-box' },
			React.createElement(
				'div',
				null,
				React.createElement(
					'h1',
					null,
					'Where is: ',
					props.cardToFind,
					'?'
				),
				React.createElement(
					'h2',
					null,
					'Score: ',
					props.points
				),
				React.createElement(
					'h3',
					null,
					'Moves left: ',
					React.createElement(
						'span',
						{ style: { color: props.movesLeft <= 5 && 'red' } },
						props.movesLeft
					)
				)
			),
			React.createElement('img', { className: 'mobile-hide', src: './img/' + props.cardToFind.toLowerCase() + '.jpg' })
		)
	);
};

var Timer = function Timer(props) {
	var _React$useState = React.useState(props.timeleft),
	    _React$useState2 = _slicedToArray(_React$useState, 2),
	    counter = _React$useState2[0],
	    setCounter = _React$useState2[1];

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
		{ className: 'windows-panel' },
		React.createElement(
			'div',
			{ className: 'header' },
			'Friends.exe'
		),
		React.createElement(
			'div',
			{ className: 'instructions-box text-center' },
			React.createElement(
				'h1',
				null,
				'Remember the cards! Game starts in: ',
				counter
			)
		)
	);
};

var Cards = function Cards(props) {
	return React.createElement(
		'div',
		{ className: 'cards-container' },
		props.cards.map(function (card, index) {
			return React.createElement(Card, { key: 'card-' + index,
				cards: props.cards,
				cardsLeft: props.cardsLeft,
				handlePick: props.handlePick,
				cardToFind: props.cardToFind,
				useMove: props.useMove,
				getCardToFind: props.getCardToFind,
				cardName: card,
				addPoint: props.addPoint
			});
		})
	);
};

var Card = function (_React$Component3) {
	_inherits(Card, _React$Component3);

	function Card(props) {
		_classCallCheck(this, Card);

		var _this4 = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

		_this4.wrongcard = _this4.wrongcard.bind(_this4);
		_this4.displayCard = _this4.displayCard.bind(_this4);
		_this4.state = {
			visible: true,
			incorrect: false
		};
		return _this4;
	}

	_createClass(Card, [{
		key: 'wrongcard',
		value: function wrongcard() {
			var _this5 = this;

			this.setState({ incorrect: true, visible: true }, function () {
				setTimeout(function () {
					return _this5.setState({ incorrect: false, visible: false });
				}, 600);
			});
		}
	}, {
		key: 'displayCard',
		value: function displayCard(cardToDisplay) {
			if (!this.state.visible) {
				this.props.useMove();
			}

			if (cardToDisplay === this.props.cardToFind) {
				this.setState(function (prevState) {
					return {
						visible: true
					};
				});

				this.props.handlePick(cardToDisplay);
				this.props.addPoint();
				this.props.getCardToFind(this.props.cardsLeft);
			} else if (!this.state.visible) {
				this.wrongcard(cardToDisplay);
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this6 = this;

			setTimeout(function () {
				_this6.setState(function () {
					return {
						visible: false
					};
				});
			}, 20000);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this7 = this;

			var backgroundStyle = {
				backgroundImage: 'url(./img/' + this.props.cardName.toLowerCase() + '.jpg)'
			};

			return React.createElement(
				'div',
				{ className: 'card ' + (this.state.visible ? 'visible' : '') + ' ' + (this.state.incorrect ? 'incorrect' : ''), onClick: function onClick(e) {
						_this7.displayCard(_this7.props.cardName);
					} },
				React.createElement(
					'div',
					{ className: 'card-inner' },
					React.createElement('div', { className: 'flip-card-front' }),
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
