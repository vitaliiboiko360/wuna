
export const NUBMER_OF_CARDS = 54;
export const NUBMER_OF_DECKS = 4;
export const NUMBER_OF_COLOR_CARDS = 13;
export const NUMBER_OF_BLACK_CARDS = 2;

export const enum COLOR {
  BLACK = 0,
  RED,
  GREEN,
  BLUE,
  YELLOW
}

// wild cards
export enum WILD {
  Wild = 14,
  Draw4
}

// red, green, blue, yelow
export enum RED {
  _0 = 16,
  _1,
  _2,
  _3,
  _4,
  _5,
  _6,
  _7,
  _8,
  _9,
  _Reverse,
  _Skip,
  _Draw2
}

export enum GREEN {
  _0 = 32,
  _1,
  _2,
  _3,
  _4,
  _5,
  _6,
  _7,
  _8,
  _9,
  _Reverse,
  _Skip,
  _Draw2
}

export enum BLUE {
  _0 = 48,
  _1,
  _2,
  _3,
  _4,
  _5,
  _6,
  _7,
  _8,
  _9,
  _Reverse,
  _Skip,
  _Draw2
}

export enum YELLOW {
  _0 = 64,
  _1,
  _2,
  _3,
  _4,
  _5,
  _6,
  _7,
  _8,
  _9,
  _Reverse,
  _Skip,
  _Draw2
}

export function isValidCard(idOfCard: number) {
  if (idOfCard == WILD.Draw4
    || idOfCard == WILD.Wild)
    return true;
  if (idOfCard >= RED._0
    && idOfCard <= RED._Draw2)
    return true;
  if (idOfCard >= GREEN._0
    && idOfCard <= GREEN._Draw2)
    return true;
  if (idOfCard >= BLUE._0
    && idOfCard <= BLUE._Draw2)
    return true;
  if (idOfCard >= YELLOW._0
    && idOfCard <= YELLOW._Draw2)
    return true;

  return false;
}

export function isWildCard(idOfCard: number) {
  return (idOfCard == WILD.Draw4 || idOfCard == WILD.Wild);
}

export function getCardColor(idOfCard: number) {
  if (idOfCard & 0b01000000)
    return 4;
  if ((idOfCard & 0b00100000) && (idOfCard & 0b00010000))
    return 3;
  if (idOfCard & 0b00100000)
    return 2;
  if (idOfCard & 0b00010000)
    return 1;

  return 0;
}

export function isValidStartCard(idOfCard: number) {
  return ((idOfCard >= RED._0 && idOfCard <= RED._9) ||
    (idOfCard >= GREEN._0 && idOfCard <= GREEN._9) ||
    (idOfCard >= BLUE._0 && idOfCard <= BLUE._9) ||
    (idOfCard >= YELLOW._0 && idOfCard <= YELLOW._9));
}

export function isReverseCard(idOfCard: number) {
  if (idOfCard == RED._Reverse) {
    return true;
  }
  if (idOfCard == GREEN._Reverse) {
    return true;
  }
  if (idOfCard == BLUE._Reverse) {
    return true;
  }
  if (idOfCard == YELLOW._Reverse) {
    return true;
  }
  return false;
}

export function isSkipOrDrawCard(idOfCard: number) {
  if (idOfCard == RED._Draw2 ||
    idOfCard == RED._Skip ||
    idOfCard == GREEN._Draw2 ||
    idOfCard == GREEN._Skip ||
    idOfCard == BLUE._Draw2 ||
    idOfCard == BLUE._Skip ||
    idOfCard == YELLOW._Draw2 ||
    idOfCard == YELLOW._Skip ||
    idOfCard == WILD.Draw4
  ) {
    return true;
  }
  return false;
}

export function isSkipCard(idOfCard: number) {
  if (idOfCard == RED._Skip ||
    idOfCard == GREEN._Skip ||
    idOfCard == BLUE._Skip ||
    idOfCard == YELLOW._Skip
  ) {
    return true;
  }
  return false;
}

export function isCardPlayable(idOfCard: number, topCard: number) {
  if (idOfCard == WILD.Wild ||
    idOfCard == WILD.Wild
  ) {
    return true;
  }
  if ((idOfCard == RED._Draw2 ||
    idOfCard == GREEN._Draw2 ||
    idOfCard == BLUE._Draw2 ||
    idOfCard == YELLOW._Draw2
  ) && (topCard == RED._Draw2 ||
    topCard == GREEN._Draw2 ||
    topCard == BLUE._Draw2 ||
    topCard == YELLOW._Draw2)) {
    return true;
  }
  if ((idOfCard == RED._Reverse ||
    idOfCard == GREEN._Reverse ||
    idOfCard == BLUE._Reverse ||
    idOfCard == YELLOW._Reverse
  ) && (topCard == RED._Reverse ||
    topCard == GREEN._Reverse ||
    topCard == BLUE._Reverse ||
    topCard == YELLOW._Reverse)) {
    return true;
  }
  if ((idOfCard == RED._Skip ||
    idOfCard == GREEN._Skip ||
    idOfCard == BLUE._Skip ||
    idOfCard == YELLOW._Skip
  ) && (topCard == RED._Skip ||
    topCard == GREEN._Skip ||
    topCard == BLUE._Skip ||
    topCard == YELLOW._Skip)) {
    return true;
  }
  if ((idOfCard == RED._0 ||
    idOfCard == GREEN._0 ||
    idOfCard == BLUE._0 ||
    idOfCard == YELLOW._0
  ) && (topCard == RED._0 ||
    topCard == GREEN._0 ||
    topCard == BLUE._0 ||
    topCard == YELLOW._0)) {
    return true;
  }
  if ((idOfCard == RED._1 ||
    idOfCard == GREEN._1 ||
    idOfCard == BLUE._1 ||
    idOfCard == YELLOW._1
  ) && (topCard == RED._1 ||
    topCard == GREEN._1 ||
    topCard == BLUE._1 ||
    topCard == YELLOW._1)) {
    return true;
  }
  if ((idOfCard == RED._2 ||
    idOfCard == GREEN._2 ||
    idOfCard == BLUE._2 ||
    idOfCard == YELLOW._2
  ) && (topCard == RED._2 ||
    topCard == GREEN._2 ||
    topCard == BLUE._2 ||
    topCard == YELLOW._2)) {
    return true;
  }
  if ((idOfCard == RED._3 ||
    idOfCard == GREEN._3 ||
    idOfCard == BLUE._3 ||
    idOfCard == YELLOW._3
  ) && (topCard == RED._3 ||
    topCard == GREEN._3 ||
    topCard == BLUE._3 ||
    topCard == YELLOW._3)) {
    return true;
  }
  if ((idOfCard == RED._4 ||
    idOfCard == GREEN._4 ||
    idOfCard == BLUE._4 ||
    idOfCard == YELLOW._4
  ) && (topCard == RED._4 ||
    topCard == GREEN._4 ||
    topCard == BLUE._4 ||
    topCard == YELLOW._4)) {
    return true;
  }
  if ((idOfCard == RED._5 ||
    idOfCard == GREEN._5 ||
    idOfCard == BLUE._5 ||
    idOfCard == YELLOW._5
  ) && (topCard == RED._5 ||
    topCard == GREEN._5 ||
    topCard == BLUE._5 ||
    topCard == YELLOW._5)) {
    return true;
  }
  if ((idOfCard == RED._6 ||
    idOfCard == GREEN._6 ||
    idOfCard == BLUE._6 ||
    idOfCard == YELLOW._6
  ) && (topCard == RED._6 ||
    topCard == GREEN._6 ||
    topCard == BLUE._6 ||
    topCard == YELLOW._6)) {
    return true;
  }
  if ((idOfCard == RED._7 ||
    idOfCard == GREEN._7 ||
    idOfCard == BLUE._7 ||
    idOfCard == YELLOW._7
  ) && (topCard == RED._7 ||
    topCard == GREEN._7 ||
    topCard == BLUE._7 ||
    topCard == YELLOW._7)) {
    return true;
  }
  if ((idOfCard == RED._8 ||
    idOfCard == GREEN._8 ||
    idOfCard == BLUE._8 ||
    idOfCard == YELLOW._8
  ) && (topCard == RED._8 ||
    topCard == GREEN._8 ||
    topCard == BLUE._8 ||
    topCard == YELLOW._8)) {
    return true;
  }
  if ((idOfCard == RED._9 ||
    idOfCard == GREEN._9 ||
    idOfCard == BLUE._9 ||
    idOfCard == YELLOW._9
  ) && (topCard == RED._9 ||
    topCard == GREEN._9 ||
    topCard == BLUE._9 ||
    topCard == YELLOW._9)) {
    return true;
  }
  if ((idOfCard >= RED._0 && idOfCard <= RED._Draw2) && (topCard >= RED._0 && topCard <= RED._Draw2)) return true;
  if ((idOfCard >= GREEN._0 && idOfCard <= GREEN._Draw2) && (topCard >= GREEN._0 && topCard <= GREEN._Draw2)) return true;
  if ((idOfCard >= BLUE._0 && idOfCard <= BLUE._Draw2) && (topCard >= BLUE._0 && topCard <= BLUE._Draw2)) return true;
  if ((idOfCard >= YELLOW._0 && idOfCard <= YELLOW._Draw2) && (topCard >= YELLOW._0 && topCard <= YELLOW._Draw2)) return true;

  return false;
}

export function isCardSameColor(idOfCard: number, colorToPlay: number) {
  return getCardColor(idOfCard) == colorToPlay;
}