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
let comportValue, slaveIDValue, baudrateValue, parityValue, stopbitsValue;
let commandBuffer = document.getElementById('Send Command');
let receBuffer    = document.getElementById('Receive Buffer');
let resultData    = document.getElementById('Result Data');

function intToHex(number, width) {
  let hexString = number.toString(16);
  return hexString.padStart(width, '0');
}

async function record(functionCode, data) {
  const p = await data;
  console.log("Data length : ", p.buffer.length);
  console.log("Data : ", Array.from(p.buffer));
  slaveIDValue   = intToHex(slaveIDValue, 2);
  startAddRValue = intToHex(startAddRValue, 2);
  numberValValue = intToHex(numberValValue, 2);
  packet = slaveIDValue + functionCode + startAddRValue + numberValValue + '\n';
  commandBuffer.value += packet      + '\n';
  receBuffer.value    += Array.from(p.buffer).toString() + '\n';
  resultData.value    += p.data   + '\n';
}


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

    client.connectTCP(ipValue, {
      port: parseInt(portValue)
    });
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

// readCoilsBtn.addEventListener('click', () => {
//   console.log("[FC1] Read Coils");
//   client.setID(parseInt(slaveIDValue));
//   startAddRValue = document.getElementById('startAddR').value;
//   numberValValue = document.getElementById('numberVal').value;
//   data = client.readCoils(parseInt(startAddRValue), parseInt(numberValValue))
//   console.log(data);
//   record("01", data);
// });
// readDiscreteInBtn.addEventListener('click', () => {
//   console.log("[FC2] Read Discrete Inputs");
//   client.setID(parseInt(slaveIDValue));
//   startAddRValue = document.getElementById('startAddR').value;
//   numberValValue = document.getElementById('numberVal').value;
//   data = client.readDiscreteInputs(parseInt(startAddRValue), parseInt(numberValValue))
//   console.log(data);
//   record("02", data);
// });
// readHoldingRegBtn.addEventListener('click', () => {
//   console.log("[FC3] Read Holding Registers");
//   client.setID(parseInt(slaveIDValue));
//   startAddRValue = document.getElementById('startAddR').value;
//   numberValValue = document.getElementById('numberVal').value;
//   data = client.readHoldingRegisters(parseInt(startAddRValue), parseInt(numberValValue))
//   console.log(data);
//   record("03", data);
// });
readInputRegBtn.addEventListener('click', () => {
    console.log("[FC4] Read Input Registers");
    client.setID(parseInt(slaveIDValue));
    startAddRValue = document.getElementById('startAddR').value;
    numberValValue = document.getElementById('numberVal').value;
    // data = client.readInputRegisters(parseInt(startAddRValue), parseInt(numberValValue));
    data = client.readInputRegisters(1, 2);
    console.log(data);
    record("04", data);
});

//=========================================================================
// Write button event
//=========================================================================
// FC5 "Force Single Coil"	        writeCoil(coil, binary)   //NOT setCoil
// FC6 "Preset Single Register"	    writeRegister(addr, value)
// FC15 "Force Multiple Coil"	      writeCoils(addr, valueAry)
// FC16 "Preset Multiple Registers"	writeRegisters(addr, valueAry)
//=========================================================================
// writeSingleCoilBtn.addEventListener('click', () => {
//   console.log("[FC5] Force Single Coil");
//   client.setID(parseInt(slaveIDValue));
//   startAddWValue = document.getElementById('startAddW').value;
//   writeValValue = document.getElementById('writeVal').value;
//   data = client.writeCoil(parseInt(startAddWValue), parseInt(writeValValue));
// });
// writeSingleRegBtn.addEventListener('click', () => {
//   console.log("[FC6] Preset Single Register");
//   client.setID(parseInt(slaveIDValue));
//   startAddWValue = document.getElementById('startAddW').value;
//   writeValValue = document.getElementById('writeVal').value;
//   data = client.writeRegister(parseInt(startAddWValue), parseInt(writeValValue));
// });
// writeMultipleCoilsBtn.addEventListener('click', () => {
//   console.log("[FC15] Force Multiple Coil");
//   client.setID(parseInt(slaveIDValue));
//   startAddWValue = document.getElementById('startAddW').value;
//   writeValValue = document.getElementById('writeVal').value;
//   data = client.writeCoils(parseInt(startAddWValue), parseInt(writeValValue));
// });
// writeMultipleRegBtn.addEventListener('click', () => {
//   console.log("[FC16] Preset Multiple Registers");
//   client.setID(parseInt(slaveIDValue));
//   startAddWValue = document.getElementById('startAddW').value;
//   writeValValue = document.getElementById('writeVal').value;
//   data = client.writeRegisters(parseInt(startAddWValue), parseInt(writeValValue));
// });

// // Send button event
// sendBtn.addEventListener('click', () => {
// });