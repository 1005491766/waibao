import { StateID, Transition } from "./FsmEnum";
import FSMState from "./FsmState";
import CharacterCtr from "../Character/CharacterCtr";

/**
A Finite State Machine System based on Chapter 3.1 of Game Programming Gems 1 by Eric Dybsand
 
Written by Roberto Cezar Bianchini, July 2010
 
 
How to use:
	1. Place the labels for the transitions and the states of the Finite State System
	    in the corresponding enums.
 
	2. Write new class(es) inheriting from FSMState and fill each one with pairs (transition-state).
	    These pairs represent the state S2 the FSMSystem should be if while being on state S1, a
	    transition T is fired and state S1 has a transition from it to S2. Remember this is a Deterministic FSM. 
	    You can't have one transition leading to two different states.
 
	   Method Reason is used to determine which transition should be fired.
	   You can write the code to fire transitions in another place, and leave this method empty if you
	   feel it's more appropriate to your project.
 
	   Method Act has the code to perform the actions the NPC is supposed do if it's on this state.
	   You can write the code for the actions in another place, and leave this method empty if you
	   feel it's more appropriate to your project.
 
	3. Create an instance of FSMSystem class and add the states to it.
 
	4. Call Reason and Act (or whichever methods you have for firing transitions and making the NPCs
	     behave in your game) from your Update or FixedUpdate methods.
 
	Asynchronous transitions from Unity Engine, like OnTriggerEnter, SendMessage, can also be used, 
	just call the Method PerformTransition from your FSMSystem instance with the correct Transition 
	when the event occurs.
 
 
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE 
AND NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


/// <summary>
/// FSMSystem class represents the Finite State Machine class.
///  It has a List with the States the NPC has and methods to add,
///  delete a state, and to change the current state the Machine is on.
/// </summary>
export default class FSMSystem {
    private states: Array<FSMState>;
    private characterCtr: CharacterCtr;
    // The only way one can change the state of the FSM is by performing a transition
    // Don't change the CurrentState directly
    private currentStateID: StateID;
    public get CurrentStateID(): StateID { { return this.currentStateID; } }
    private currentState: FSMState;
    public get CurrentState(): FSMState { { return this.currentState; } }

    constructor(characterCtr: CharacterCtr) {
        this.characterCtr = characterCtr;
        this.states = new Array<FSMState>();
    }

    /// <summary>
    /// This method places new states inside the FSM,
    /// or prints an ERROR message if the state was already inside the List.
    /// First state added is also the initial state.
    /// </summary>
    public AddState(s: FSMState): void {
        // Check for Null reference before deleting
        if (s == null) {
            console.error("FSM ERROR: Null reference is not allowed");
        }

        // First State inserted is also the Initial state,
        //   the state the machine is in when the simulation begins
        if (this.states.length == 0) {
            s.SetCtr(this.characterCtr);
            this.states.push(s);
            this.currentState = s;
            this.currentStateID = s.ID;
            this.currentState.DoBeforeEntering();
            return;
        }

        // Add the state to the List if it's not inside it
        for (let index = 0; index < this.states.length; index++) {
            const state = this.states[index];
            if (state.ID == s.ID) {
                console.error("FSM ERROR: Impossible to add state " + s.ID + " because state has already been added");
                return;
            }
        }
        s.SetCtr(this.characterCtr);
        this.states.push(s);
    }

    /// <summary>
    /// This method delete a state from the FSM List if it exists, 
    ///   or prints an ERROR message if the state was not on the List.
    /// </summary>
    public DeleteState(id: StateID): void {
        // Check for NullState before deleting
        if (id == StateID.NullStateID) {
            console.error("FSM ERROR: NullStateID is not allowed for a real state");
            return;
        }

        // Search the List and delete the state if it's inside it
        for (let index = 0; index < this.states.length; index++) {
            const state = this.states[index];
            if (state.ID == id) {
                this.states.splice(index, 1);
                return;
            }
        }
        console.error("FSM ERROR: Impossible to delete state " + id + ". It was not on the list of states");
    }

    /// <summary>
    /// This method tries to change the state the FSM is in based on
    /// the current state and the transition passed. If current state
    ///  doesn't have a target state for the transition passed, 
    /// an ERROR message is printed.
    /// </summary>
    public PerformTransition(trans: Transition) {
        // Check for NullTransition before changing the current state
        if (trans == Transition.NullTransition) {
            console.error("FSM ERROR: NullTransition is not allowed for a real transition");
            return;
        }

        // Check if the currentState has the transition passed as argument
        let id: StateID = this.currentState.GetOutputState(trans);
        if (id == StateID.NullStateID) {
            console.error("FSM ERROR: State " + this.currentStateID + " does not have a target state " + " for transition " + trans);
            return;
        }

        // Update the currentStateID and currentState		
        this.currentStateID = id;
        for (let index = 0; index < this.states.length; index++) {
            const state = this.states[index];
            if (state.ID == this.currentStateID) {
                // Do the post processing of the state before setting the new one
                this.currentState.DoBeforeLeaving();

                this.currentState = state;

                // Reset the state to its desired condition before it can reason or act
                this.currentState.DoBeforeEntering();
                break;
            }
        }
    } // PerformTransition()

} //class FSMSystem