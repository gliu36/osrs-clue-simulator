import React, { Component } from 'react';
import { Grid, Cell, List, ListItem, ListItemContent, ListItemAction, Button } from 'react-mdl';

import scroll from '../images/scroll.png'
import beginner_casket from '../images/beginner_casket.webp'
import easy_casket from '../images/easy_casket.webp'
import medium_casket from '../images/medium_casket.webp'
import hard_casket from '../images/hard_casket.webp'
import elite_casket from '../images/elite_casket.webp'
import master_casket from '../images/master_casket.webp'

let clueListItem = (t) => {
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
		<ListItem>
			<img src={c} alt="casket" style={{height: '24px', padding: '20px'}} />
			<ListItemContent style={{fontSize: '24px', fontFamily: 'Runescape UF'}}>{t} Casket</ListItemContent>
			<ListItemAction>
				<Button raised ripple colored>Open</Button>
			</ListItemAction>
		</ListItem>
	);
}



class ClueTemplate extends Component {
  render() {

	const diffs = ['Beginner', 'Easy', 'Medium', 'Hard', 'Elite', 'Master']

    return(
      <div className="clue-body">
        <Grid className="clue-grid">
          <Cell col={6}>
            <h2>Clue Reward</h2>
            <img src={scroll} alt="scroll" style={{height: '500px'}} />
            <p>placeholder</p>
          </Cell>
          <Cell col={6}>
            <h2>Inventory</h2>
            <hr/>
            <div className="clue-list">
            	<List style={{width: '300px'}}>
					{diffs.map(clueListItem)}
            	</List>
            </div>
          </Cell>
		  <Cell col={61}>
		  </Cell>
        </Grid>
      </div>
    )
  }
}
export default ClueTemplate;