const { onChange, onLoad } = require('./preload')
const ModbusRTU = require("modbus-serial")

// Modbus function
//=========================================================================
// Connect/Disconnect
const connectBtn            = document.querySelector('#connect');
const disconnectBtn         = document.querySelector('#disconnect');
// Read mode
const readCoilsBtn          = document.querySelector('#FC1');
const readDiscreteInBtn     = document.querySelector('#FC2');
const readHoldingRegBtn     = document.querySelector('#FC3');
const readInputRegBtn       = document.querySelector('#FC4');
// Write mode
const writeSingleCoilBtn    = document.querySelector('#FC5');
const writeSingleRegBtn     = document.querySelector('#FC6');
const writeMultipleCoilsBtn = document.querySelector('#FC15');
const writeMultipleRegBtn   = document.querySelector('#FC16');
// Command mode
const sendBtn               = document.querySelector('#send');

//=========================================================================
let client;
let comportValue, slaveIDValue, baudrateValue, parityValue, stopbitsValue
let receBuffer = document.getElementById('Receive Buffer');
let resultData = document.getElementById('Result Data');

// Connect button event
connectBtn.addEventListener('click', () => {
  console.log("Connect Successfully!!");
  var selectedValue = document.getElementById('dynamic-select').value;
  client = new ModbusRTU();
  if (selectedValue == "RTU") {
    comportValue  = document.getElementById('comport').value;
    slaveIDValue  = document.getElementById('slaveID').value;
    baudrateValue = document.getElementById('baudrate').value;
    parityValue   = document.getElementById('parity').value;
    stopbitsValue = document.getElementById('stopbits').value;

    client.connectRTU(comportValue, {
      baudRate: parseInt(baudrateValue),
      parity: parityValue,
      stopBits: parseInt(stopbitsValue)
    });
  }
  else if (selectedValue == "TCP") {
    var ipValue  = document.getElementById('ip').value;
    var portValue  = document.getElementById('port').value;

    client.connectTCP(ipValue, { port: parseInt(portValue) });
  }
});

// Disconnect button event
disconnectBtn.addEventListener('click', () => {
  client.close((err) => {
    if (err) {
      console.error('Error closing :', err.message);
    } else {
      console.log('Disconnect Successfully!!');
    }
  });
});

//=========================================================================
// Read button event
//=========================================================================
// FC1 "Read Coil Status"	      readCoils(coil, len)
// FC2 "Read Input Status"	    readDiscreteInputs(addr, arg)
// FC3 "Read Holding Registers"	readHoldingRegisters(addr, len)
// FC4 "Read Input Registers"	  readInputRegisters(addr, len)
//=========================================================================

readCoilsBtn.addEventListener('click', () => {
  console.log("[FC1] Read Coils")
  client.setID(parseInt(slaveIDValue));
  startAddRValue = document.getElementById('startAddR').value;
  numberValValue = document.getElementById('numberVal').value;
  client.readCoils(parseInt(startAddRValue), parseInt(numberValValue))
    .then(console.log);
    receBuffer.value += data.buffer + '\n';
    resultData.value += data.data + '\n';
});
readDiscreteInBtn.addEventListener('click', () => {
  console.log("[FC2] Read Discrete Inputs")
  client.setID(parseInt(slaveIDValue));
  startAddRValue = document.getElementById('startAddR').value;
  numberValValue = document.getElementById('numberVal').value;
  client.readDiscreteInputs(parseInt(startAddRValue), parseInt(numberValValue))
    .then(console.log);
    receBuffer.value += data.buffer + '\n';
    resultData.value += data.data + '\n';
});
readHoldingRegBtn.addEventListener('click', () => {
  console.log("[FC3] Read Holding Registers")
  client.setID(parseInt(slaveIDValue));
  startAddRValue = document.getElementById('startAddR').value;
  numberValValue = document.getElementById('numberVal').value;
  client.readHoldingRegisters(parseInt(startAddRValue), parseInt(numberValValue))
    .then(console.log);
    receBuffer.value += data.buffer + '\n';
    resultData.value += data.data + '\n';
});
readInputRegBtn.addEventListener('click', () => {
    console.log("[FC4] Read Input Registers")
    client.setID(parseInt(slaveIDValue));
    startAddRValue = document.getElementById('startAddR').value;
    numberValValue = document.getElementById('numberVal').value;
    data = client.readInputRegisters(parseInt(startAddRValue), parseInt(numberValValue));
    console.log(data);
    receBuffer.value += data.buffer + '\n';
    resultData.value += data.data + '\n';
});

//=========================================================================
// Write button event
//=========================================================================
// FC5 "Force Single Coil"	        writeCoil(coil, binary)   //NOT setCoil
// FC6 "Preset Single Register"	    writeRegister(addr, value)
// FC15 "Force Multiple Coil"	      writeCoils(addr, valueAry)
// FC16 "Preset Multiple Registers"	writeRegisters(addr, valueAry)
//=========================================================================
writeSingleCoilBtn.addEventListener('click', () => {
});
writeSingleRegBtn.addEventListener('click', () => {
});
writeMultipleCoilsBtn.addEventListener('click', () => {
});
writeMultipleRegBtn.addEventListener('click', () => {
});

// Send button event
sendBtn.addEventListener('click', () => {
});