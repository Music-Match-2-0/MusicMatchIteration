import React, { useState, useEffect } from "react";

const Messenger = (props) => {
    const { setUserSid, userSid, matchSid, setMatchSid } =props
    const [messages, setMessages] = useState([])
    const [text, setText] = useState('')
    const [socket, setSocket] = useState(null);
    
    console.log()
    //establishing connection
    useEffect(() => {
           
           console.log('this is user id it should always be truthy', props.user._id)
           console.log('this is match id it should always be truthy', props.match._id)

        const newSocket = new WebSocket('ws://localhost:3001', ['hi', 'bye']);

        newSocket.onopen = (e) => {
            console.log('WebSocket connection opened hi');
            setSocket(newSocket);
            console.log('intial look for id', e)
            console.log('THIS IS THE SOCKET', newSocket);
        };

        newSocket.onmessage = (event) => {
            console.log('WebSocket connection opened', event.data);
            const id = event.data
            console.log('id val', id)
            setUserSid(id);
        };

        newSocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            newSocket.close();
        };
    }, [props.user]);

    if (socket) {
      socket.onmessage = async (e) => {
        const resp = await e.data;
        if (resp instanceof Blob){
        const msg = await resp.text();
        // const readymsg = msg.slice(2)

        console.log('MESSAGE RECIEVED BY CLEINT', msg)
        setMessages([...messages, msg])
        }
      }
    }

    const changeHandle = (e) => {

        setText(e.target.value)
    }

    // Soemthing to recieve messages we didnt send

    const clickHandle = async (e) => {
        e.preventDefault();
        console.log('userSide when tryign to send', userSid)
        try {
            // sending a message using websocket
            socket.send(`${props.user.name}: ${text}`)
            setMessages([...messages, text])

           // await fetch();
            setText('');
        }

        catch (error) {
            console.error('An error occurred: sending yourmessage');
        }
    }

    console.log('user sid after setting', userSid);


    return(
        <div>
            HI IM THE MESSENGER
            <div>
               {messages.map((msg) =>  <p>{msg}</p>)}
            </div>
            <form>          
                <input type = 'text' name='msg' value={text} onChange={changeHandle}></input>
                <button onClick={clickHandle}>send</button>
            </form>
        </div>
    )

}

export default Messenger