import React from 'react';

import '../styles/Main.css'

import { Layout, Header, Navigation, Content } from 'react-mdl';
import { Link } from 'react-router-dom';
import PageRoutes from './PageRoutes'

function Main() {
	return (
		<div className="Main">
			<Layout fixedHeader>
				<Header className="header" title="Clue Scrolls">
					<Navigation>
						<Link to="/">Home</Link>
						<Link to="/Beginner">Beginner</Link>
					</Navigation>
				</Header>
			</Layout>
			<Content>
				<div className="page-content" />
				<PageRoutes />
        	</Content>
		</div>
	);
}

export default Main;
