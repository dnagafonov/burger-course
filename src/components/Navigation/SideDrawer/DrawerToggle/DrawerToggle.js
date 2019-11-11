import React from 'react';

import classes from './DrawerToggle.css';

const DrawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        menu
    </div>
);

export default DrawerToggle;