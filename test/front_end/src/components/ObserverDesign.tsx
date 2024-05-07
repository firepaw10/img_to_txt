import React, { useRef } from "react";

abstract class Observable {
    observers: Observer[];
    constructor(){
        this.observers = [];
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
    constructor(subscriptions: Observable[]){
        this.subscriptions = subscriptions;
    };
    subscribe(entity:Observable) {
        this.subscriptions.push(entity);
    };
    unsubscribe(entity:Observable) {
        this.subscriptions.filter((subscription) => {
            subscription != entity 
        });
    };
    update(){};
    notifyOfNewVideo(source:Observable){
        console.log(`new video from ${source}`);
    }
}

class Channel extends Observable {
    constructor() {
        super();
    }
    add(observer:Observer) {
        this.observers.push(observer);
    }
    remove(observer: Observer) {
        this.observers.filter((subscribers)=>{
            observer != subscribers
        });
    }
}

const GrantsChannel = new Channel();
const NayaraUser = new Observer([GrantsChannel]);
GrantsChannel.notifySubscribersOfVideo();
