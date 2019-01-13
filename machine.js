
var states ={
    initialState: 'opened',
    context:{},
    id:'id',
    states:{
        opened:{
            onEntry: function(){
                console.log("door opened")
            },
            onExit: function(){
                console.log("door closing")
            },
            on:{
                CLOSE:{
                    service: ()=>{
                        const {state, setState} = useState();
                        //console.log(state);
                        //console.log(setState);
                    }
                },
                KNOCK: {
                    service: ()=>{
                        console.log("Че стучишь дверь открыта")
                    }
                }
            }
        },
        closed: {
            onEntry: function(){
                console.log("door closed")
            },
            onExit:	function(){
                console.log("door opening")
            },
            on: {

                OPEN:   {
                    target: 'opened'
                },
                KNOCK: {
                    service: ()=>{
                        console.log("Не входите я не одета")
                    }
                }
            }
        }
    }
}



function StateMachine(Source){
    this.source=Source;
    this.setState=function(objectState){
        source.states[source.initialState].onExit();
        source.initialState = objectState;
        source.states[source.initialState].onEntry();
    };
    this.transition=function(operation,context)	{
        initialState =this.source.initialState;
        setState = this.setState;
        context = this.source.context;
        setContext=this.setContext;
        useState= function(){
            return [initialState, setState]
        };
        useContext=function(){
            return [context, setContext]
        };
        var action=this.source.states[this.source.initialState].on[operation];
        if(action.target == undefined){
            action.service.call(machine);
        }else{
            stateMachine.setState(action.target);
        }
    };

    this.setContext=function(objectContext){
        this.source.context = objectContext
    };

}


const machine = function(source){
    return new StateMachine(source);
}

var doorMachine = machine(states)