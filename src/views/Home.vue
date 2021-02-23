<template>


<div class=" container mx-auto bg-gray-800 " id="wallet">

  <Navbar /> 



      <div id="jumbotron" class=" ">




      </div>

 


      <section class="hero   "  >
        <div class="hero-body">

            <div class="whitespace-sm"></div>

               <div class="flex flex-col content-center justify-center w-full">  
                 <div class="w-full">  Free, feeless, non-custodial cryptocurrency bot for Discord  </div>
                   
                <div class="w-full text-gray-500 text-xs"   >  Powered by xDai Network + Ethereum + PoW Mineable Tokens</div>
               </div>



            <div class="whitespace-sm"></div>

         <div class="flex  ">  
              <img style="margin:0 auto" src="/assets/images/discordcollage.jpg"></img>
        </div>

          <div class="whitespace-md"></div>
            <div class="flex flex-col content-center justify-center w-full ">  
              <div  style="margin:0 auto" >
               <a  class=" mx-2 p-4 bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" href="https://discord.com/api/oauth2/authorize?client_id=813641559265378344&permissions=3072&scope=bot" target="_blank">
                Invite Coinpurse Bot into Discord! </a> 


                 <a   class="mx-2  p-4 bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50" href="https://discord.com/invite/JGEqqmS" target="_blank">
                Try it out in the 0xBTC Discord </a> 
            </div>
                


            </div> 

            <div class="whitespace-md"></div>

            <div> 
              <div class="text-lg text-white"> Getting Started </div>

              <div class="text-md  "> -Once the bot is invited to your server, type '!wallet' in the chat for commands. </div>
              <div class="text-md  "> -Users will need to install <a class="text-blue-500" href="https://metamask.io">Metamask</a> and <a class="text-blue-500" href="https://www.xdaichain.com/for-users/wallets/metamask/metamask-setup">Configure it for xDai Network</a> to send tips. </div>


               <div class="text-md  "> That's it! </div>


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
