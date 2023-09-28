import React, { useState, useEffect } from 'react';

const Profile =  ({profileData}) => { // presentational component


    const {name, age, bio, artists = []} = profileData;


    return (
    <div>    
        <img className='round' src='https://play-lh.googleusercontent.com/TUtOJfxHm78ggM9Ssl2iAO2sDXeJ5rYauo_TTc9SiUsscHppl_TydsCwDoyZhfDv5qM'></img>
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