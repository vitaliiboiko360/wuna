import { ConnectionAndMeta } from './GameManager';
import {
  isWildCard,
  isReverseCard,
  isCardPlayable,
  isCardSameColor,
  isSkipCard,
  WILD,
  RED,
  GREEN,
  BLUE,
  YELLOW,
  isSkipOrDrawCard,
} from './Cards';
import { compare, Game, DRAW1, DRAW2, DRAW4 } from './Game';

const valueSorted = [
  WILD.Wild,
  WILD.Draw4,
  RED._Draw2,
  RED._Skip,
  RED._Reverse,
  RED._9,
  RED._8,
  RED._7,
  RED._6,
  RED._5,
  RED._4,
  RED._3,
  RED._2,
  RED._1,
  RED._0,
];

export function getDrawCardNumber(idOfCard: number) {
  if (
    idOfCard == RED._Draw2 ||
    idOfCard == GREEN._Draw2 ||
    idOfCard == BLUE._Draw2 ||
    idOfCard == YELLOW._Draw2
  ) {
    return DRAW2;
  }
  if (idOfCard == WILD.Draw4) {
    return DRAW4;
  }
  return DRAW1;
}

enum USER {
  _1 = 0,
  _2,
  _3,
  _4,
}

enum COLOR_BUCKET_INDEX {
  RED = 0,
  GREEN,
  BLUE,
  YELLOW,
}

const USERS = 4;
const COLORS = 4;

export function handleWin(player: ConnectionAndMeta, userSeat: number) {
  console.log('WIN!!');
  let arrayToSend: Uint8Array = new Uint8Array(3);
  arrayToSend[0] = userSeat + 1;
  arrayToSend[1] = 1; // indicate he's the winner
  player.send(arrayToSend);
}

function getPlayableCard(
  cardHand: number[] | undefined,
  topCard: number,
  colorToPlay: number
) {
  if (typeof cardHand === 'undefined') {
    return 0;
  }

  let playableCards: number[] = [];
  let wildCards: number[] = [];

  for (let i = 0; i < cardHand.length; i++) {
    const handCard = cardHand[i];
    if (isWildCard(handCard)) {
      wildCards.push(handCard);
    } else if (isCardSameColor(handCard, colorToPlay)) {
      playableCards.push(handCard);
    } else if (isCardPlayable(handCard, topCard)) {
      playableCards.push(handCard);
    }
  }
  // console.log('topCard= ', topCard, ' color=', colorToPlay, ' playableCards.length=', playableCards.length);

  if (playableCards.length != 0) {
    playableCards.sort(compare);
    return playableCards[0];
  }
  if (playableCards.length == 0 && wildCards.length > 0) {
    // we need to set color which is favoriable for us or random
    return (
      wildCards.find((el) => el == WILD.Draw4) ||
      wildCards.find((el) => el == WILD.Wild)
    );
  }

  return 0;
}

export const getNextPlayer = (userSeat: number, isLeftDirection: boolean) => {
  if (isLeftDirection) {
    return (userSeat + 1) % USERS;
  } else {
    return userSeat - 1 == -1 ? USERS - 1 : userSeat - 1;
  }
};

export default function processMove(
  player: ConnectionAndMeta,
  game: Game,
  data: Uint8Array
) {
  let isNextSkip = true;
  let colorToPlay: number = game.topColor;
  let getUserMoveAndSendIt: (userSeat: number) => void;

  getUserMoveAndSendIt = (userSeat: number) => {
    setTimeout(() => {
      if (userSeat == 0) {
        console.log('SOMEONE SPILLED NEXT MOVE TO 0');
        return;
      }

      // const getNextPlayer = () => {
      //   if (game.leftDirection) {
      //     return (userSeat + 1) % USERS;
      //   } else {
      //     return userSeat - 1 == -1 ? USERS - 1 : userSeat - 1;
      //   }
      // };

      // drawing cards and/or skiping move
      //

      let howMuchToDraw: typeof DRAW2 | typeof DRAW4 | typeof DRAW1 = DRAW1;
      if (
        (DRAW1 != (howMuchToDraw = getDrawCardNumber(game.topCard)) ||
          isSkipCard(game.topCard)) &&
        isNextSkip
      ) {
        if (howMuchToDraw > DRAW1) game.drawUserCard(userSeat, howMuchToDraw);

        let nextPlayer: number = getNextPlayer(userSeat, game.leftDirection);
        let arrayToSend: Uint8Array = new Uint8Array(3);
        arrayToSend[0] = userSeat + 1;
        arrayToSend[1] = 0;
        arrayToSend[2] = isSkipCard(game.topCard) ? 0 : howMuchToDraw;
        player.send(arrayToSend);
        isNextSkip = false;
        console.log(
          `\n\t:::userSeat=${userSeat} nextPlayer=${nextPlayer}`,
          `\tplayer :#${userSeat} has drew howMuchToDraw= ${howMuchToDraw} NEW length= ${
            game.getPlayerHand(userSeat)?.length
          }`
        );
        if (nextPlayer == 0) {
          return;
        }
        return getUserMoveAndSendIt(nextPlayer);
      }
      // normal flow
      //
      // console.log('\tcolorToPlay == ', colorToPlay, ' game.topColor=', game.topColor, ' game.topCard=', game.topCard, '\n move we get playing hand userSeat=', userSeat);
      console.log(
        '\t::: Get playable cards for userSeat=',
        userSeat,
        '\t call getPlayableCard with',
        `\t game.topColor=${game.topColor} \tcolorToPlay=${colorToPlay}`
      );
      let move = getPlayableCard(
        game.getPlayerHand(userSeat),
        game.topCard,
        colorToPlay
      );
      if (move == 0) {
        let lastDrawedCard = game.drawUserCard(userSeat, DRAW1);
        move = getPlayableCard([lastDrawedCard], game.topCard, colorToPlay);
        console.log(
          '\t::: No playable cards for userSeat=',
          userSeat,
          `\t drew card: ${lastDrawedCard} ASK again`,
          `\t THE move= ${move} NEW length= ${
            game.getPlayerHand(userSeat)?.length
          }`
        );
      }

      let arrayToSend: Uint8Array = new Uint8Array(3);
      arrayToSend[0] = userSeat + 1;
      arrayToSend[1] = move!;

      if (move == 0) {
        arrayToSend[2] = DRAW1;
      }

      if (move != 0) {
        // we consumed colorToPlay global we need to reset it back to -1
        colorToPlay = -1;
        game.topColor = -1;
        if (isWildCard(move!)) {
          colorToPlay =
            game.UserColorBuckets.getChooseColorToPlayForUser(userSeat);
          arrayToSend[2] = colorToPlay;
          game.topColor = colorToPlay;
          console.log(
            '\n\t\t ::::: IsWildCard ::: USER userSeat= ',
            userSeat,
            ' PICKS colorToPlay= ',
            colorToPlay
          );
        }
        if (isSkipOrDrawCard(move!)) {
          isNextSkip = true;
        }
        const playerCardRemained = game.removeCardUserAndSetItTopCard(
          move!,
          userSeat,
          colorToPlay
        );
        console.log(
          '\n\t ::: VAAALIID MOOVE :: userSeat=',
          userSeat,
          '\t LEFT cards length= ',
          game.getPlayerHand(userSeat)?.length,
          '\t RETURNED playerCardRemained=',
          playerCardRemained
        );

        if (playerCardRemained == 0) {
          player.send(arrayToSend);
          handleWin(player, userSeat);
          return;
        }

        let nextPlayer: number = getNextPlayer(userSeat, game.leftDirection);

        console.log(
          '\n\t ::: VAAALIID MOOVE :: userSeat=',
          userSeat,
          ' \t move= ',
          move,
          '\t game.topColor= ',
          game.topColor,
          '\t nextPlayer= ',
          nextPlayer
        );

        if (nextPlayer == 0) {
          console.log('\n\t\t :::: NEXT USER nextPlayer= ', nextPlayer);
          player.send(arrayToSend);

          if (isSkipOrDrawCard(move!)) {
            console.log('::: SKIP card would be NEXT :');
            return getUserMoveAndSendIt(
              getNextPlayer(userSeat, game.leftDirection)
            );
          }
          if (0 == getPlayableCard(game.getPlayerHand(0), move!, colorToPlay)) {
            let arrayToSend: Uint8Array = new Uint8Array(3);
            arrayToSend[0] = USER._1 + 1; // client has player numbering from 1..4
            arrayToSend[1] = game.drawUserCard(USER._1, DRAW1);
            arrayToSend[2] = 111;
            player.send(arrayToSend);
            console.log(
              `\t:Pre-check :#1: nextPlayer=${nextPlayer}\t has found no moves:!:!:!:`
            );
            return;
          }

          return;
        }

        console.log('::::::');
        player.send(arrayToSend);
        return getUserMoveAndSendIt(nextPlayer);
      }

      let nextPlayer = getNextPlayer(userSeat, game.leftDirection);
      // console.log('PROCESS_MOVE: ', userSeat, '# player moved\n',
      //   'move= ', move, '\n',
      //   'color= ', game.topColor,
      //   'next player is ', nextPlayer);
      console.log(
        '\n\t::::END:::: nextPlayer=',
        nextPlayer,
        '\tsending move arrayToSend...\n'
      );
      if (nextPlayer == 0) {
        player.send(arrayToSend);
        if (
          0 == getPlayableCard(game.getPlayerHand(USER._1), move!, colorToPlay)
        ) {
          let arrayToSend: Uint8Array = new Uint8Array(3);
          arrayToSend[0] = USER._1 + 1; // client has player numbering from 1..4
          arrayToSend[1] = game.drawUserCard(USER._1, DRAW1);
          player.send(arrayToSend);
          console.log(
            `\t:Pre-check :#2: nextPlayer=${nextPlayer}\t has found no moves:!:!:!:`
          );
          return;
        }
        return;
      }
      player.send(arrayToSend);
      return getUserMoveAndSendIt(nextPlayer);
    }, 1500);
  };

  // entry point recursion
  //
  if (game.leftDirection) {
    getUserMoveAndSendIt(USER._2);
  } else {
    getUserMoveAndSendIt(USER._4);
  }
}
