import ContractABI from './kryptok.json'
import Web3 from 'web3'


export const address = '0xD81525260944133A5384d5D4Fd340Eb5e5c47C43'

export const createContract = ()=>{
    const {ethereum}=window
    if(ethereum){
        const web3 = new Web3(ethereum)
        return new web3.eth.Contract(ContractABI.abi,address)
    }
}

export const modalStyles={
    content:{
        height:'300px',
        width: '400px',
        margin: 'auto',
        marginTop: '150',
        display: 'flex'
    },
    overlay: {
        backgroundColor: 'rgb(0 0 0 / 74%)',
    },

    }
