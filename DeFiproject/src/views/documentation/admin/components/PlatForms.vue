<template>
  <el-row :gutter="40" class="plat-form">
    <el-col :xs="24" :sm="24" :lg="24">
      <div class=" m-t m-b">
        <span class="fontSize">PlatForms</span>
      </div>
    </el-col>
    <el-col v-for="(first, i) in firstfloor" :key="i" :xs="24" :sm="8" :lg="8">
      <div class="box-small" @click="gopage(first)">
        <span>
          <!-- <img src="http://protocol-icons.s3.amazonaws.com/yearn.png" style="height: 20px"> -->
          <img :src="getImg( first.metadata.name )" style="height: 20px">
        &nbsp;&nbsp;&nbsp;&nbsp;{{ first.metadata.name }} </span>
      </div>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: 'PlatForms',
  props: ['data', 'index'],
  data() {
    return {
      nameaddress:this.$route.query.nameaddress,
      firstfloor: []
      // nameaddress: this.$route.params.nameaddress

    }
  },
  created() {
    // 前段从后台取数据
    // this.getData()
    this.defiSDK()
    //this.saddress()
  },
  methods: {
    saddress() {
       console.log("saddress")
      const vm = this
      parentData = vm.$props.data
      vm.$message(parentData)
      console.log(parentData)
    },
    getImg(deifName) {
      console.log("deifName==="+deifName)
      // console.log("userAddress---------------------------",nameaddress)
      return require("../img/"+deifName+".png")

    },
    gopage(a) {
      // console.log("a",a.metadata.name)
      this.$router.push({ name: 'DeFiList',params:{ name:a }})
      // this.$router.push({ path: '/defilist/index', query: { name: a }})
    },
    // getData() {
    //   requestUtil({
    //     baseURI: 'http://localhost:8080',
    //     url: '/DefiServer/Main/getCoinBalancerRate'
    //     method: 'post',
    //     data() {
    //       return undefined;
    //     }
    //   })
    // }
    defiSDK() {
      // console.log("userAddress---------------------------",nameaddress)
      // defiSdk.getProtocolBalance(account, protocol ).then(balance => console.log(balance))
      const ethers = require('ethers')
      const DeFiSdkAbi = require('../defi-sdk-abi')
      const BN = require('bignumber.js')

      const nodeUrl = 'https://eth-mainnet.zerion.io/'
      const DeFiSdkAddress = '0x06FE76B2f432fdfEcAEf1a7d4f6C3d41B5861672'
      const userAddress = '0x1fe5F397e38fFe61E663d96821F41bCF83ed7959'
      // 0x358A6C0F7614C44b344381b0699E2397b1483252   ' 0x42b9dF65B219B3dD36FF330A4dD8f327A6Ada990';0x1fe5F397e38fFe61E663d96821F41bCF83ed7959
      const ethereumNode = new ethers.providers.JsonRpcProvider(nodeUrl)

      const defiSdk = new ethers.Contract(DeFiSdkAddress, DeFiSdkAbi, ethereumNode);
      (async() => {
        // 计算真实余额
        function getNormalizedNumber(number, decimals) {
          return new BN(number).dividedBy(
            new BN(10).pow(decimals)
          )
        }

        var protocolList = new Array()
        // List of available protocols
        /*const protocols = await defiSdk.getProtocolNames()
        // console.log( protocols[37]);
        protocols.forEach((protocol) => {
          protocolList.push(protocol)
        })
*/
        // console.log("protocolList")
        console.log(protocolList)
        console.log('1___________________________')

        // Protocol metadata   产品的图标和描述
        //const protocolMetaData = await defiSdk.getProtocolMetadata('Curve')
        // const protocolMetaData = await defiSdk.getProtocolMetadata['yearn.finance • Vaults', 'Synthetix', 'PoolTogether', 'Idle', 'dYdX', 'Curve', 'Balancer', 'Aave']
       /* console.log('Protocol', {
          'Name:': protocolMetaData.name,
          'Logo:': protocolMetaData.iconURL
        })
*/
        console.log('2___________________________')
        // User balances on selected protocols or use getBalances(userAddress) for all protocols at once
        const balancesOnSelectedProtocols = await defiSdk.getProtocolBalances(
          userAddress, ['yearn.finance • Vaults', 'Synthetix', 'PoolTogether', 'Idle', 'dYdX', 'Curve', 'Balancer', 'Aave']// protocolList // ['dYdX','Aave']//['Aave', 'Compound', 'Synthetix', 'PoolTogether'] ['Compound','Curve','yearn.finance • Vaults']
        )

        this.firstfloor = balancesOnSelectedProtocols

        console.log(balancesOnSelectedProtocols)

        balancesOnSelectedProtocols.forEach((protocol) => {
          // The top level has protocol and adapters information
          console.log('Protocol 名字:', protocol.metadata.name)
          var ss = new Array()
          console.log(protocol.adapterBalances)
          protocol.adapterBalances.forEach((protocolBalances) => {
            // Each adapter could either be an Asset or Debt on the protocol
            console.log('Balance type:', protocolBalances.metadata.adapterType)
            // console.log("aaaaaaaa",protocolBalances.balances)
            protocolBalances.balances.forEach((balance) => {
              // Inside of each adapter there is an info about the asset and the balance
              const position = {
                'Token': balance.base.metadata.name,
                'Balance': getNormalizedNumber(balance.base.amount.toString(), balance.base.metadata.decimals).toString()
              }

              // If asset is a derivative then there will be underlying assets
              if (balance.underlying.length > 0) {
                const underlying = []
                balance.underlying.forEach((asset) => {
                  underlying.push({
                    'Component': asset.metadata.name,
                    'Amount': getNormalizedNumber(
                      asset.amount.toString(), asset.metadata.decimals
                    ).toString()
                  })
                })
                position['Underlying'] = underlying
              }
              console.log('Position:', position)
            })
          })
          console.log('3___________________________')
        })

        // Decode derivative into underlyings (Uniswap cDAI ETH as an example)
        console.log('4___________________________')
        /* let derivative = await defiSdk.getFinalFullTokenBalance(
             "Balancer Pool Token",//"Uniswap V1 pool token",//0x42b9dF65B219B3dD36FF330A4dD8f327A6Ada990 Uniswap V1 0x34E89740adF97C3A9D3f63Cc2cE4a914382c230b
             '0x34E89740adF97C3A9D3f63Cc2cE4a914382c230b'
         );*/

        /* let derivative = await defiSdk.getFinalFullTokenBalance(
           "Uniswap V1 pool token",
           '0x34E89740adF97C3A9D3f63Cc2cE4a914382c230b'
       );

         console.log('Token', derivative.base.metadata.name);

         if(derivative.underlying.length > 0) {
             let components = [];

             derivative.underlying.forEach((component) => {
                 components.push(
                     {
                         'Component': component.metadata.name,
                         'Amount': getNormalizedNumber(component.amount.toString(), component.metadata.decimals).toString(),
                         'Symbol': component.metadata.symbol
                     }
                 )
             });

             console.log('Consists of ', components);
         } else {
             console.log('Is base token');
         }*/
      })()
      //
      // const account  = "0x42b9dF65B219B3dD36FF330A4dD8f327A6Ada990";
      // defiSdk.getProtocolBalance(account,protocol).then(balances =>   {console.log(balances)});
      /*
      balances[0].balances[0].balances[0].base.balance = 10123316108809287267803  余额
      balances[0].balances[0].balances[0].base.metadata.decimals = 18  精度
      balances[0].balances[0].balances[0].base.metadata.name = yearn Curve.fi yDAI/yUSDC/yUSDT/yTUSD
      balances[0].metadata.logo.href   图标地址

      */
      // defiSdk.getBalances("0x0ef51b7dac3933b8109482e7d910c21848e45da0f").then(data => {console.log(data)})

      // var FileSaver = require('file-saver');
      // let data = {
      //     name:"hanmeimei",
      //     age:88
      // }
      // var content = JSON.stringify(jsondata);
      // var blob = new Blob([content ], {type: "text/plain;charset=utf-8"});
      // FileSaver.saveAs(blob, "balances.txt");
    }
  }
}
</script>

<style lang="scss" scoped>
.plat-form {
  .box-small {
    padding: 10px;
    border: 1px solid black;
    margin-bottom: 15px;
    cursor:pointer;
  }
  .fontSize {
    font-size: 20px;
  }
  .m-t {
    margin-top: 20px;
  }
  .m-b {
    margin-bottom: 20px;
  }
}
</style>
