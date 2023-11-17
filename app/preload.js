// <select id="dynamic-select"> change event
function onChange() {
    // Get the selected value from the select element
    var selectedValue = document.getElementById('dynamic-select').value;

    if (selectedValue == "RTU"){
      var comportLabel  = document.createElement('label');
      var slaveIDLabel  = document.createElement('label');
      var baudrateLabel = document.createElement('label');
      var parityLabel   = document.createElement('label');
      var stopbitsLabel = document.createElement('label');
      var comportInput  = document.createElement('input');
      var slaveIDInput  = document.createElement('input');
      var baudrateInput = document.createElement('input');
      var parityInput   = document.createElement('input');
      var stopbitsInput = document.createElement('input');
      comportLabel.textContent  = 'COM Port : ';
      slaveIDLabel.textContent  = 'Slave ID : ';
      baudrateLabel.textContent = 'Baudrate : ';
      parityLabel.textContent   = 'Parity : ';
      stopbitsLabel.textContent = 'Stopbits : ';
      comportInput.setAttribute('id', 'comport');
      slaveIDInput.setAttribute('id', 'slaveID');
      baudrateInput.setAttribute('id', 'baudrate');
      parityInput.setAttribute(  'id', 'parity');
      stopbitsInput.setAttribute('id', 'stopbits');

      document.getElementById('init-panel').innerHTML = '';
      document.getElementById('init-panel').appendChild(comportLabel);
      document.getElementById('init-panel').appendChild(comportInput);
      document.getElementById('init-panel').appendChild(slaveIDLabel);
      document.getElementById('init-panel').appendChild(slaveIDInput);
      document.getElementById('init-panel').appendChild(baudrateLabel);
      document.getElementById('init-panel').appendChild(baudrateInput);
      document.getElementById('init-panel').appendChild(parityLabel);
      document.getElementById('init-panel').appendChild(parityInput);
      document.getElementById('init-panel').appendChild(stopbitsLabel);
      document.getElementById('init-panel').appendChild(stopbitsInput);
    }
    else if(selectedValue == "TCP"){
      var ipLabel   = document.createElement('label');
      var portLabel = document.createElement('label');
      var ipInput   = document.createElement('input');
      var portInput = document.createElement('input');
      ipLabel.textContent   = 'IP Address : ';
      portLabel.textContent = 'Port : ';
      ipInput.setAttribute('id', 'ip');
      portInput.setAttribute('id', 'port');
      document.getElementById('init-panel').innerHTML = '';
      document.getElementById('init-panel').appendChild(ipLabel);
      document.getElementById('init-panel').appendChild(ipInput);
      document.getElementById('init-panel').appendChild(portLabel);
      document.getElementById('init-panel').appendChild(portInput);
    }
    console.log("Select Mode :", selectedValue);
}

// <div class="splitter"> drag event
function onLoad() {
      dragElement( document.querySelector(".splitter"), "H" );
}

// <div class="splitter"> drag event
function dragElement( element, direction, handler ) {
    // Two variables for tracking positions of the cursor
    const drag = { x : 0, y : 0 };
    const delta = { x : 0, y : 0 };
    /* If present, the handler is where you move the DIV from
       otherwise, move the DIV from anywhere inside the DIV */
    handler ? ( handler.onmousedown = dragMouseDown ): ( element.onmousedown = dragMouseDown );

    // A function that will be called whenever the down event of the mouse is raised
    function dragMouseDown( e )
    {
      drag.x = e.clientX;
      drag.y = e.clientY;
      document.onmousemove = onMouseMove;
      document.onmouseup = () => { document.onmousemove = document.onmouseup = null; }
    }

    // A function that will be called whenever the up event of the mouse is raised
    function onMouseMove( e )
    {
      const currentX = e.clientX;
      const currentY = e.clientY;

      delta.x = currentX - drag.x;
      delta.y = currentY - drag.y;

      const offsetLeft = element.offsetLeft;
      const offsetTop = element.offsetTop;

      const first = document.querySelector(".left-control");
      const second = document.querySelector(".right-control");
      let firstWidth = first.offsetWidth;
      let secondWidth = second.offsetWidth;
      // Horizontal
      if (direction === "H" ) {
          element.style.left = offsetLeft + delta.x + "px";
          firstWidth += delta.x;
          secondWidth -= delta.x;
      }
      drag.x = currentX;
      drag.y = currentY;
      first.style.width = firstWidth + "px";
      second.style.width = secondWidth + "px";
    }
}

module.exports = {
    onChange,
    onLoad,
};