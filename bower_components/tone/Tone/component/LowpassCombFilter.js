define(["Tone/core/Tone", "Tone/signal/Signal", "Tone/component/Filter"], function(Tone){

	"use strict";

	/**
	 *  @class A lowpass feedback comb filter. 
	 *         DelayNode -> Lowpass Filter -> feedback
	 *
	 *  @extends {Tone}
	 *  @constructor
	 *  @param {number} [delayTime=0.1] The delay time of the comb filter
	 *  @param {number} [resonance=0.5] The resonance (feedback) of the comb filter
	 *  @param {Tone.Frequency} [dampening=3000] The dampending cutoff of the lowpass filter
	 */
	Tone.LowpassCombFilter = function(){

		Tone.call(this);

		var options = this.optionsObject(arguments, ["delayTime", "resonance", "dampening"], Tone.LowpassCombFilter.defaults);

		/**
		 *  the delay node
		 *  @type {DelayNode}
		 *  @private
		 */
		this._delay = this.input = this.context.createDelay(1);

		/**
		 *  the delayTime
		 *  @type {Tone.Signal}
		 */
		this.delayTime = new Tone.Signal(options.delayTime, Tone.Signal.Units.Time);

		/**
		 *  the lowpass filter
		 *  @type  {BiquadFilterNode}
		 *  @private
		 */
		this._lowpass = this.output = this.context.createBiquadFilter();
		this._lowpass.Q.value = 0;
		this._lowpass.type = "lowpass";
		this._lowpass.frequency.value = options.dampening;

		/**
		 *  the dampening control
		 *  @type {Tone.Signal}
		 */
		this.dampening = new Tone.Signal(this._lowpass.frequency, Tone.Signal.Units.Frequency);

		/**
		 *  the feedback gain
		 *  @type {GainNode}
		 *  @private
		 */
		this._feedback = this.context.createGain();

		/**
		 *  the resonance control
		 *  @type {Tone.Signal}
		 */
		this.resonance = new Tone.Signal(options.resonance, Tone.Signal.Units.Normal);

		//connections
		this._delay.chain(this._lowpass, this._feedback, this._delay);
		this.delayTime.connect(this._delay.delayTime);
		this.resonance.connect(this._feedback.gain);
		this._readOnly(["dampening", "resonance", "delayTime"]);
	};

	Tone.extend(Tone.LowpassCombFilter);

	/**
	 *  the default parameters
	 *  @static
	 *  @const
	 *  @type {Object}
	 */
	Tone.LowpassCombFilter.defaults = {
		"delayTime" : 0.1,
		"resonance" : 0.5,
		"dampening" : 3000
	};

	/**
	 *  clean up
	 *  @returns {Tone.LowpassCombFilter} `this`
	 */
	Tone.LowpassCombFilter.prototype.dispose = function(){
		Tone.prototype.dispose.call(this);
		this._writable(["dampening", "resonance", "delayTime"]);
		this.dampening.dispose();
		this.dampening = null;
		this.resonance.dispose();
		this.resonance = null;
		this._delay.disconnect();
		this._delay = null;
		this._lowpass.disconnect();
		this._lowpass = null;
		this._feedback.disconnect();
		this._feedback = null;
		this.delayTime.dispose();
		this.delayTime = null;
		return this;
	};

	return Tone.LowpassCombFilter;
});