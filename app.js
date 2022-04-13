const express = require('express');
const solc = require('solc');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors()) // Use this after the variable declaration
app.use(express.json()); 
app.use(express.urlencoded()); //Parse URL-encoded bodies

app.post('/', (req, res) => {
  const folderId = 'test';
  const name = req.body.message;
  fs.mkdir(`contracts/${folderId}`, (err) => {
    console.error(err);
  });
  fs.writeFileSync(`contracts/${folderId}/ERC20.sol`, require('./templates/ERC20').code(name), (err) => {
    console.error(err);
  });
  const source = fs.readFileSync(`contracts/${folderId}/ERC20.sol`, 'utf-8');
  
  const compilerInput = {
    language: 'Solidity',
    sources:
    {
      'ERC20.sol': 
      {
        content: source
      }
    },
    settings:
    {
      optimizer:
      {
        enabled: true
      },
      outputSelection:
      {
        '*':{
          '*':['*']
        }
      }
    }
  };
  
  const output = JSON.parse(solc.compile(JSON.stringify(compilerInput)));
  console.log(output);
  
  const abi = output.contracts["ERC20.sol"][name].abi;
  const bytecode = output.contracts["ERC20.sol"][name].evm.bytecode.object;
  
  res.send({
    abi: abi,
    bytecode: bytecode
  });
});
   
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});