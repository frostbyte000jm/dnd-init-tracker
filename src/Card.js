import React, { Component } from 'react';
import Input from './Input';

export default ({ 
    id,
    name,
    initiative,
    hitPoints,
    onNameChange,
    onInitiativeChange,
    onHitPointsChange 
    }) =>
<div className="card"> 
    <Input
    label="Name"
    type="text"
    value={name}
    onChange={e => onNameChange(id, e)}
    />
    <Input
    label="Initiative"
    type="number"
    value={initiative}
    onChange={e => onInitiativeChange(id, e)}
    />
    <Input
    label="HitPoints"
    type="number"
    value={hitPoints}
    onChange={e => onHitPointsChange(id, e)}
    />  
</div>