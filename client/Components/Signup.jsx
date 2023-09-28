import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();

    const [newUserName, setnewUserName] = useState([]);
    const [newPassword, setnewPassword] = useState([]);
    const [newAge, setnewAge] = useState([]);
    const [newBio, setnewBio] = useState([]);
    const [newName, setnewName] = useState([]);
    const [newImages, setnewImages] = useState([]);

    const [artist, setArtist] = useState('');
    const [newArtists, setnewArtists] = useState([]);

    async function handleClick(e) {
        // console.log("USERNAME:", newUserName, "\n",
        //     "NAME", newName, "\n",
        //     "PASSWORD", newPassword,"\n",
        //     "AGE", newAge, "\n",
        //     "BIO", newBio,"\n",
        //     "ARTISTS", newArtists,"\n",
        //     newImages)

        e.preventDefault();
        try {
            if(newArtists.length < 3) {
                alert("Please submit at least 3 artists!");
                throw new Error("not enough artists submitted")
            }

            const response = await fetch('/api/signup', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                username: newUserName,
                name: newName,
                password: newPassword,
                age: newAge, 
                bio: newBio,
                artists: newArtists,
                images: newImages
            }),
            })

            if(response.status === 200){
                // console.log('hi')
                navigate ('/main');
            }
      
        } catch(err){
            console.log(err);
        }
  }

    function handleAddArtist() {
        if(!newArtists.includes(artist) && newArtists.length < 10) {
            // const artists = [...newArtists];
            // artists.push(artists);
            // setnewArtists(artists);
            setnewArtists(prev => [...prev, artist]);
        }
        setArtist('');
    }

    function handleChangeImages(e) { // what even is this??
        const fileURL = URL.createObjectURL(e.target.files[0]);
        setnewImages(fileURL);
    }

    return (
        <div className="container">
        <h1 id="text-shadows-2">Music Match</h1>
        <div className="input-container">
            <label htmlFor="createUser" className="label">
            New Username:
            </label>
            <input
            id="createUser"
            type="text"
            value={newUserName}
            onChange={(e) => setnewUserName(e.target.value)}
            />
        </div>

        <div className="input-container">
            <label htmlFor="createPW" className="label">
            New Password:
            </label>
            <input
            id="createPW"
            type="password"
            value={newPassword}
            onChange={(e) => setnewPassword(e.target.value)}
            />
        </div>

        <div className="input-container">
            <label htmlFor="createAge" className="label">
            Input Age:
            </label>
            <input
            id="createAge"
            type="number"
            value={newAge}
            onChange={(e) => setnewAge(e.target.value)}
            />
        </div>

        <div className="input-container">
            <label htmlFor="createName" className="label">
            Name to Display on Your Profile:
            </label>
            <input
            id="createName"
            type="text"
            value={newName}
            onChange={(e) => setnewName(e.target.value)}
            />
        </div>

        <div className="input-container">
            <label htmlFor="createBio" className="label">
            Let People Know About You!
            </label>
            <textarea
            id="createBio"
            type="text"
            value={newBio}
            onChange={(e) => setnewBio(e.target.value)}
            />
        </div>

        <form className="input-container" method ="post" encType="multipart/form-data">
            <label htmlFor="createImages" className="label">
            Upload Photos of Yourself
            </label>
            <input
            id="createImage"
            type="file"
            multiple
            name="file[]"
            onChange={handleChangeImages}
            />
        </form>

        <div className="input-container">
            <label htmlFor="createArtists" className="label">
            Who Are Your Favorite Artists?{" "}
            </label>
            <textarea
            id="createArtists"
            type="text"
            value={artist}
            placeholder="Minimum 3, max 10 Artists (you can always add more later!)"
            onChange={(e) => setArtist(e.target.value)}
            />
            <button onClick={handleAddArtist}>Add Artist</button>
            <button onClick={() => setnewArtists([])}>Clear Artists</button>
        </div>
        
        <div>
            <span style={{ "fontWeight": "bold" }}>Favorite Artists: </span>
            {newArtists.map((a, indx) => {
                return (<span key={indx}>{a}{indx === newArtists.length-1 ? " " : ", "}</span>)
            })}
        </div>

        <button id="createAccount" type="submit" onClick={handleClick}>
            CREATE ACCOUNT
        </button>
        </div>
    );
};

export default SignUp;
