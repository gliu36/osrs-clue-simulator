import React from 'react';

import '../styles/Main.css';

import { Layout, Header, Navigation, Content } from 'react-mdl';
import { Link } from 'react-router-dom';
import PageRoutes from './PageRoutes';

function Main() {
	return (
		<div className="big-content">
			<Layout fixedHeader>
				<Header title={<Link style={{textDecoration: 'none', color: 'White'}} to="/">Clue Scrolls</Link>} className="header">
					<Navigation>
						<Link to="/">Home</Link>
						<Link to="/Clues">Clues</Link>
					</Navigation>
				</Header>
				
				<Content>
					<div className="page-content" />
					
					<PageRoutes />
        		</Content>
			</Layout>
		</div>
	);
}

export default Main;
