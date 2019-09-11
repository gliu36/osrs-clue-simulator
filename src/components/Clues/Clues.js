import React, { Component } from 'react'
import ClueTemplate from '../ClueTemplate'



export default class Clues extends Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div className="clue">
                <ClueTemplate />
            </div>
        )
    }
}
