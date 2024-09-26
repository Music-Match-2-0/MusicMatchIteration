import React, { useState, useEffect } from 'react';

const MatchProfile = ({profileData, matchList, setMatch, matchPointer, matchIncrement}) => { // presentational component

    const {name, age, bio, artists = [], images} = profileData;
    const [buttonState, updateButton] = useState(['Load new match', { backgroundColor: '#2ecc71' }]);

    function nextClick() {
        matchIncrement(matchPointer + 1);
        if (matchList[matchPointer]) setMatch(matchList[matchPointer]);
        else updateButton(['No new matches', { backgroundColor: '#808080' }]);
    }

    return (
    <div>
        <img className='round' src={images}></img>
        <div id='profile'>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Favorite Artists: {artists.join(', ')}</p>
            <p>More About Myself: {bio}</p>
        </div>
        <button className="cardButton">Chat with {name}</button> <button className="cardButton" style={buttonState[1]} onClick={nextClick}>{buttonState[0]}</button>
    </div>
    )
}

export default MatchProfile;