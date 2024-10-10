export interface UserInterface {
  cardsNumber: number;
  newCardsAddedNumber: number;
  avatarId: number;
  seatNumber: number;
}

export const initialState: UserInterface = {
  cardsNumber: 0,
  newCardsAddedNumber: 0,
  avatarId: 0,
  seatNumber: 0,
};
