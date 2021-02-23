<template>


<div class=" container mx-auto bg-gray-800 " id="wallet">

  <Navbar /> 



      <div id="jumbotron" class=" ">




      </div>

 


      <section class="hero   "  >
        <div class="hero-body">

           

 

            <div class="whitespace-md"></div>

            <div class="container mx-auto p-2 m-2 border-gray-300 border-2">
              <div class="text-lg text-black bg-gray-300 p-2  "> Getting Started  </div>
              <div class="p-4">
              <div class="text-md  "> -Once the bot is invited to your server, type '!wallet' in the chat for commands. </div>
              <div class="text-md  "> -Users will need to install <a class="text-blue-500" href="https://metamask.io">Metamask</a> and <a class="text-blue-500" href="https://www.xdaichain.com/for-users/wallets/metamask/metamask-setup">Configure it for xDai Network</a> to send tips. </div>


                

               </div>  
            </div>  



            <div class="container mx-auto p-2 m-2 border-gray-300 border-2">
              <div class="text-lg text-black bg-gray-300 p-2  "> How it Works  </div>
              <div class="p-4">
              <div class="text-md  "> This bot leverages Meta-transactions so that users only need to offchain-sign and a relay server submits the transaction to the network along with the gas fee </div>
              <div class="text-md  "> You can read the Meta Transactions contract here: <a class="text-blue-500" href="https://blockscout.com/poa/xdai/address/0x56398FdFD684b40B17B09BB1Cf826ED93A38C489/contracts"> Lavawallet Metatransactions System Contract </a>  </div>


                

               </div>  
            </div>  

 
        </div>
      </section>


  <Footer /> 

  </div>




 </template>

<script >
 
import Web3Plug from '../js/web3Plug.js'

import ActionContainer from './components/ActionContainer.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Web3NetButton from './components/Web3NetButton.vue'

import AssetList from './components/AssetList.vue'
import DropZone from './components/DropZone.vue'

export default {
  name: 'Wallet',
  components: {Navbar, Footer,ActionContainer,Web3NetButton, AssetList, DropZone},
  data() {
    return {
		selectedActionAsset: null,
	 
		errorMessage:null,
    web3Plug: null,
    networkName: null

    }
  },
  created(){


    
  },
  methods: {

    connectToWeb3(){
       this.web3Plug = new Web3Plug()

          this.web3Plug.getPlugEventEmitter().on('stateChanged', function(connectionState) {
                console.log('stateChanged',connectionState);

                // CUSTOM CODE HERE
                this.activeAccountAddress = connectionState.activeAccountAddress
                this.activeNetworkId = connectionState.activeNetworkId
                // END CUSTOM CODE

              }.bind(this));

          this.web3Plug.getPlugEventEmitter().on('error', function(errormessage) {
                console.error('error',errormessage);

                //CUSTOM CODE HERE
                this.web3error = errormessage
                // END CUSTOM CODE
              }.bind(this));


          this.web3Plug.connectWeb3( )


          this.networkName = this.web3Plug.getWeb3NetworkName(this.activeNetworkId)

 
          console.log('networkName', this.networkName )
    },

    connectedToWeb3(){

      return (this.web3Plug != null && this.web3Plug.getConnectionState().activeNetworkId != null )
      
      },

       getEtherscanBaseURL(){

        let providerNetworkID = this.web3Plug.getConnectionState().activeNetworkId

        if( providerNetworkID == 42){
          return  'https://kovan.etherscan.io'
        }

        return 'https://etherscan.io'
    },

    onSelectedAssetCallback(asset){
      console.log('onSelectedAssetCallback', asset )

      this.selectedActionAsset = asset
    }


  }
}
</script>
