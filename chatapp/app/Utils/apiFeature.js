import {ethers} from 'ethers';
import Web3Modal from 'web3modal';
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
        if (!window.ethereum) console.log("Install/Connect to metamask");
        const accounts = await window.ethereum.request({
            method:'eth_requestAccounts'
        });

        return accounts[0];
        
    } catch (error) {
        console.log(error);
    }
}

const fetchContract = async (signerOrProvider) => {
    new ethers.Contract(chatAppAbi, chatAppAddress, signerOrProvider);
}

export const connectingWithContract = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log(error);
    }
}

export const convertTime = (time) => {
    const newTime = new Date(time.toNumber());
    const realTime = newTime.getHours() + '/' + newTime.getMinutes() + '/' + 
    newTime.getSeconds() + ' Date: ' + newTime.getDate() + '/' + (newTime.getMonth() + 1) + '/' + newTime.getFullYear();
    return realTime;
}