import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Home.module.css'

export default function Home() {
    return (
        <div className={classes.container}>
            <div className={classes.main}>
                <h1 className={classes.title}>ml5 StoryMaker</h1>
                <nav className={classes.nav}>
                <Link className={classes.link} to="/story">Read Story</Link>
                <Link className={classes.link} to="/edit">Write Story</Link>
                </nav>
            </div>
        </div>
    )
}