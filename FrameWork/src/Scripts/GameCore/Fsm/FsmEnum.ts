/// <summary>
/// Place the labels for the Transitions in this enum.
/// Don't change the first label, NullTransition as FSMSystem class uses it.
/// </summary>
export enum Transition {
    NullTransition, // Use this transition to represent a non-existing transition in your system,
    TRex2Pter,
    Pter2TRex,
    KingKong2,
    Trex2Kingkong,
    Kingkong2Trex

}

/// <summary>
/// Place the labels for the States in this enum.
/// Don't change the first label, NullTransition as FSMSystem class uses it.
/// </summary>
export enum StateID {
    NullStateID, // Use this ID to represent a non-existing State in your system	
    TRex,
    Pter,
    KingKong
}
