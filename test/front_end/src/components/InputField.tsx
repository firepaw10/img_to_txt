import React, { useRef } from "react";

interface InputProps {
    event: string;
    setEvent: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}


interface walk {
    getFatigue: (speed: number, duration: number) => number;
}

class Animal {
    lifespan: number; // in years
    constructor(lifeExpectancy:number) { 
        this.lifespan = lifeExpectancy;
    }

    eat(food: string) {
        console.log("incoming food = " + food);
    }

    poop() {}
    sleep() {}

}
function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
class Person extends Animal implements walk {
    age : number;
    constructor (age: number) {
        super(75);
        this.age = age;
    }
    getFatigue(speed: number, duration: number) {
        // speed is in mph, duration is in minutes, age in years
        // get speed in mile per minute to be in the same form as duration (minutes).
        // example: new Person(30), getFatigue(6 mph, 10 min) => distanceinMiles = 1 mile,
        // fatigue = distance * age/10 = 3 (3/10 is their fatigue level).
        var distanceInMiles = ((speed/60) * duration);
        return  distanceInMiles * (this.age * 0.1);
    }
    async poop() {
       // wait 10 minutes
       console.log(`Pooping. Be done in 10 minutes from now (${new Date().toLocaleString()})`);
       await delay(10000*60);
    }

    eat(food:string) {
        // if not cooked, error out
    }
    async sleep() {
        // await 8 hours
        await delay(1000*60*60*8);
    }
}

const InputField = ({event, setEvent, handleAdd}: InputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    var Grant = new Person(27);
    console.log(`Grant's fatigue level (out of 10) after running a mile at 6mph is : ${Grant.getFatigue(6, 10)}`);
    Grant.poop();
    const testPerson = new Proxy(Grant, {
        set(target, key, value) {
            console.log(`New Value being set: ${value}`); // check client side console (dev tools)
            return Reflect.set(target, key, value);
        }
    });
    testPerson.age = 28;
    console.log(Grant.age); // Grant's age was changed, and using the testPerson proxy allowed us to create a trigger on the setting event.



    abstract class Observable {
        name: string;
        observers: Observer[];
        constructor(name:string){
            this.observers = [];
            this.name=name;
        };
        add(observer:Observer){};
        remove(observer:Observer){};
        notifySubscribersOfVideo(){
            this.observers.forEach((observer)=>{
                observer.notifyOfNewVideo(this);
            });
        };
    }
    
    class Observer {
        subscriptions: Observable[];
        observerName: string;
        constructor(subscriptions: Observable[], observerName:string){
            this.subscriptions = subscriptions;
            this.observerName = observerName;
        };
        subscribe(entity:Observable) {
            this.subscriptions.push(entity);
        };
        unsubscribe(entity:Observable) {
            this.subscriptions.filter((subscription) => {
               return subscription != entity 
            });
        };
        update(){};
        notifyOfNewVideo(source:Observable){
            console.log(`Dear, ${this.observerName}, there's a new video from ${source.name}`);
        }
    }
    
    class Channel extends Observable {
        constructor(observableName:string) {
            super(observableName+" Youtube Channel");
        }
        add(observer:Observer) {
            this.observers.push(observer);
        }
        remove(observer: Observer) {
            this.observers.filter((subscribers)=>{
                return observer != subscribers
            });
        }
        uploadVideo(video:string) {
            //upload file
            this.notifySubscribersOfVideo();
        }
    }
    
    const GrantsChannel = new Channel("Grant");
    const NayaraUser = new Observer([GrantsChannel], "Nayara");
    GrantsChannel.add(NayaraUser);
    GrantsChannel.uploadVideo('New Video!!');
    return (
        <form action="" className="input" onSubmit={(e) => {
            handleAdd(e);
            inputRef.current?.blur();
            }}>
            <input 
              ref={inputRef}
              type="input"
              value={event}
              onChange={(e)=> setEvent(e.target.value)}
              placeholder="Enter an event" 
              className="input__box" />
            <button className="input__submit" type="submit">Go</button>
        </form>
    );
}


export default InputField;