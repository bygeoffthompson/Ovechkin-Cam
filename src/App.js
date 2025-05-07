import data from './goals.json';
import Goal from './components/goal.js';
import Search from './components/search.js';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
    const getData=()=>{
        fetch('./goals.json'
            ,{
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function(response){
                console.log(response)
                return response.json();
            })
            .then(function(myJson) {
                console.log(myJson);
            });
    }
    useEffect(()=>{
        getData()
    },[])


    return (
        <div>
            <p>lol</p>
            <Search />
            <Goal />
        </div>
    );
}


export default App;
