
var door1 ={
    initialState: 'closed',
    context:{},
    id:'id',
    states:{
        opened:{
            onEntry: "onStateEntry",
            onExit: function(){
                console.log("door closing")
            },
            on:{
                CLOSE:{
                    service: ()=>{
                        const [state, setState] = useState();
                        setState("closed");
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
            onEntry:function(){
                console.log("door closed")
            },
            onExit: "onStateExit",
            on: {

                OPEN:   {
                    target: 'opened'
                },
                KNOCK: {
                    service: ()=>{
                        setTimeout(()=>{
                            setState("opened");
                            console.log("Войдите");
                        },1000);
                        console.log("Подождите, я не одета");
                    }
                }
            }
        }
    },
    actions:{
        onStateEntry: (event)=> {
            const [state] = useState();
    		console.log('now state is ' + state);
        },
        onStateExit: (event)=> {
            const [state] = useState();
            console.log('now state is ' + state);
        },
    }

}


var door2 ={
    initialState: 'opened',
    context:{},
    id:'id',
    states:{
        opened:{
            onEntry: "onStateEntry",
            onExit: function(){
                console.log("door closing")
            },
            on:{
                CLOSE:{
                    service: ()=>{
                        const [state, setState] = useState();
                        setState("closed");
                        doorMachine1.transition("OPEN");
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
            onEntry:function(){
                console.log("door closed")
            },
            onExit: "onStateExit",
            on: {

                OPEN:   {
                    target: 'opened'
                },
                KNOCK: {
                    service: ()=>{
                        setTimeout(()=>{
                            setState("opened");
                            console.log("Войдите");
                        },1000);
                        console.log("Подождите, я не одета");
                    }
                }
            }
        }
    },
    actions:{
        onStateEntry: (event)=> {
            const [state] = useState();
    		console.log('now state is ' + state);
        },
        onStateExit: (event)=> {
            const [state] = useState();
            console.log('now state is ' + state);
        },
    }

}


function StateMachine(Source){
    this.source=Source;
    this.transition=function(operation,newContext)	{
        source = this.source;
        context = this.source.context;
        useState= function(){
            setState=function(newState){
                onExit = source.states[source.initialState].onExit;
                if(onExit!=undefined){
                    if(typeof onExit =="function"){
                        onExit();
                    }else if(typeof onExit =="string"){
                        source.actions[onExit]();
                    }
                }
                source.initialState = newState;
                onEntry = source.states[source.initialState].onEntry;
                if(onEntry!=undefined){
                    if(typeof onEntry =="function"){
                        onEntry();
                    }else if(typeof onEntry =="string"){
                        source.actions[onEntry]();
                    }
                }
            }
            return [source.initialState,setState.bind(source)];
        };
        useContext=function(){
            setContext=function(context){
                source.context = context;
            }
            return [scontext,setContext.bind(source)];
        };
        var action=this.source.states[this.source.initialState].on[operation];
        if(action.target == undefined){
            action.service.call(this);
        }else{
            const [state, setState] = useState();
            setState(action.target);
        }
        if(newContext!=undefined){
            const [context, setContext] = useContext();
            setContext(newContext);
        }
    };

}


const machine = function(source){
    return new StateMachine(source);
}

var doorMachine1 = machine(door1);
var doorMachine2 = machine(door2);
doorMachine2.transition("CLOSE",{bag:"vine"});