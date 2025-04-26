import React from "react";
import './App.css';
export function Header(){
    return(
        <header>
            <h1>To do List</h1>
        </header>
    )
}
export function Footer(){
    const getCurrentYear = () => new Date().getFullYear();
    return(
        <footer>
            <div>Copyrights | {getCurrentYear()}</div>
        </footer>
    )
}
