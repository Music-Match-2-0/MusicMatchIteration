import React, { useState, useEffect } from 'react';

const Profile =  ({profileData}) => { // presentational component

    const {name, age, bio, artists = [], images} = profileData;
    useEffect(()=>{
        console.log('IMAGES', images)
    })


    return (
    <div>    
        <img className='round' src={images} alt='Profile Image'/>
        <div id='profile'>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Favorite Artists: {artists.join(', ')} </p>
            <p>More About Myself: {bio}</p>
        </div>
    </div>
    )
}

export default Profile;