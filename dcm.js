
var contractAddress="0x8c3381e0C792F9F7a982183368DE2178122c39ac";
var abi =    [

  {
      "inputs":[],"stateMutability":"nonpayable", "type":"constructor"
  },

  {
      "outputs":[],"inputs":[{
      "name":"_ref", "internalType":"address", "type":"address"
  }],"name":"Ido", "stateMutability":"payable", "type":"function"
  },

  {
      "outputs":[],"inputs":[],"name":"IdoEnd", "stateMutability":"nonpayable", "type":"function"
  },

  {
      "outputs":[{
      "name":"", "internalType":"bool", "type":"bool"
  }],"inputs":[{
      "name":"", "internalType":"address", "type":"address"
  }],"name":"buy", "stateMutability":"view", "type":"function"
  },

  {
      "outputs":[{
      "name":"", "internalType":"bool", "type":"bool"
  }],"inputs":[{
      "name":"", "internalType":"address", "type":"address"
  }],"name":"canIdo", "stateMutability":"view", "type":"function"
  },

  {
      "outputs":[],"inputs":[],"name":"claim", "stateMutability":"nonpayable", "type":"function"
  },

  {
      "outputs":[],"inputs":[],"name":"cleanToken", "stateMutability":"nonpayable", "type":"function"
  },

  {
      "outputs":[{
      "name":"", "internalType":"uint256", "type":"uint256"
  }],"inputs":[],"name":"getBNBAmount", "stateMutability":"nonpayable", "type":"function"
  },

  {
      "outputs":[],"inputs":[{
      "name":"_token", "internalType":"address", "type":"address"
  }],"name":"setToken", "stateMutability":"nonpayable", "type":"function"
  },

  {
      "stateMutability":"payable", "type":"receive"
  }]
;
var account = '';
const metamaskChainID = 1116;
const metamaskHexChainID = "0x45c";
var timmer=5;





setInterval("getPart(1681531200)", 1000); 

setInterval("GetQueryString('ref')",2000)



function getPart(endTime) {
    //获取当前时间戳并换算为秒做单位
    const current = Date.parse(new Date()) / 1000
    //时间戳相差多少秒
    let diff = endTime - current

    //判断是否过时
    if (diff > 0) {      

      let d = Math.floor(diff / (3600 * 24))        //获取天数
      let h = Math.floor((diff % (3600 * 24)) / (60 * 60))        //获取时
      let m = Math.floor(((diff % (3600 * 24)) % (60 * 60)) / 60)        //获取分
      let s = Math.floor(diff % 60)        //获取秒
      d = d < 10? "0" + d : d;
      h = h < 10? "0" + h : h;
      m = m < 10? "0" + m : m;
      s = s < 10? "0" + s : s;
      let _diffData = [d, h, m, s]


      $("#d1").text(_diffData[0].toString().substring(0,1));
      $("#d2").text(_diffData[0].toString().substring(1,2));
     
      $("#h1").text(_diffData[1].toString().substring(0,1));
      $("#h2").text(_diffData[1].toString().substring(1,2));
     
      $("#m1").text(_diffData[2].toString().substring(0,1));
      $("#m2").text(_diffData[2].toString().substring(1,2));
     
      $("#s1").text(_diffData[3].toString().substring(0,1));
      $("#s2").text(_diffData[3].toString().substring(1,2));

      





    } else {
      let _diffData = ["00", "00", "00","00"];
    }
}


 async function connect(){
    // alert("test")

    // document.getElementById("#test").val="121312312";
    // alert("test2")
    let provider = new ethers.providers.JsonRpcProvider("https://rpc.coredao.org/");

    let accounts = await window.ethereum.request({method:"eth_requestAccounts"});
    swal({
      title: "Connect Success!",
      text: "Success!",
      icon: "success",
      button: "ok",
    });
    $("#account").text(accounts[0].toString().substring(0,2)+"...."+accounts[0].toString().substring(accounts[0].length-3,accounts[0].length));
    account=accounts[0];
    let bnbBalance=0.00;
    await provider.getBalance(account).then((_res)=>{
      bnbBalance=ethers.utils.formatEther(_res);
    });

    $("#amountBNB").text(parseFloat(bnbBalance).toFixed(3));

  

}


function copy(){




  if(account==''){

    swal({
      title: "connect error!",
      text: "Please conncet first ",
      icon: "info",
      button: "ok",
    });
 
  }



    const dom = document.createElement("input");
    var ref_addr=account;

    if(account==undefined){
      ref_addr="";
    }
    dom.value = "https://financehelperx.github.io/dcmtest/?ref="+ref_addr;

    document.body.appendChild(dom);
    dom.select();
    document.execCommand("copy");
    document.body.removeChild(dom);
    swal({
      title: "Good job!",
      text: "copy success!",
      icon: "success",
      button: "ok",
    });

  }


  async function buy() {


    let provider =new ethers.providers.Web3Provider(window.ethereum);
 
        //构造合约对象
    var  myContract = new ethers.Contract(contractAddress,abi,provider.getSigner());
		
    if(account==''){

      swal({
        title: "connect error!",
        text: "Please conncet first ",
        icon: "error",
        button: "ok",
      });


  
   
    }
		// var value_buy = ethers.utils.parseEther($("#price").val());
    // console.log("value_buy",value_buy);
    var ether_amount = ethers.utils.parseEther("0.115");
    // var ref = GetQueryString("ref");
 


		if (location.href.includes("ref")) {
			var ref = GetQueryString("ref");

        if(ref=="" || ref.length<15) ref ="0x0000000000000000000000000000000000000000";

      console.log("ref=>",ref);

			myContract.Ido(ref,
                {
                    gasLimit: 28500000,
                    gasPrice: ethers.utils.parseUnits("31", "gwei"),
                    value: ether_amount
                 }
                
                ).then((res)=>{
                  swal({
                    title: "Good job!",
                    text: "copy success!",
                    icon: "success",
                    button: "ok",
                  });
                }).catch(e =>{
                      swal({
      title: "so hot !",
      text: "try again!",
      icon: "error",
      button: "ok",
    });
                })
		} else {
			var ref = "0x0000000000000000000000000000000000000000"
			myContract.Ido(ref,
                {
                    gasLimit: 28500000,
                    gasPrice: ethers.utils.parseUnits("31", "gwei"),
                    value:ether_amount
                 }
                
                ).then(function (res) {
                  connect();
			}).catch( e =>{
				console.log(e)
			});
		}

	
}



function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null){
    // console.log("邀请链接:",decodeURI(r[2]));
    return decodeURI(r[2]);
  } 
  
  return null;  
}





function getChain() {

  let provider =new ethers.providers.Web3Provider(window.ethereum);



provider.getNetwork().then((cid)=> {
  if (cid.chainId == metamaskChainID) {
  connectWallet();
  } else {
  window.ethereum.request({
    "method": "wallet_switchEthereumChain",
    "params": [{
    "chainId": metamaskHexChainID
    }]
  }).then(() => {
    connectWallet();
  }).catch(err => {console.log("switch error:",err)
    window.ethereum.request({
    "method": "wallet_addEthereumChain",
    "params": [{
      "chainId": metamaskHexChainID,
      "chainName": "Arbitrum One",
      "rpcUrls": ["https://rpc.coredao.org/"],
      "nativeCurrency": {
      "name": "Core",
      "symbol": "Core",
      "decimals": 18
      },
      "blockExplorerUrls": ["https://scan.coredao.org"]
    }]
    }).catch(err=>{
    console.log("add err:",err)
    });
  });
  }
});
}
