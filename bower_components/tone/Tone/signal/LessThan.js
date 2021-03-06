define(["Tone/core/Tone", "Tone/signal/GreaterThan", "Tone/signal/Negate", "Tone/signal/Signal"], 
function(Tone){

	"use strict";

	/**
	 *  @class  Output 1 if the signal is less than the value, otherwise outputs 0.
	 *          Can compare two signals or a signal and a number. <br><br>
	 *          input 0: left hand side of comparison.<br><br>
	 *          input 1: right hand side of comparison.
	 *  
	 *  @constructor
	 *  @extends {Tone.Signal}
	 *  @param {number} [value=0] the value to compare to the incoming signal
	 *  @example
	 *  var lt = new Tone.LessThan(2);
	 *  var sig = new Tone.Signal(-1).connect(lt);
	 *  //lt outputs 1 because sig < 2
	 */
	Tone.LessThan = function(value){

		Tone.call(this, 2, 0);

		/**
		 *  negate the incoming signal
		 *  @type {Tone.Negate}
		 *  @private
		 */
		this._neg = this.input[0] = new Tone.Negate();

		/**
		 *  input < value === -input > -value
		 *  @type {Tone.GreaterThan}
		 *  @private
		 */
		this._gt = this.output = new Tone.GreaterThan();

		/**
		 *  negate the signal coming from the second input
		 *  @private
		 *  @type {Tone.Negate}
		 */
		this._rhNeg = new Tone.Negate();

		/**
		 *  the node where the value is set
		 *  @private
		 *  @type {Tone.Signal}
		 */
		this._value = this.input[1] = new Tone.Signal(value);

		//connect
		this._neg.connect(this._gt);
		this._value.connect(this._rhNeg);	
		this._rhNeg.connect(this._gt, 0, 1);
	};

	Tone.extend(Tone.LessThan, Tone.Signal);

	/**
	 *  dispose method
	 *  @returns {Tone.LessThan} `this`
	 */
	Tone.LessThan.prototype.dispose = function(){
		Tone.prototype.dispose.call(this);
		this._neg.dispose();
		this._neg = null;
		this._gt.dispose();
		this._gt = null;
		this._rhNeg.dispose();
		this._rhNeg = null;
		this._value.dispose();
		this._value = null;
		return this;
	};

	return Tone.LessThan;
});