import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';



export default class Rewards extends Component {
    render() {
        return (
            <div>
                <Grid className="rewards-grid">
                    <Cell shadow={2} col={1}>
                        <h2>test</h2>
                    </Cell>
                    <Cell shadow={2} col={1}>
                        <h2>test</h2>
                    </Cell>
                    <Cell shadow={2} col={1}>
                        <h2>test</h2>
                    </Cell>
                    <Cell shadow={2} col={1}>
                        <h2>test</h2>
                    </Cell>
                </Grid>
            </div>
        )
    }
}
