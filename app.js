window.onload = function() {
  
  var dugmeSacuvaj = document.querySelector("#forma");
  dugmeSacuvaj.addEventListener("submit", SacuvajLista);

}

function AjaxZahtev(options, callback) {
  var req = new XMLHttpRequest();
  req.open(options.metod, options.putanja, true);
  req.addEventListener("load", function() {
    if (req.status < 400) {
      console.log(req);
 		  callback(req.responseText);
    }
    else {
 		  callback(new Error("Request failed: " + req.statusText));
    }
  });
  req.addEventListener("error", function() {
    callback(new Error("Network error"));
  });
  req.send(options.sadrzaj);

}



function SacuvajLista(e){
  e.preventDefault();

  var ime = document.querySelector("#name").value;
  var spisak = document.querySelector("#title").value;
  var beleske = document.querySelector("#message").value;

  var options = {}
  options.metod = "post";
  options.putanja  = "novaLista";
  var poruka = {"ime":ime, "spisak":spisak, "beleske":beleske}
  options.sadrzaj = JSON.stringify(poruka); 
  AjaxZahtev(options, PrikaziOdgovorNaPoruku)
}

  function PrikaziOdgovorNaPoruku(odgovor){
  var odgovor2 = JSON.parse(odgovor);

  var tekst = "<section> <p>" + odgovor2.ime + "</p>";  
  tekst += "<p>" + odgovor2.spisak + "</p>";
  tekst += "<p>" + odgovor2.beleske + "</p> </section>"
  document.getElementById("liste").innerHTML = tekst + document.getElementById("liste").innerHTML;
 
}