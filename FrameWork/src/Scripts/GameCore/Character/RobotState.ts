// import FSMState from "../Fsm/FsmState";
// import { InputType } from "../Enums";
// import { Transition, StateID } from "../Fsm/FsmEnum";
// import SceneMgr_cscj from "../SceneMgr";
// import EventMgr_csjc from "../../../Event/EventMgr";
// import { EventDef_csjc } from "../../../Event/EventDef";
// import SoundMgr_csjc from "../../../Mgr/SoundMgr";
// import BaseState from "../FsmStates/BaseState";

// enum RobotSubState {
//     Idle,
//     Move,
//     Trans2Caring,
//     Attack,
//     Climbing,
//     Jumping,
//     Falling,
// }

// export default class RobotState extends BaseState {
//     constructor() {
//         super();
//         this.AddTransition(Transition.RobotTrans2Car, StateID.CarState);
//     }
//     private _subState: RobotSubState = RobotSubState.Idle;
//     private _attackTimer: number = 0;
//     protected stateID = StateID.RobotState;
//     public DoBeforeEntering() {
//         if (this.characterCtr.Rigidbody.colliderShape != null) {
//             this.characterCtr.Rigidbody.colliderShape.destroy();
//         }
//         let shape = new Laya.CapsuleColliderShape(0.5, 2);
//         shape.localOffset = new Laya.Vector3(0, 1, 0);
//         this.characterCtr.Rigidbody.colliderShape = shape;
//         this.characterCtr.DisableAttack();
//         this.characterCtr.Sprite3D.name = "Player-Robot";
//         this.characterCtr.FollowObj.transform.localPositionY = 1.5;
//         EventMgr_csjc.dispatch_csjc(EventDef_csjc.TransformEvent, [false]);
//         EventMgr_csjc.dispatch_csjc(EventDef_csjc.Camera_Event_csjc, { CameraOffset: new Laya.Vector3(0, 2, 2), CameraViewForward: 0 });
//         this.characterCtr.EnableAttack();        
//     }
//     public DoBeforeLeaving(any?: any) {
//         this._subState = RobotSubState.Idle;
//     }

//     /**
//      * 反应
//      * 
//      * @param {*} [any] 
//      * 
//      * @memberOf RobotState
//      */
//     public Act(any?: any) {
//         super.Act(any);
//         // if (this._climbOver >= 0) {
//         //     if (this._subState == RobotSubState.Move ||
//         //         this._subState == RobotSubState.Idle ||
//         //     ) {
//         //         this._climbOver -= Laya.timer.delta;;
//         //     }
//         // }
//         /* if (!this.characterCtr.IsTransforming)  */{
//             switch (this._subState) {
//                 case RobotSubState.Idle:
//                     this.IdleMethod();
//                     break;
//                 case RobotSubState.Move:
//                     this.MoveMethod();
//                     break;
//                 case RobotSubState.Attack:
//                     this.AttackMethod();
//                     break;
//                 case RobotSubState.Trans2Caring:
//                     this.Trasform2CarMethod();
//                     break;
//                 case RobotSubState.Jumping:
//                     this.JumpMethod();
//                     break;
//                 case RobotSubState.Falling:
//                     this.Falling();
//                     break;
//                 case RobotSubState.Climbing:
//                     this.ClimbMethod();
//                     break;
//             }
//         }
//     }

//     private AttackMethod() {
//         this.characterCtr.StopMove();
//         this._attackTimer -= Laya.timer.delta;
//         let angle = 0;
//         let spd = 1;
//         if (this.RockerAxis != null) {
//             angle = (Math.atan2(this.RockerAxis.x, this.RockerAxis.y) / 3.14 * 180) + 180;
//             spd = Math.min(1, Math.max(0.7, this.RockerAxis.distance(0, 0)));
//         }
//         if (this.characterCtr.CurrentAni == "Attack1" && this._attackTimer > 600) {
//             this.TrunMethod(angle, spd * 5);
//             this.characterCtr.EnableAttack();
//         }
//         else if (this.characterCtr.CurrentAni == "Attack2" && this._attackTimer < 800 && this._attackTimer > 700) {
//             this.TrunMethod(angle, spd * 5);
//             this.characterCtr.EnableAttack();
//         }
//         if (this._attackTimer <= 200 && this.AttackInput) {
//             if (this.characterCtr.CurrentAni == "Attack1") {
//                 this._attackTimer = 1400;
//                 this.characterCtr.Animator.crossFade("Attack2", 0.1);
//                 this.characterCtr.CurrentAni = "Attack2";
//             }
//             else {
//                 this._attackTimer = 700;
//                 this.characterCtr.Animator.crossFade("Attack1", 0.1);
//                 this.characterCtr.CurrentAni = "Attack1";
//                 SoundMgr_csjc.instance_csjc.playSound_csjc("Attack1");
//             }
//         }
//         else if (this._attackTimer <= 0) {
//             this._subState = RobotSubState.Idle;
//             this.characterCtr.DisableAttack();
//         }
//     }

//     private JumpMethod() {
//         // if(this._attackTimer<)
//         if (this.characterCtr.CurrentAni != "Mutant Jump Attack") {
//             this.characterCtr.CurrentAni = "Mutant Jump Attack";
//             this.characterCtr.Animator.speed = 1;
//             this.characterCtr.Animator.play("Mutant Jump Attack", 0, 0);
//             SoundMgr_csjc.instance_csjc.playSound_csjc("Land");
//         }
//         else if (this.characterCtr.CurrentAni == "Mutant Jump Attack") {
//             if (this.characterCtr.Animator.getCurrentAnimatorPlayState(0).normalizedTime > 0.0
//             ) {
//                 this.characterCtr.Rigidbody.linearVelocity = new Laya.Vector3(0, 10, 0);
//                 this._subState = RobotSubState.Falling;
//             }
//         }
//     }

//     Falling() {
//         if (this.characterCtr.OnGround) {
//             this._subState = RobotSubState.Idle;
//             SoundMgr_csjc.instance_csjc.playSound_csjc("Land");
//         }
//         else if (this.characterCtr.FaceWall) {
//             this._subState = RobotSubState.Climbing;
//         }
//         if (this.characterCtr.CurrentAni != "Falling Idle" && this.characterCtr.Rigidbody.linearVelocity.y < 0) {
//             this.characterCtr.CurrentAni = "Falling Idle";
//             this.characterCtr.Animator.speed = 1;
//             this.characterCtr.Animator.crossFade("Falling Idle", 0.5);
//         }
//         if (this.RockerAxis != null) {
//             let angle = (Math.atan2(this.RockerAxis.x, this.RockerAxis.y) / 3.14 * 180) + 180;
//             let spd = Math.min(1, Math.max(0.7, this.RockerAxis.distance(0, 0)));
//             this.TrunMethod(angle, spd);
//         }
//         EventMgr_csjc.dispatch_csjc(EventDef_csjc.CharacterFalling);
//     }

//     /**
//      * 暂停
//      * 
//      * 
//      * @memberOf CharacterCtr
//      */
//     IdleMethod() {
//         if (!this.characterCtr.OnGround) {
//             this._subState = RobotSubState.Falling;
//         }
//         else if (this.characterCtr.FaceWall) {
//             this._subState = RobotSubState.Climbing;
//         }
//         else if (this.TransformInput) {
//             this._subState = RobotSubState.Trans2Caring;
//         }
//         else if (this.AttackInput) {
//             this._subState = RobotSubState.Attack;
//         }
//         else if (this.RockerAxis != null) {
//             this._subState = RobotSubState.Move;
//         }
//         else if (this.JumpInput) {
//             this._subState = RobotSubState.Jumping;
//         }
//         else {
//             if (this.characterCtr.CurrentAni != "Idle") {
//                 if (this.characterCtr.CurrentAni != "Idle") {
//                     this.characterCtr.CurrentAni = "Idle";
//                     this.characterCtr.Animator.speed = 1;
//                     this.characterCtr.Animator.crossFade("Idle", 0.1);
//                     this.characterCtr.StopMove();
//                 }
//             }
//             EventMgr_csjc.dispatch_csjc(EventDef_csjc.CharacterNormal);
//         }
//     }

//     MoveMethod() {
//         if (!this.characterCtr.OnGround) {
//             this._subState = RobotSubState.Falling;
//         }
//         else if (this.characterCtr.FaceWall) {
//             this._subState = RobotSubState.Climbing;
//         }
//         else if (this.TransformInput) {
//             this._subState = RobotSubState.Trans2Caring;
//         }
//         else if (this.AttackInput) {
//             this._subState = RobotSubState.Attack;
//         }
//         else if (this.JumpInput) {
//             this._subState = RobotSubState.Jumping;
//         }
//         else if (this.RockerAxis != null) {
//             let angle = (Math.atan2(this.RockerAxis.x, this.RockerAxis.y) / 3.14 * 180) + 180;
//             // let spd = Math.min(1, Math.max(0.7, this.RockerAxis.distance(0, 0)));
//             let spd = Math.min(1, Math.max(0.5, this.RockerAxis.distance(0, 0)));            
//             if (this.characterCtr.OnGround && this.characterCtr.CurrentAni != "Run") {
//                 this.characterCtr.Animator.crossFade("Run", 0.1);
//                 this.characterCtr.CurrentAni = "Run";
//             }
//             else {
//                 this.characterCtr.Animator.speed = spd;
//             }
//             this.TrunMethod(angle, spd * 1.5);
//             EventMgr_csjc.dispatch_csjc(EventDef_csjc.CharacterNormal);
//         }
//         else {
//             this._subState = RobotSubState.Idle;
//         }
//     }

//     TrunMethod(angle, spd) {
//         this.characterCtr.TurnAndMove(angle, spd);
//     }

//     Trasform2CarMethod() {
//         if (this.characterCtr.CurrentAni != "Robot_To_Car") {
//             this.characterCtr.CurrentAni = "Robot_To_Car";
//             this.characterCtr.Animator.speed = 1;
//             this.characterCtr.Animator.play("Robot_To_Car", 0, 0);
//             EventMgr_csjc.dispatch_csjc(EventDef_csjc.CharacterFalling);
//         }
//         else if (this.characterCtr.CurrentAni == "Robot_To_Car" && this.characterCtr.Animator.getCurrentAnimatorPlayState(0).normalizedTime >= 1) {
//             this.characterCtr.PerformTransition(Transition.RobotTrans2Car);
//         }
//         this.characterCtr.StopMove();
//         // if (this.characterCtr.FollowObj.transform.localRotationEulerY > this.characterCtr.Model.transform.localRotationEulerY) {
//         //     this.characterCtr.FollowObj.transform.localRotationEulerY -= 3;
//         //     if (this.characterCtr.FollowObj.transform.localRotationEulerY < this.characterCtr.Model.transform.localRotationEulerY) {
//         //         this.characterCtr.FollowObj.transform.localRotationEulerY = this.characterCtr.Model.transform.localRotationEulerY;
//         //     }
//         // }
//         // else if (this.characterCtr.FollowObj.transform.localRotationEulerY < this.characterCtr.Model.transform.localRotationEulerY) {
//         //     this.characterCtr.FollowObj.transform.localRotationEulerY += 3;
//         //     if (this.characterCtr.FollowObj.transform.localRotationEulerY > this.characterCtr.Model.transform.localRotationEulerY) {
//         //         this.characterCtr.FollowObj.transform.localRotationEulerY = this.characterCtr.Model.transform.localRotationEulerY;
//         //     }
//         // }
//         if (this.characterCtr.FollowObj.transform.localPositionY > 0) {
//             this.characterCtr.FollowObj.transform.localPositionY -= 0.01;
//         }
//     }

//     ClimbMethod() {
//         this.characterCtr.StopMove();
//         EventMgr_csjc.dispatch_csjc(EventDef_csjc.CharacterClimbing);
//         if (this.JumpInput) {
//             this._subState = RobotSubState.Falling;
//             let front = new Laya.Vector3();
//             this.characterCtr.Model.transform.localRotationEulerY = 180 - this.characterCtr.Model.transform.localRotationEulerY;
//             this.characterCtr.Model.transform.getForward(front);
//             Laya.Vector3.normalize(front, front);
//             Laya.Vector3.scale(front, -2, front);
//             Laya.Vector3.add(this.characterCtr.Sprite3D.transform.position, front, front);
//             this.characterCtr.Sprite3D.transform.position = front;
//             if (this.characterCtr.Rigidbody.isKinematic) {
//                 this.characterCtr.Rigidbody.isKinematic = false;
//             }
//         }
//         else if (!this.characterCtr.FaceWall) {
//             if (this.characterCtr.CurrentAni != "Braced Hang To Crouch") {
//                 this.characterCtr.Animator.speed = 0.5;
//                 this.characterCtr.Animator.play("Braced Hang To Crouch");
//                 this.characterCtr.CurrentAni = "Braced Hang To Crouch";
//                 SoundMgr_csjc.instance_csjc.playSound_csjc("Land");
//             }
//             else if (this.characterCtr.CurrentAni == "Braced Hang To Crouch" && this.characterCtr.Animator.getCurrentAnimatorPlayState(0).normalizedTime >= 1) {
//                 let front = new Laya.Vector3();
//                 this.characterCtr.Model.transform.getForward(front);
//                 Laya.Vector3.normalize(front, front);
//                 Laya.Vector3.scale(front, -1, front);
//                 front.y = 1;
//                 Laya.Vector3.add(this.characterCtr.Sprite3D.transform.position, front, front);
//                 this.characterCtr.Sprite3D.transform.position = front;
//                 this._subState = RobotSubState.Idle;
//                 if (this.characterCtr.Rigidbody.isKinematic) {
//                     this.characterCtr.Rigidbody.isKinematic = false;
//                 }
//             }
//         }
//         else {
//             if (!this.characterCtr.Rigidbody.isKinematic) {
//                 this.characterCtr.Rigidbody.isKinematic = true;
//             }
//             let y = 0;
//             let x = 0;
//             if (this.RockerAxis != null) {
//                 x = this.RockerAxis.x;
//                 y = this.RockerAxis.y;
//             }
//             if (this.characterCtr.CurrentAni != "Climbing Up Wall") {
//                 this.characterCtr.Animator.play("Climbing Up Wall");
//                 this.characterCtr.CurrentAni = "Climbing Up Wall";
//                 let obj: Laya.HitResult = this.characterCtr.ClimbObj;
//                 let angle = Math.atan2(obj.normal.x, obj.normal.z) / 3.14 * 180;
//                 this.characterCtr.Model.transform.localRotationEulerY = angle + 180;
//                 let dis = obj.point.clone();
//                 dis.y -= 1.5;
//                 this.characterCtr.Sprite3D.transform.position = dis;
//             }
//             else {
//                 this.characterCtr.Animator.speed = -y * 0.3;
//             }
//             let spd = (Laya.timer.delta / 1000) * 2;
//             let right = new Laya.Vector3();
//             this.characterCtr.Model.transform.getRight(right);
//             Laya.Vector3.normalize(right, right);
//             Laya.Vector3.scale(right, spd * -x, right);
//             let pos = this.characterCtr.Sprite3D.transform.position;
//             pos.y += spd * -y;
//             Laya.Vector3.add(pos, right, pos);
//             if (pos.y <= 0.3) pos.y = 0.3;
//             this.characterCtr.Sprite3D.transform.position = pos;
//         }
//     }
// }