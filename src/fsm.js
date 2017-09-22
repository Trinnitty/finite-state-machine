class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
    	if (!config) {
    		throw new Error("Ошибка в данных");
  		}
    	this.state = config.initial;
        this.config = config;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
    	return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        for(var key in this.config.states){
           if (key==state) {
            this.state = state;
            }  
        }
        if(this.state !== state){
        throw new Error("Ошибка в данных");
        }
    }
    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
       this.state = this.state.event;
    }
    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var arr = [];
        var i = 0;
        for(var key in this.config.states){
                arr[i] = key;
                i++;
            }
        if(!event){            
            return arr;
        }
        // for(var k in this.config.states){
        //    if (k ==state) {
        //     this.state = state;
        //     }  
        // }
        for(var g = arr.length-1; g>=0; g--){
            if(arr[g] !== event){
                arr.pop();
            }
        }
        return arr;

    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
