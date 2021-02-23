<template>
    


        <div id="action-container" class="action-container box  bg-gray-600 px-8" v-cloak v-if="shouldRender && selectedActionAsset"    >
          
         
         
          <div class="tabs flex flex-col sm:flex-row select-none">

                  <div class="tab bg-gray-700 text-gray-300 py-4 px-6 block hover:text-blue-500 focus:outline-none cursor-pointer"  
                  v-bind:class="{   'text-blue-500 bg-gray-800':(tokensArePermitted()==false)  } " 
                   
                  >

    
                      <a>
                        <div class="icon is-small inline">   <i class="material-icons">file_download</i> </div>
                        <div class="inline ">Permit</div>
                      </a>
                 

                 </div>

                   <div class="tab bg-gray-700 text-gray-300 py-4 px-6 block hover:text-blue-500 focus:outline-none cursor-pointer" 
                    v-bind:class="{   'text-blue-500 bg-gray-800':(tokensArePermitted()==true)  } " 
                    
                    >


                      <a>
                        <div class="icon is-small one-third inline"> <i class="material-icons">fast_forward</i> </div>
                        <div class="inline " >Meta Tip</div>
                      </a>
                    
    
                  </div>   

                   


            </div>

         <!-- 
          <div class="deposit-container" v-if="(selectedActionType=='deposit')" v-cloak>


              <div class="subtitle-banner has-background-info has-text-light"> External Balance: {{ selectedActionAsset.wallet_balance_formatted }} </div>








             <div class="input-container padding-md" v-if="!supportsDelegateCallDeposit">
               <div class="label">Deposit Tokens</div>

                 <div class="columns">
                     <div class="column">
                       <div class="form-group">
                         <input class="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" v-model="depositTokenQuantity" placeholder="token amount">
                          <div class="button is-primary btn-action-deposit"> Deposit </div>
                       </div>
                      </div>
                    <div class="column">

                    </div>
               </div>
             </div>

             <div class="input-container padding-md" v-if="supportsDelegateCallDeposit">
               <div class="label">Deposit Tokens</div>

                 <div class="columns">
                     <div class="column">
                       <div class="form-group">
                         <input class="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" v-model="approveAndDepositTokenQuantity" placeholder="token amount">
                          <div class="button is-primary btn-action-approve-and-deposit"> Deposit </div>
                       </div>
                      </div>
                    <div class="column">

                    </div>
               </div>
             </div>



          </div>
          -->
          <div class="approve-container m-4 p-4" v-if="(tokensArePermitted()==false)" v-cloak>

           
            <div class="input-container padding-md"   >
              <div class="label">Approve Tokens</div>

              <div class="flex flex-row w-full">
                <div class=" flex-grow w-1/2">
                  <div class="form-group">
                      <input type="text" class=" hidden h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline " v-model="permitTokenQuantity" placeholder="token amount">
                      <div class="button inline-block bg-green-500 hover:bg-green-700 text-white font-bold m-2 py-2 px-4 rounded cursor-pointer" v-on:click="actionPermitTokens"> Permit All </div>
           
                  </div>
                </div>
              
                 
                <div class="  flex-grow  w-1/2">
                    


                     <div class="form-group padding-md" v-if="permitMetaData">
                           <div class="label">Relay Node URL</div>
                           <input class="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" v-model="relayNodeURL" placeholder="xxx.xxx.xxx.xxx:yyyy">
                          


                             <div class="whitespace-sm"></div>

                           <div id="btn-broadcast-lava-packet" v-if="permitMetaData">
                             <div class="button inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-4 rounded cursor-pointer" v-on:click="actionBroadcastPermitPacket">Broadcast Permit Packet To Relay</div>
                           </div>

                          

                           <div class="subtitle color-primary has-text-centered" v-cloak v-if="permitMetaData && broadcastMessage" >
                             {{ broadcastMessage }}
                           </div>

                            <div class="whitespace-sm"></div>
                       </div>




                      <div class="whitespace-sm"></div>




                      <div v-if="permitMetaData" >
                        <div> Meta Packet </div> 
                        <textarea class="text-black" v-model="permitMetaData"></textarea>
                    </div>





                      <div class="button inline-block bg-purple-500 hover:bg-purple-700 text-white font-bold m-2 py-2 px-4 rounded cursor-pointer" v-if="permitMetaData" v-on:click="actionSubmitPermit"> Submit Meta Tx </div>

                      <div class="loader inline-block" v-if="pendingTransaction">  </div>



                 </div>
             </div>
                
            </div>



          </div>


          <div class="lava-transfer-container  m-4 p-4" v-if="(tokensArePermitted()==true)" v-cloak>

             
            <div class=" ">
            

              <p> Generate a signed Meta Transaction Message.  This message can be submitted to the EVM by anyone, at which point the tokens will be transferred to the recipient's account.  </p>


              <div class="whitespace-sm"></div>


                <div class="flex flex-row w-full">
                    <div class="w-1/2 p-4">



                    

                      <div class="form-group padding-md">
                          <div class="label">Amount</div>
                          <input class="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" v-model="transferTokenQuantity" placeholder="token amount">
                      </div>

                      <div class="form-group padding-md">
                          <div class="label">Recipient</div>
                          <input class="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" v-model="transferTokenRecipient" placeholder="token recipient">
                      </div>


                      <div class="form-group padding-md hidden ">
                          <div class="label">Relay Authority</div>

                         <div class="select">
                            <select class=" text-black  " onchange=" " v-model="relayAuthorityType" placeholder="">
                              <option>any relayers</option>
                           </select>
                         </div>
                      </div>

                      <div class="form-group padding-md">
                          <div class="label">Relay Reward (tokens)</div>
                          <div><span> Optional </span></div>
                          <input class="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" v-model="transferTokenRelayReward" placeholder="token relay reward">
                      </div>

                      <div class="whitespace-sm"></div>
                        
                         <div class="button inline-block bg-green-500 hover:bg-green-700 text-white font-bold m-2 py-2 px-4 rounded cursor-pointer" v-on:click="actionSignLavaPacket"> Sign </div>
           

                     </div>
                   <div class="w-1/2 p-4 ">

                       
                        

                       <div class="is-size-6">   </div>

                       <p v-if="lavaMetadata"> Specify the URL for a Lava Network Node and broadcast this packet to the Lava Network Relayers.  They will submit the packet to the Ethereum Network if the reward is high enough.  </p>

                       <div class="form-group padding-md" v-if="lavaMetadata">
                           <div class="label">Relay Node URL</div>
                           <input class="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" v-model="relayNodeURL" placeholder="xxx.xxx.xxx.xxx:yyyy">
                         

                             <div class="whitespace-sm"></div>

                           <div id="btn-broadcast-lava-packet" v-if="lavaMetadata">
                             <div class="button inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-4 rounded cursor-pointer" v-on:click="actionBroadcastLavaPacket">Broadcast Lava Packet To Relay</div>
                           </div>

                         

                           <div class="subtitle color-primary has-text-centered" v-cloak v-if="lavaMetadata && broadcastMessage" >
                             {{ broadcastMessage }}
                           </div>

                           <div class="subtitle color-primary has-text-centered" v-cloak v-if="lavaMetadata && broadcastResults" >
                             


                             <table class="table-auto bg-gray-800 text-gray-200 p-2 m-2">
                                  <thead>
                                    <tr> 
                                      <th> </th>
                                      <th> </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td class="p-2 ">Tx Hash</td>
                                      <td class="p-2 overflow-ellipsis overflow-hidden" style="max-width:340px" v-if="broadcastResults.txdata">
 
                                        <a class="text-blue-400" target="_blank" v-bind:href=" 'https://blockscout.com/poa/xdai/tx/'+broadcastResults.txdata.txhash ">
                                        {{broadcastResults.txdata.txhash}}
                                        </a>
                                      </td>
                                      
                                    </tr>
                                    <tr class="bg-emerald-200">
                                      <td>Status</td>
                                      <td> {{broadcastResults.status}}</td>
                                      
                                    </tr>
                                     
                                  </tbody>
                                </table>



                           </div>


                             <div class="whitespace-sm"></div>
                       </div>




                      <div class="whitespace-sm"></div>

                       <div class="form-group padding-md" v-if="lavaMetadata && !broadcastResults">
                           <div> Meta Packet </div> 
                          <textarea class="text-black" v-model="lavaMetadata"></textarea>
                       
                       </div>

 
                      


                   </div>
              </div>
           </div>


          </div>



 







        </div>

</template>

<script>



import  PermitUtils from '../../js/eip712/permit-utils.js' 
import  EIP712HelperV3 from '../../js/eip712/EIP712HelperV3.js' 
import  EIP712SignPermit from '../../js/eip712/eip712-sign-permit.js'
import LavaPacketUtils from '../../js/eip712/lavapacket-utils.js'

import MetaPacketHelper from '../../js/meta-packet-helper'
  


 const web3utils = require('web3').utils

const permissibleTokenABI = require('../../abi/PermissibleToken.json')
const lavaWalletABI = require('../../abi/LavaWallet.json')
 const ethUtil = require('ethereumjs-util')


 const axios = require('axios')


var preBroadcastPacketHistory 
var packetHistoryInterval

export default {
  name: 'TippingContainer',
  props: ['shouldRender','selectedActionAsset', 'urlParameters', 'web3Plug'],
  components: { },
  data() {
    return {

        pendingTransaction: false,

        selectedActionType: 'permit' ,
        permitTokenQuantity:null,
        permitMetaData: null,


        transferTokenQuantity:null,
        transferTokenRecipient:null,
     
         transferTokenRelayReward:0,
         relayAuthorityType:['any relayers'],

          //'wss://xdai.apexrelay.com:8443',
        relayNodeURL:'wss://xdai.apexrelay.com:8443',
        broadcastMessage: null, //msg back from relay 
        broadcastResults: null,

        lavaMetadata: null 
    }
  },
  mounted(){

    //format 
    
    this.transferTokenRecipient = this.urlParameters.to
    this.transferTokenQuantity = this.urlParameters.amountFormatted


    packetHistoryInterval =  setInterval(this.pollForPacketHistory.bind(this),5000)

  },

  beforeDestroy(){

      clearInterval(packetHistoryInterval)

  },
  methods: {

      selectAction(name){
          this.selectedActionType = name
      },

      tokensArePermitted(){
            let selectedAsset = this.selectedActionAsset
 
 
            return (!isNaN(parseInt(selectedAsset.approved)) && parseInt(selectedAsset.approved) == parseInt(selectedAsset.balance))
       },

      async actionPermitTokens(){
          console.log('permit!!', this.permitTokenQuantity, this.selectedActionAsset)

        let assetData = this.selectedActionAsset

        let allAccounts = await this.web3Plug.getConnectedAccounts() 
        let primaryAddress =  this.web3Plug.web3.utils.toChecksumAddress( allAccounts[0] ) 
 
        let contractData = this.web3Plug.getContractDataForActiveNetwork();
        let lavaContractAddress =  contractData['LavaWallet'].address 

        let myTokenContract = this.web3Plug.getCustomContract(this.web3Plug.web3, permissibleTokenABI, assetData.address)


        let tokenName = await myTokenContract.methods.name().call()
         

        let permitInputData = {
 
          tokenAddress: web3utils.toChecksumAddress(assetData.address),
          permitFrom: web3utils.toChecksumAddress(primaryAddress),
          permitTo: web3utils.toChecksumAddress(lavaContractAddress),
          expires: 0,
          allowed: true,
        }

       let signResult = await PermitUtils.performOffchainSignForPermit( permitInputData,this.web3Plug )


       this.permitMetaData = JSON.stringify({
         tokenName: tokenName, 
         tokenAddress: assetData.address, 
         from: signResult.from,
         to: signResult.to,
         tokenAddress: signResult.tokenAddress,
         nonce: signResult.nonce,
         expires: signResult.expires,
         allowed: signResult.allowed, 
         signature: signResult.signature
       }) 


      },


      async actionSubmitPermit(){

         let assetData = this.selectedActionAsset

        let allAccounts = await this.web3Plug.getConnectedAccounts() 
        let primaryAddress =  window.web3.utils.toChecksumAddress( allAccounts[0] ) 


        let contractData = this.web3Plug.getContractDataForActiveNetwork();
        
         let myTokenContract = this.web3Plug.getCustomContract(this.web3Plug.web3, permissibleTokenABI, assetData.address)

          let metadata = JSON.parse(this.permitMetaData)

        console.log('metadata' , metadata)
          let VRS = EIP712HelperV3.signatureToVRS(metadata.signature)


         let permitArgs = [
          web3utils.toChecksumAddress( metadata.from),
          web3utils.toChecksumAddress( metadata.to ),
          metadata.nonce,
          metadata.expires,
          metadata.allowed,
          VRS.v,
          VRS.r,
          VRS.s          
          ]

          console.log('myTokenContract',myTokenContract)
          console.log('permissibleTokenABI',permissibleTokenABI)


         this.pendingTransaction = true

         let txResult = await myTokenContract.methods.permit(...permitArgs).send({from: primaryAddress}) 

         console.log('txResult', txResult)

         this.permitMetaData = null 
         this.pendingTransaction = false

      },

    
      async actionSignLavaPacket(){
          console.log('SignLavaPacket!!')



        let assetData = this.selectedActionAsset

        let allAccounts = await this.web3Plug.getConnectedAccounts() 
        let primaryAddress =  window.web3.utils.toChecksumAddress( allAccounts[0] ) 
 
        let contractData = this.web3Plug.getContractDataForActiveNetwork();
        let lavaContractAddress = contractData['LavaWallet'].address

        let tokenDecimals = assetData.decimals
       

        let lavaPacketInputData = {
          method: web3utils.fromAscii('transfer'),
          relayAuthority: "0x0000000000000000000000000000000000000000", 
          from: primaryAddress,
          to: this.transferTokenRecipient,
          walletAddress: lavaContractAddress,
          tokenAddress: assetData.address,
          tokenAmount: this.web3Plug.formattedAmountToRaw(this.transferTokenQuantity,tokenDecimals).toString() ,
          relayerReward: this.web3Plug.formattedAmountToRaw(this.transferTokenRelayReward,tokenDecimals).toString(),
          expires: 0,
          nonce:  LavaPacketUtils.generateRandomNonce()
        }
 


          this.broadcastMessage = null
          this.broadcastResults = null



           console.log('lavaPacketInputData',lavaPacketInputData)

        let signResult = await LavaPacketUtils.performOffchainSignForLavaPacket(lavaPacketInputData, this.web3Plug)
          console.log('signResult',signResult)


          this.lavaMetadata = JSON.stringify( 
              Object.assign( lavaPacketInputData , { signature: signResult.signature })
            )


      },

        async actionSubmitLava(){
            let assetData = this.selectedActionAsset

            let allAccounts = await this.web3Plug.getConnectedAccounts() 
            let primaryAddress =  window.web3.utils.toChecksumAddress( allAccounts[0] ) 


            let contractData = this.web3Plug.getContractDataForActiveNetwork();

            let lavaWalletAddress = contractData['LavaWallet'].address
            
            let lavaWalletContract = this.web3Plug.getCustomContract(this.web3Plug.web3, lavaWalletABI, lavaWalletAddress)

             let metadata = JSON.parse(this.lavaMetadata)

            console.log('metadata' , metadata)

              delete metadata['walletAddress']; 
 

            let lavaArgs = Object.values(  metadata  )

              console.log('lavaArgs' , lavaArgs)
 

            this.pendingTransaction = true

            let txResult = await lavaWalletContract.methods.transferTokensWithSignature(...lavaArgs).send({from: primaryAddress}) 

            console.log('txResult', txResult)

            this.permitMetaData = null 
            this.pendingTransaction = false

      },


      async actionBroadcastLavaPacket(){

        console.log('broadcast lava packet ')

          let fullURL = this.relayNodeURL 


          let metadata = JSON.parse(this.lavaMetadata)


          let dataToPost = metadata

          this.broadcastMessage = null
          this.broadcastResults = null


              let allAccounts = await this.web3Plug.getConnectedAccounts() 
            let primaryAddress =  window.web3.utils.toChecksumAddress( allAccounts[0] ) 


         let packetHistoryResponse = await  MetaPacketHelper.getPacketHistory(fullURL, primaryAddress  )

        if(packetHistoryResponse.success){
            preBroadcastPacketHistory = packetHistoryResponse.packetsArray

        }
         
  
         let response = await  MetaPacketHelper.sendLavaPacket(fullURL,dataToPost)
  

            if(response.success){
             
                this.broadcastMessage = "Broadcast successful."
                console.log('got response ', response )
            }else{
                this.broadcastMessage = response.message
            }
              
 
 
      },


      async pollForPacketHistory(){
        console.log('poll for packet history ')


         
          let fullURL = this.relayNodeURL 



          let allAccounts = await this.web3Plug.getConnectedAccounts() 
          let primaryAddress =  window.web3.utils.toChecksumAddress( allAccounts[0] ) 




          /* let testpacketHistoryResponse = await  MetaPacketHelper.getPacketHistory(fullURL, primaryAddress  )
            let testpackets = testpacketHistoryResponse.packetsArray
           console.log( 'testpackets',testpackets, testpackets.length )*/






        //  console.log('preBroadcastPacketHistory', preBroadcastPacketHistory.length, preBroadcastPacketHistory)

          if(preBroadcastPacketHistory && preBroadcastPacketHistory.length > 0){
             let updatedPacketHistoryResponse = await  MetaPacketHelper.getPacketHistory(fullURL, primaryAddress  )

             if(updatedPacketHistoryResponse.success){
                let updatedPacketsArray = updatedPacketHistoryResponse.packetsArray

                console.log('updatedPacketsArray',updatedPacketsArray)

                  if( updatedPacketsArray && updatedPacketsArray.length > preBroadcastPacketHistory.length   ){

                    let mostRecentTransaction = updatedPacketsArray[0]

                    console.log('learned of most recent tx ', mostRecentTransaction)

                    if(mostRecentTransaction.status != 'pending' && mostRecentTransaction.status != 'queued'){
                        this.broadcastResults = Object.assign({},mostRecentTransaction) 

                         console.log("broadcastResults",this.broadcastResults)

                          preBroadcastPacketHistory = null 
                    }

                   
                  }


             }

          
          }

           

      },


      //---------------------------

      async actionBroadcastPermitPacket(){

          console.log('broadcast permit packet ')

          let fullURL = this.relayNodeURL 


          let metadata = JSON.parse(this.permitMetaData)


          let dataToPost = metadata

         this.broadcastMessage = null

  
         let response = await MetaPacketHelper.sendPermitPacket(fullURL,dataToPost)
  

          console.log(response)

            if(response.success){
              this.broadcastMessage = "Broadcast successful."
            }
          
      }






  }
}
</script>