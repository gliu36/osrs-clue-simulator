import React, { Component } from 'react';
import { Grid, Cell, List, ListItem, ListItemContent, ListItemAction, Button, DataTable, TableHeader } from 'react-mdl';

import Rewards from './Rewards.js'
import beginner_casket from '../images/beginner_casket.webp'
import easy_casket from '../images/easy_casket.webp'
import medium_casket from '../images/medium_casket.webp'
import hard_casket from '../images/hard_casket.webp'
import elite_casket from '../images/elite_casket.webp'
import master_casket from '../images/master_casket.webp'

import clue_items from './data/clue_scroll_data.json'
let LEVEL_ROLLS = {'beginner': [1,3], 'easy': [2,4], 'medium': [3,5], 'hard': [4,6], 'elite': [4,6], 'master': [5,7]}

function generateReward(items) {
	let probs = []
	let a = 0
	for (let k in items) {
		let d_r = items[k]['drop_rate'].replace(/,/,'')
		let pattern = /(\d+)\/(\d+)/
		if (pattern.test(d_r)) {
			let d = d_r.match(pattern)[0]

			
			probs.push(eval(d))

			a += eval(d)
		} else {
			probs.push(0)
		}
	}
	console.log(a)
	console.log(probs)
}


function get_casket_rewards(level, items) {
	const range = LEVEL_ROLLS[level]
	let n = Math.floor(Math.random() * range[1]) + range[0]
	let rewards = []
	for (let i = 0; i < n; i++) {
		rewards.push(generateReward(items))
	}

	return rewards
}


class ClueTemplate extends Component {

	constructor(props) {
		super(props)

		this.state = {
			loot: [{Item: 'test', Quantity: 1, Price: 1}],
			image_ids: []
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
		t = t.toLowerCase()
		let items = clue_items[t]
		this.setState({image_ids: items})

		let rewards = get_casket_rewards(t, items)


		// for (let k in items) {
		// 	console.log(items[k]['drop_rate'])
		// }

		

		// switch (t) {
		// 	case 'beginner':
		// 		console.log(t)
		// 		break;
		// 	case 'easy':
		// 		console.log(t)
		// 		break;
		// 	case 'medium':

		// 		break;
		// 	case 'hard':

		// 		break;
		// 	case 'elite':

		// 		break;
		// 	case 'master':

		// 		break;
			
		// 	default:
		// 		console.log('hey u broke it')
		// }
	}
	

	render() {

	const diffs = ['Beginner', 'Easy', 'Medium', 'Hard', 'Elite', 'Master']
	const { loot, image_ids} = this.state
	console.log(image_ids)
    return(
		<div className="clue-body">
			<Grid className="clue-grid">
				<Cell className="scroll-cell" shadow={2}>
					<h2>Clue Reward</h2>
					<hr/>
					<p>placeholder</p>
					<p>placeholder</p>
					<p>placeholder</p>

					<Rewards image-ids={image_ids}/>
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