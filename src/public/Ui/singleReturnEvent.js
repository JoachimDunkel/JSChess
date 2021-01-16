class SingleReturnEvent {
    constructor() {
        this.event = null;
        this.result = null;
    }

    registerEvent(event){
        this.event = event;
    }

    trigger(params) {
        this.event(params);
    }
}
