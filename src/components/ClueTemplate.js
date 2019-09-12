import React, { Component } from 'react';
import { Grid, Cell, List, ListItem, ListItemContent, ListItemAction, Button, DataTable, TableHeader } from 'react-mdl';

import scroll from '../images/scroll.png'
import Rewards from './Rewards.js'
import beginner_casket from '../images/beginner_casket.webp'
import easy_casket from '../images/easy_casket.webp'
import medium_casket from '../images/medium_casket.webp'
import hard_casket from '../images/hard_casket.webp'
import elite_casket from '../images/elite_casket.webp'
import master_casket from '../images/master_casket.webp'

import clue_items from './data/clue_scroll_data.json'




class ClueTemplate extends Component {

	constructor(props) {
		super(props)

		this.state = {
			loot: [{Item: 'test', Quantity: 1, Price: 1}]
		}
	}

	clueListItem = (t) => {
		let c = null
		switch (t) {
			case 'Beginner':
				c = beginner_casket
				break;
			case 'Easy':
				c = easy_casket
				break;
			case 'Medium':
				c = medium_casket
				break;
			case 'Hard':
				c = hard_casket
				break;
			case 'Elite':
				c = elite_casket
				break;
			case 'Master':
				c = master_casket
				break;
			default:
				console.log("How did this happen to me")
		}
		return (
			<ListItem key={t}>
				<img src={c} alt="casket" style={{height: '24px', padding: '20px'}} />
				<ListItemContent style={{fontSize: '24px', fontFamily: 'Runescape UF'}}>{t} Casket</ListItemContent>
				<ListItemAction>
					<Button raised ripple colored onClick={() => this.handleCasket(t)}>Open</Button>
				</ListItemAction>
			</ListItem>
		);
	}

	handleCasket = (t) => {
		const items = clue_items[t.toLowerCase()]
		console.log(items)
	}
	

	render() {

	const diffs = ['Beginner', 'Easy', 'Medium', 'Hard', 'Elite', 'Master']
	const loot = this.state.loot
	console.log(clue_items)
    return(
		<div className="clue-body">
			<Grid className="clue-grid">
				<Cell className="scroll-cell" shadow={2}>
					<h2>Clue Reward</h2>
					<hr/>
					<p>placeholder</p>
					<p>placeholder</p>
					<p>placeholder</p>

					<Rewards />
					{/* <img src={scroll} alt="scroll" style={{height: '500px'}} /> */}
				</Cell>
				<Cell shadow={2} col={2}>
					<h2>Caskets</h2>
					<hr/>
					<div className="clue-list">
						<List style={{width: '250px'}}>
							{diffs.map(this.clueListItem)}
						</List>
					</div>
				</Cell>
				<Cell shadow={2} col={4}>
					<h2>Loot</h2>
					<hr/>
					<div className="loot-table">
						<DataTable
							shadow={0}
							rows={loot}>
							<TableHeader name="Item">Material</TableHeader>
							<TableHeader numeric name="Quantity">Quantity</TableHeader>
							<TableHeader numeric name="Price" cellFormatter={(price) => `${price} gp`} tooltip="from osrs ge">Price</TableHeader>
						</DataTable>
					</div>
				</Cell>
			</Grid>
		</div>
		)
	}
}
export default ClueTemplate;