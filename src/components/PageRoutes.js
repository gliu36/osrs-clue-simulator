import React from 'react';
import {Switch, Route } from 'react-router-dom';

import Home from './Home.js'
import Clues from './Clues/Clues.js'
import DoesNotExist from './DoesNotExist.js'

const PageRoutes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Clues" component={Clues} />
        <Route component={DoesNotExist} status={404}/>
    </Switch>
)

export default PageRoutes;