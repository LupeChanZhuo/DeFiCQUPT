<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />
    <BoxLogo />
    <BoxCard2 />

   <!--  <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import BoxLogo from './components/BoxLogo'
import BoxCard2 from './components/BoxCard2'
//导入api包中的方法
import { getDataFunction } from '@/api/defi'
import requestUtil from '@/utils/request'
import { DeFiSDK } from 'defi-sdk';


let lineChartData = {
    newVisitis: {
      expectedData: [0, 0, 0, 0, 0, 0, 0],
      actualData: [0, 0, 0, 0, 0, 0, 0]
    },
    messages: {
      expectedData: [0, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 1, 106, 145, 150, 130]
    },
    purchases: {
      expectedData: [80, 100, 11, 104, 105, 90, 100],
      actualData: [120, 90, 100, 13, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 1, 142, 145, 150, 160],
      actualData: [120, 2, 91, 154, 162, 140, 130]
    }
  }

const nodeUrl = 'https://eth-mainnet.zerion.io/';
const defiSdk = new DeFiSDK(nodeUrl);

export default {
  name: 'DashboardAdmin',
  components: {
    /*右上角的github连接*/
    /*GithubCorner,*/
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard,
    BoxLogo,
    BoxCard2
  },
  data() {
    return {
      lineChartData:lineChartData.newVisitis
    }
  },
  methods: {
    getData() {
      requestUtil({
        baseURL:'http://localhost:8080',
        url: '/DefiServer/main/getCoinsBalancerRate',
        method: 'post',
        data: { //post请求用 data
            Name:['dai','eth','bal']
        }
      }).then(response => {
        window.console.log(response)
       
      })
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    printData() {

      console.log("chanzhuo")
      console.log(balance)
    },
    defiSDK() {
      window.console.log("hahahjahahahah");
      //defiSdk.getProtocolBalance(account, protocol ).then(balance => console.log(balance))
      const ethers = require('ethers');
      const DeFiSdkAbi = require('../defi-sdk-abi')
      const BN = require('bignumber.js')

      const nodeUrl = 'https://eth-mainnet.zerion.io/';
      const DeFiSdkAddress = '0x06FE76B2f432fdfEcAEf1a7d4f6C3d41B5861672';
      const userAddress = '0x42b9dF65B219B3dD36FF330A4dD8f327A6Ada990';
      //0x358A6C0F7614C44b344381b0699E2397b1483252   ' 0x42b9dF65B219B3dD36FF330A4dD8f327A6Ada990';0x1fe5F397e38fFe61E663d96821F41bCF83ed7959
      let ethereumNode = new ethers.providers.JsonRpcProvider(nodeUrl);

      let defiSdk = new ethers.Contract(DeFiSdkAddress, DeFiSdkAbi, ethereumNode);
      (async () => {

      //计算真实余额  
      function getNormalizedNumber(number, decimals) {
          return new BN(number).dividedBy(
              new BN(10).pow(decimals)
          );
      }


      var protocolList = new Array();
      // List of available protocols   
      let protocols = await defiSdk.getProtocolNames()
      //console.log( protocols[37]);
      protocols.forEach((protocol)=> {
        protocolList.push(protocol)
      })

      //console.log("protocolList")
      console.log(protocolList)

      console.log('1___________________________');

      // Protocol metadata   产品的图标和描述
      let protocolMetaData = await  defiSdk.getProtocolMetadata('Aave');

     
      console.log('Protocol', {
          'Name:': protocolMetaData.name,
          'Description:': protocolMetaData.description,
          'Website:': protocolMetaData.websiteURL,
          'Logo:': protocolMetaData.iconURL,
          'Version:': protocolMetaData.version.toNumber()
      });
    

      console.log('2___________________________');
      // User balances on selected protocols or use getBalances(userAddress) for all protocols at once
      let balancesOnSelectedProtocols = await defiSdk.getProtocolBalances(
          userAddress,["yearn.finance • Vaults", "Synthetix", "PoolTogether", "Idle", "dYdX", "Curve", "Balancer", "Aave"]//protocolList// ['dYdX','Aave']//['Aave', 'Compound', 'Synthetix', 'PoolTogether'] ['Compound','Curve','yearn.finance • Vaults']
      );

      

      balancesOnSelectedProtocols.forEach((protocol) => {
          // The top level has protocol and adapters information
          console.log('Protocol 名字:', protocol.metadata.name);
          protocol.adapterBalances.forEach((protocolBalances) => {
              // Each adapter could either be an Asset or Debt on the protocol
              console.log('Balance type:', protocolBalances.metadata.adapterType);
              protocolBalances.balances.forEach((balance) => {
                  // Inside of each adapter there is an info about the asset and the balance
                  let position = {
                      'Token': balance.base.metadata.name,
                      'Balance': getNormalizedNumber(balance.base.amount.toString(), balance.base.metadata.decimals).toString()
                  };

                  // If asset is a derivative then there will be underlying assets
                  if(balance.underlying.length > 0) {
                      let underlying = [];
                      balance.underlying.forEach((asset) => {
                          underlying.push({
                              'Component': asset.metadata.name,
                              'Amount': getNormalizedNumber(
                                  asset.amount.toString(), asset.metadata.decimals
                              ).toString()
                          })
                      });
                      position['Underlying'] = underlying
                  }

                  console.log('Position:', position);
              })
          })
          console.log('3___________________________');
      });

      // Decode derivative into underlyings (Uniswap cDAI ETH as an example)
     console.log('4___________________________');
     /*let derivative = await defiSdk.getFinalFullTokenBalance(
          "Balancer Pool Token",//"Uniswap V1 pool token",//0x42b9dF65B219B3dD36FF330A4dD8f327A6Ada990 Uniswap V1 0x34E89740adF97C3A9D3f63Cc2cE4a914382c230b
          '0x34E89740adF97C3A9D3f63Cc2cE4a914382c230b'
      );*/

     /*let derivative = await defiSdk.getFinalFullTokenBalance(
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

  })();
      //
      //const account  = "0x42b9dF65B219B3dD36FF330A4dD8f327A6Ada990";
      //defiSdk.getProtocolBalance(account,protocol).then(balances =>   {console.log(balances)});
      /*
      balances[0].balances[0].balances[0].base.balance = 10123316108809287267803  余额
      balances[0].balances[0].balances[0].base.metadata.decimals = 18  精度
      balances[0].balances[0].balances[0].base.metadata.name = yearn Curve.fi yDAI/yUSDC/yUSDT/yTUSD  
      balances[0].metadata.logo.href   图标地址

      */  
     //defiSdk.getBalances("0x0ef51b7dac3933b8109482e7d910c21848e45da0f").then(data => {console.log(data)})
        
        
        

        
      //var FileSaver = require('file-saver'); 
      // let data = {
      //     name:"hanmeimei",
      //     age:88
      // }
      // var content = JSON.stringify(jsondata);
      // var blob = new Blob([content ], {type: "text/plain;charset=utf-8"}); 
      // FileSaver.saveAs(blob, "balances.txt");
    }
  },
  created() {
    //前段从后台取数据
    //this.getData()
    this.defiSDK()
  }
}


</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
