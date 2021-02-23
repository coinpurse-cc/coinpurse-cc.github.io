<template>


<div class=" container mx-auto bg-gray-800 " id="wallet">

  <Navbar /> 



      <div id="jumbotron" class=" ">




      </div>

 


      <section class="hero   "  >
        <div class="hero-body">

            <div class="whitespace-md"></div>


               Coinpurse


                

 
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
