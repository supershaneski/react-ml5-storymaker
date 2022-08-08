import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Story.module.css'
import House from '../icons/House'
import useStoryStore from '../zustand/store'

export default function Story() {

    const story = useStoryStore((state) => state.story)

    return (
        <div className={classes.container}>
            <div className={classes.main}>
                <div className={classes.contents}>
                    <h1 className={classes.title}>a story to remember</h1>
                    {
                        story.map((item, index) => {
                            return (
                                <p key={index} className={classes.text}>
                                {
                                    item.items.join(' ')
                                }
                                </p>
                            )
                        })
                    }
                </div>
            </div>
            <div className={classes.fab}>
                <Link to="/">
                    <House color="#FCF8EC" />
                </Link>
            </div>
        </div>
    )
}