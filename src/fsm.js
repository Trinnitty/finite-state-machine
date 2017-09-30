class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
    	if (!config) {
    		throw new Error("Ошибка в данных");
  		}
        this.config = config;
    	 this.state = this.config.initial;
       
        this.currentStates = ['normal'];
        this.undoStates = [];
        this.redoStates = [];
       
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
    	return this.state = this.currentStates[this.currentStates.length-1];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        for(var key in this.config.states){
           if (key==state) {
            this.state = state;
            this.currentStates.push(state);
            }  
        }
        if(this.state !== state){
        throw new Error("Ошибка в данных");
        }
        this.undoStates = [];
    }
    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.undoStates = [];

        if(this.state == 'normal'){
            if(event == 'study'){
                this.state = this.config.states.normal.transitions.study;
                this.currentStates.push('busy');
            } 
        } else if(this.state == 'busy'){
            if(event == 'get_tired'){
                this.state = this.config.states.busy.transitions.get_tired;
                this.currentStates.push('sleeping');
            } else  if(event == 'get_hungry'){
                this.state = this.config.states.busy.transitions.get_hungry;
                this.currentStates.push('hungry');
            } else {
              throw new Error("Ошибка в данных");
            }
            
        }else if(this.state == 'hungry'){
            if(event == 'eat'){
                this.state = this.config.states.hungry.transitions.eat;
                this.currentStates.push('normal');
            }
        }else if(this.state == 'sleeping'){
            if(event == 'get_up'){
                this.state = this.config.states.busy.transitions.get_up;
                this.currentStates.push('normal');
            }
            if(event == 'get_hungry'){
                this.state = this.config.states.busy.transitions.get_hungry;
                this.currentStates.push('hungry');
            }
        } 
    }
    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentStates = [];
        this.currentStates.push(this.config.initial);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {

        var arr = [];
       
        if(!event){ 
            arr = [];
            var i = 0;
            for(var key in this.config.states){
                arr[i] = key;
                i++;
            }           
            return arr;
        }
      
        if(event == 'study'){
            arr.push('normal');
        }
        if(event == 'get_tired'){
            arr.push('busy');
            }
        if(event == 'get_hungry'){
            arr.push('busy');
            }     
        if(event == 'eat'){
            arr.push('hungry');
            }
        if(event == 'get_up'){
            arr.push('slepping');
            }
        if(event == 'get_hungry'){
            arr.push('sleeping');
            }
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
             
        var last = this.currentStates[this.currentStates.length-1];
        this.undoStates.push(last);
        var del = this.currentStates.pop();
        this.state = this.currentStates[this.currentStates.length-1];

        if(this.currentStates.length == 0){
            return false;
        } else {
            return true;}
        if(this.currentStates.length == 1){
            return false;
        }; 
    }
    
    redo() {
        if(this.undoStates.length == 0){
          return false;
        }
        
        if(this.undoStates.length == 0 && this.currentStates[this.currentStates.length-1]=='normal'){
          return false;
        } 
        var ost = this.undoStates[this.undoStates.length-1];
        this.redoStates.push(ost);
        this.currentStates.push(ost);
        var lost = this.undoStates.pop();
        this.state = this.currentStates[this.currentStates.length-1];
        
        if(this.state == 'normal' && this.currentStates.length==1){
          return false;
        } 
        
       if( this.redoStates[0] === this.currentStates[this.currentStates.length-1]){
           return true;
        }
    }
    /**
     * Clears transition history
     */
    clearHistory() {
        this.state = 'normal';
        this.currentStates=[];
        this.currentStates.push('normal');
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
