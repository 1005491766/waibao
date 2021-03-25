import { Transition, StateID } from "./FsmEnum";
import CharacterCtr from "../Character/CharacterCtr";

/// <summary>
/// This class represents the States in the Finite State System.
/// Each state has a Dictionary with pairs (transition-state) showing
/// which state the FSM should be if a transition is fired while this state
/// is the current state.
/// Method Reason is used to determine which transition should be fired .
/// Method Act has the code to perform the actions the NPC is supposed do if it's on this state.
/// </summary>
export default abstract class FSMState extends Laya.Script3D {
    protected characterCtr: CharacterCtr;
    protected map: Dictionary = new Dictionary();
    protected stateID: StateID;
    public get ID(): StateID { { return this.stateID; } }

    public SetCtr(characterCtr: CharacterCtr) { this.characterCtr = characterCtr }

    public AddTransition(trans: Transition, id: StateID): void {
        // Check if anyone of the args is invalid
        if (trans == Transition.NullTransition) {
            console.error("FSMState ERROR: NullTransition is not allowed for a real transition");
            return;
        }

        if (id == StateID.NullStateID) {
            console.error("FSMState ERROR: NullStateID is not allowed for a real ID");
            return;
        }

        // Since this is a Deterministic FSM,
        //   check if the current transition was already inside the map
        if (this.map.ContainsKey(trans)) {
            console.error("FSMState ERROR: State " + this.stateID + " already has transition " + trans + "Impossible to assign to another state");
            return;
        }

        this.map.Add(trans, id);
    }

    /// <summary>
    /// This method deletes a pair transition-state from this state's map.
    /// If the transition was not inside the state's map, an ERROR message is printed.
    /// </summary>
    public DeleteTransition(trans: Transition) {
        // Check for NullTransition
        if (trans == Transition.NullTransition) {
            console.error("FSMState ERROR: NullTransition is not allowed");
            return;
        }

        // Check if the pair is inside the map before deleting
        if (this.map.ContainsKey(trans)) {
            this.map.Remove(trans);
            return;
        }
        console.error("FSMState ERROR: Transition " + trans + " passed to " + this.stateID + " was not on the state's transition list");
    }

    /// <summary>
    /// This method returns the new state the FSM should be if
    ///    this state receives a transition and 
    /// </summary>
    public GetOutputState(trans: Transition): StateID {
        // Check if the map has this transition
        if (this.map.ContainsKey(trans)) {
            return this.map.Get(trans);
        }
        return StateID.NullStateID;
    }

    /// <summary>
    /// This method is used to set up the State condition before entering it.
    /// It is called automatically by the FSMSystem class before assigning it
    /// to the current state.
    /// </summary>
    public abstract DoBeforeEntering(any?);

    /// <summary>
    /// This method is used to make anything necessary, as reseting variables
    /// before the FSMSystem changes to another one. It is called automatically
    /// by the FSMSystem before changing to a new state.
    /// </summary>
    public abstract DoBeforeLeaving(any?);

    /// <summary>
    /// This method decides if the state should transition to another on its list
    /// NPC is a reference to the object that is controlled by this class
    /// </summary>
    public abstract Reason(any?);

    /// <summary>
    /// This method controls the behavior of the NPC in the game World.
    /// Every action, movement or communication the NPC does should be placed here
    /// NPC is a reference to the object that is controlled by this class
    /// </summary>
    public abstract Act(any?);

} // class FSMState

class Dictionary {
    private _obj = {};
    ContainsKey(key: any) {
        return this._obj[key] != null;
    }

    Add(key: any, value: any) {
        this._obj[key] = value;
    }

    Remove(key: any) {
        delete this._obj[key];
    }

    Get(key) {
        return this._obj[key];
    }
}