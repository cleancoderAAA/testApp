import { useEffect, useState } from "react";
import { ethers } from 'ethers';
import api from '../utils/api';
import WalletConnectProvider from "@walletconnect/web3-provider";
const SportABI = require('../ABI/Sport.json');
const BetABI = require('../ABI/Betting.json');
const NFTCueABI = require('../ABI/NFT.json');
const MarketCueABI = require('../ABI/Marketplace.json');
const NFTCardABI = require('../ABI/NFT_CARD.json');
const MarketCardABI = require('../ABI/Marketplace_CARD.json');
const Web3 = require("web3");

const Transaction = (props) => {
  const query = new URLSearchParams(props.location.search);
  const queryAction = query.get('action');
  const queryChainId = query.get('chainId');
  const queryTo = query.get('to');  
  const queryFrom = query.get('from');
  const queryMethods = query.get('methods');
  const queryContractName = query.get('contractName');
  var confirmString = query.get('confirmString');
  var queryDataLength = query.get('dataLength');
  var queryData = new Array(Number(queryDataLength)); 
  for (var i = 0; i < Number(queryDataLength); i ++) {
      queryData[i] = query.get('data'+(i+1).toString());
  }
  useEffect(() => {
    init();
  }, [])
  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  
  const init = async () => {  
       if(queryAction == "send"){
          try{ 
              const prov = new WalletConnectProvider({
                infuraId: "acc8266b5baf41c5ad44a05fe4a49925",
                qrcodeModalOptions: {
                  mobileLinks: ["metamask"],
                },
              });
              var chainId = Number(queryChainId); 
              await prov.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: "0x"+chainId.toString(16) }],
              });
              const addressMobile = await prov.enable();
              console.log(addressMobile);
              var web3Window = new Web3(prov);
              const chainIDBuffer = await web3Window.eth.net.getId(); 
              if(chainIDBuffer== null){
                //await delay(20000);
              // window.location.reload();
              }
              else{             

                  // let result_data = {
                  //     address: addressMobile[0],
                  //     result : "start",
                  //     contract : queryContractName.toString().toLowerCase()
                  // }; 
                  // await api.post('/saveTransactionResult', JSON.stringify(result_data));

                  // if(queryContractName.toString().toLowerCase() == "sport" && (queryMethods == "approveAndCreateSPGame" ||queryMethods == "approveAndCreateMPGame")){
                    
                  //     let send_data = {
                  //       address: addressMobile[0],
                  //       hash : "1",
                  //       type : queryContractName.toString().toLowerCase()
                  //     }; 
                  //     await api.post('/saveHash', JSON.stringify(send_data));
                  // }
                  const provider = new ethers.providers.Web3Provider(prov);
                  const signer = provider.getSigner();   
                  var _Address = queryTo.toString();
                  let _contract;
                  if(queryContractName.toString().toLowerCase()== "sport"){
                    _contract = new ethers.Contract(_Address, SportABI, signer);
                  }
                  else if(queryContractName.toString().toLowerCase()== "bet"){
                    _contract = new ethers.Contract(_Address, BetABI, signer);
                  }
                  else if(queryContractName.toString().toLowerCase()== "cuenft"){
                    _contract = new ethers.Contract(_Address, NFTCueABI, signer);
                  }
                  else if(queryContractName.toString().toLowerCase()== "cardnft"){
                    _contract = new ethers.Contract(_Address, NFTCueABI, signer);
                  }
                  else if(queryContractName.toString().toLowerCase()== "cuemarket"){
                    _contract = new ethers.Contract(_Address, NFTCueABI, signer);
                  }
                  else if(queryContractName.toString().toLowerCase()== "cardmarket"){
                    _contract = new ethers.Contract(_Address, NFTCueABI, signer);
                  }                
                  
                  let nftTxn = await _contract[`${queryMethods}`].apply(this, queryData);

                  // result_data = {
                  //   address: addressMobile[0],
                  //   result : "pending",
                  //   contract : queryContractName.toString().toLowerCase()
                  // }; 
                  // await api.post('/saveTransactionResult', JSON.stringify(result_data));

                  await nftTxn.wait(); 

                  // if(queryContractName.toString().toLowerCase() == "sport" && (queryMethods == "approveAndCreateSPGame" ||queryMethods == "approveAndCreateMPGame")){
                  //   let data_approve = {
                  //     address: nftTxn.from,
                  //     hash : nftTxn.hash,
                  //     type : queryContractName.toString().toLowerCase()
                  //   }; 
                  //   const res = await api.post('/saveHash', JSON.stringify(data_approve));
                  // }

                  // result_data = {
                  //   address: addressMobile[0],
                  //   result : "end",
                  //   contract : queryContractName.toString().toLowerCase()
                  // }; 
                  // await api.post('/saveTransactionResult', JSON.stringify(result_data));              
            } 
          
        } 
        catch (err){

            // const prov = new WalletConnectProvider({
            //   infuraId: "acc8266b5baf41c5ad44a05fe4a49925",
            //   qrcodeModalOptions: {
            //     mobileLinks: ["metamask"],
            //   },
            // });        
            // const addressMobile = await prov.enable();
            // if(queryContractName.toString().toLowerCase() == "sport" && (queryMethods == "approveAndCreateSPGame" ||queryMethods == "approveAndCreateMPGame")){
            //   let send_data = {
            //     address: addressMobile[0],
            //     hash : "fail",
            //     type : queryContractName.toString().toLowerCase()
            //   }; 
            //   await api.post('/saveHash', JSON.stringify(send_data));
            // }

            // let result_data = {
            //   address: addressMobile[0],
            //   result : "fail",
            //   contract : queryContractName.toString().toLowerCase()
            // }; 
            // await api.post('/saveTransactionResult', JSON.stringify(result_data));

        } 
    }  
}

  return (
    <div className="Minter">
      <h1 style={{ position: "absolute", top: "30%", left: "20%"}}>🧙‍♂️ {confirmString}</h1>  
    </div>
  );
};


export default Transaction;

