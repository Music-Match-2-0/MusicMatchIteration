import React, { useState, useEffect } from 'react';

const MatchProfile = ({profileData, matchList, setMatch, matchPointer, matchIncrement}) => { // presentational component

    const [buttonState, updateButton] = useState(['Load new match', { backgroundColor: '#2ecc71' }]);

    const {name, age, bio, artists = []} = profileData;


    function nextClick() {
        matchIncrement(matchPointer + 1);
        if (matchList[matchPointer]) setMatch(matchList[matchPointer]);
        else updateButton(['No new matches', { backgroundColor: '#808080' }]);
    }

    return (
    <div>
        <img className='round' src='https://png.pngtree.com/png-clipart/20220101/ourmid/pngtree-3d-apple-fruit-red-illustration-png-image_4147443.png'></img>
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