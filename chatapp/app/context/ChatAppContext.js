'use client'
import { redirect } from 'next/navigation'
import React, {useState, useEffect} from 'react';
import {checkIfWalletIsConnected, connectWallet, connectingWithContract} from '../Utils/apiFeature';


// const [account, setAccount] = useState('');
// const [userName, setUserName] = useState('');
// const [friendLists, setFriendLists] = useState([]);
// const [friendMsg, setFriendMsg] = useState([]);
// const [loading, setLoading] = useState(false);
// const [userLists, setUserLists] = useState([]);
// const [error, setError] = useState('');


export const ChatAppContext = React.createContext(null);
export const ChatAppProvider = ({children}) => {
    
    const [object, setObject] = useState({
        account:'' | null,
        userName:"",
        friendList:[],
        friendMsg:[],
        userList:[],
        currentUserName:"",
        currentUserAddress:""
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // const router = useRouter();

    const fetchData = async () => {
        try {
            const contract = await connectingWithContract();
            const connectAccount = await connectWallet();
            const userName = await contract.getUsername(connectAccount);
            const friendList = await contract.getFriends();
            const userList = await contract.getAllAppUsers();
            setObject({...object, account:connectAccount, userName:userName, friendList:friendList, userList:userList});              
            // setObject({...object, account:connectAccount, friendList:friendList, userList:userList});              
        } catch (error) {
            setError("Please install and connect your wallet");
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (object.account.length == null || object.account.length == 0) fetchData();
    }, [])

    const readMessage = async (friendAddress) => {
        try {
            const contract = await connectingWithContract();
            const messages = await contract.readMessage(friendAddress);
            // setObject({...object, friendMsg:messages});
            setObject((prevObject) => ({
                ...prevObject,
                friendMsg:messages
            }))
        } catch (error) {
            // setError("Currently, you have no messages");
            console.log("Currently, you have no messages")
        }
    }

    const createAccount = async ({name, accountAddress}) => {
        try {
            // if (name || accountAddress) return setError("Name and account must be there");
            // const accountAddress = object.account;
            const contract = await connectingWithContract();
            console.log(contract);
            const getCreatedUser = await contract.createUser(name);
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Error while creating the account");
            console.log(error);
        }
    }

    const addFriends = async (name, accountAddress) => {
        try {
            // if (name || accountAddress) return setError("Name and account must be there");
            const contract = await connectingWithContract();
            const addFriend = await contract.addFriend(accountAddress, name);
            setLoading(true);
            await addFriend.wait();
            setLoading(false);
            // router.push('/');
            redirect('/');
            
        } catch (error) {
            setError("Something went wrong while adding friend");
            console.log(error);
        }
    }

    const sendMessage = async (msg, accountAddress) => {
        try {
            // if (msg || accountAddress) return setError("Name and account must be there");
            const contract = await connectingWithContract();
            const sentMessage = await contract.sendMessage(accountAddress, msg);
            setLoading(true);
            await sentMessage.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Please reload and try again");
            console.log(error);
        }
    }

    const readUser = async (accountAddress) => {
        try {
            
            const contract = await connectingWithContract();
            const username = await contract.getUsername(accountAddress);
            // setObject({...object, currentUserName:username, currentUserAddress:accountAddress});
            setObject((prevObject) => ({
                ...prevObject,
                currentUserName:username,
                currentUserAddress:accountAddress
            }))
        } catch (error) {
            // setError("Please reload and try again");
            console.log(error);
        }
    }
    

    return (
        <ChatAppContext.Provider value={{object, setObject, connectWallet, connectingWithContract, readMessage, createAccount, addFriends, sendMessage, readUser, error, setError,loading}}>
            {children}
        </ChatAppContext.Provider>
    )
}