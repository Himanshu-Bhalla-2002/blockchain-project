const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = "moon come brown remember found click divorce auction normal brush found omit";
const infuraProjectId = "7768e3cea142472f9c9eb1dc69bb5061";


module.exports = {
 // See <http://truffleframework.com/docs/advanced/configuration>
 // for more about customizing your Truffle configuration!


 compilers:{
   solc:{
     version: "^0.8.19"
   }
 },
  networks: {
   goerli: {
     provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/${infuraProjectId}`),
     network_id: 5,       
     chain_id: 5,        
     gas: 5500000,       
     confirmations: 2,    
     timeoutBlocks: 200,  
     skipDryRun: true     
   }, 
   develop: {
     port: 8545
   }
 }
};
