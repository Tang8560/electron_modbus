function openControl(evt, control) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(control).style.display = "block";
    evt.currentTarget.className += " active";
  }

function updateElement() {
    // Get the selected option value
    var selectedOption = document.getElementById("mode").value;

    // Update the output element based on the selected option
    var outputElement = document.getElementById("ip");
    outputElement.textContent = "You selected: " + selectedOption;
  }