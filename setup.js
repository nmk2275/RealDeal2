function setTab() {
    console.log("setTab() called");
    $('#status').append('<div>✔️ Tab setup done</div>');
  }
  
  function setVersion() {
    console.log("setVersion() called");
    $('#status').append('<div>✔️ Version setup done</div>');
  }
  
  $(document).ready(() => {
    setTab();
    setVersion();
  });
  