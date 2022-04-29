import { connectWallet, getCurrentWalletConnected, mintNFT } from "./utils/interact.js";
import { useEffect, useState } from "react";
//import { FileUpload } from 'react-ipfs-uploader'
import { ImageUpload } from 'react-ipfs-uploader'
import api from './utils/api';

const Minter = (props) => {

  
//  const onMintPressed = async () => { 
//     let data_approve = {
//       imageUri: imageUrl
//     };
//     const res = await api.post('/pinata/imageUpload', JSON.stringify(data_approve));
//   };
  
   return (
    
    <div className="Minter">
     
      <form>
        <h2>🖼 Link to asset: </h2>
        <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
        />
        
        
      </form>
      
    </div>
  );
};


export default Minter;

