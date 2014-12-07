var chessground = require('chessground');
var clock = require('./clock');
var renderPromotion = require('./promotion').view;
var utils = require('../utils');

function renderPlayer(ctrl){
  var clockRunningColor = ctrl.isClockRunning() ? ctrl.data.game.player : null;
  var player = ctrl.data.player;
  var playerInfos = player.user ? [ m('h2', player.user.username),
    m('h3', player.rating) ] : null;
  var children = [
    m('div.infos', playerInfos)
  ];
  if (ctrl.clock)
    children.push(clock.view(ctrl.clock, ctrl.data.player.color, clockRunningColor));
  return m('section.player', children);
}

function renderOpponent(ctrl){
  function renderOpponentInfo(ctrl) {
    var opp = ctrl.data.opponent;
    if (opp.ai) return [ m('h2', 'Stockfish level ' + opp.ai) ];
    else if (opp.user) return [ m('h2', opp.user.id), m('h3', opp.rating) ];
    else return [ m('h2', 'Anonymous') ];
  }

  var clockRunningColor = ctrl.isClockRunning() ? ctrl.data.game.player : null;
  var children = [
    m('div.infos', renderOpponentInfo(ctrl))
  ];
  if (ctrl.clock)
    children.push(clock.view(ctrl.clock, ctrl.data.opponent.color, clockRunningColor));

  return m('section.opponent', children);
}

function renderBoard(ctrl){
  var vw = utils.getViewportDims().vw;
  return m('section#board.grey.merida', { style: { height: vw + 'px' }}, [
    chessground.view(ctrl.chessground), renderPromotion(ctrl)
  ]);
}

module.exports = {
  renderBoard: renderBoard,
  renderPlayer: renderPlayer,
  renderOpponent: renderOpponent
};
