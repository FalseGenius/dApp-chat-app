import {ethers} from 'ethers';
import Web3Modal from 'web3modal';
import { Web3Provider } from '@ethersproject/providers';
import {chatAppAddress, chatAppAbi} from '../context/constants';

export const checkIfWalletIsConnected = async () => {
    try {
        if (!window.ethereum) console.log("Install/Connect to Metamask");
        const accounts = await window.ethereum.request({
             method:'eth_accounts'
        })

        return accounts[0];
        
    } catch(err) {
        console.log(err);
    }
}

export const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            console.log("Install/Connect to MetaMask");
            return null;  // Return null or handle the absence of MetaMask
        }

        // Check if MetaMask is already processing a request
        if (window.ethereum._metamask && window.ethereum._metamask.isUnlocked()) {
            console.log("User is already connected");
            const accounts = await window.ethereum.request({
                method: 'eth_accounts'
            });
            
            if (accounts && accounts.length > 0) {
                console.log("Returning already connected account:", accounts[0]);
                return accounts[0];  // Return the connected account
            }
            
            console.log("MetaMask is already processing a request. Please reload the page and try again.");
            return null;  // Return null or handle the situation
        }

        // Request accounts
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        console.log("Connected account:", accounts[0]);
        return accounts[0];
    } catch (error) {
        console.log(error);

        // Handle the case where the user denied the request
        if (error.code === 4001) {
            console.log("User rejected connection request. Please reload the page and try again.");
        }

        return null;  // Return null or handle the error
    }
};



const fetchContract = async (signerOrProvider) => {
    return new ethers.Contract(chatAppAddress, chatAppAbi, signerOrProvider);
}

export const connectingWithContract = async () => {
    try {
        

        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract;


    } catch (error) {
        console.log(`Error in apiFeature:${error}`);
    }
}

export const convertTime = (time) => {
    const newTime = new Date(time.toNumber());
    const realTime = newTime.getHours() + '/' + newTime.getMinutes() + '/' + 
    newTime.getSeconds() + ' Date: ' + newTime.getDate() + '/' + (newTime.getMonth() + 1) + '/' + newTime.getFullYear();
    return realTime;
}