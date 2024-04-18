export interface IHostSetting {
  winAmount: number
}

export interface User {
  email: string
}

export interface GameStats {
  amount: number
}

export enum TurnType {
  TICHU = 'tichu',
  GRAND_TICHU = 'grand_tichu'
}

export enum Team {
  TeamA,
  TeamB
}

export interface IPlayer {
  self: boolean
  isHost: boolean
  id: string
  name: string
  place: number
}

export interface IPlayerSwapTeam {
  gameId: string
  player1: string
  player2: string
}

export interface ICard {
  cardType: CardType
  color?: 'Red' | 'Black' | 'Green' | 'Blue'
}

export type CardType =
  | 'Dog'
  | 'Mahjong'
  | 'Two'
  | 'Three'
  | 'Four'
  | 'Five'
  | 'Six'
  | 'Seven'
  | 'Eight'
  | 'Nine'
  | 'Ten'
  | 'Jack'
  | 'Queen'
  | 'King'
  | 'Ace'
  | 'Phoenix'
  | 'Dragon'

export interface ITeamSlots {
  r1: string | undefined
  r2: string | undefined
  b1: string | undefined
  b2: string | undefined
}

export interface IBoard {
  r1: ICard
  b1: ICard
  r2: ICard
  b2: ICard
}

export type PlayedCard = {
  display: string
  place: number
  value: number
}
