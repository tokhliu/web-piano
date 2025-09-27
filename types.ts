
export type KeyType = 'white' | 'black';

export interface PianoKeyData {
  note: string;
  type: KeyType;
  frequency: number;
}
