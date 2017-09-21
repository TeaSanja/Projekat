var http = require("http");
var fs = require("fs");
var sve_liste=[]

var pocetna = fs.readFileSync("index.html","utf8");
var appcss = fs.readFileSync("app.css","utf8");
var appjs = fs.readFileSync("app.js","utf8");
var pozadina = fs.readFileSync("planer.jpg");

function prikaziPocetnuStranu(response){
  response.writeHead(200, {"Content-Type": "text/html"});
  fs.readFile("liste.txt", "utf8", function(error, text) {
       if (error)
          return;
        sve_liste = JSON.parse(text);
        var liste =""
        for(i=sve_liste.length-1;i>=0;i--){
          ime = sve_liste[i].ime
          spisak = sve_liste[i].spisak
          beleske = sve_liste[i].beleske
          liste += "<section> <p>" + ime + "</p>"
          liste += "<p>" + spisak + "</p>";  
          liste += "<p>" + beleske + "</p> </section>"
        }
        pocetna = pocetna.replace("#liste#", liste)
  });
  response.end(pocetna);
} 

function nepoznatURL(response){
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<h1>Not Found</h1>");
  response.end();
}

function UpisNaDisk(liste){
  fs.writeFile("liste.txt", liste, function(err) {
        if (err)
          console.log("Failed to write file:", err);
        else
          console.log("File written.");
});
}

function OdgovorNaZahtev(request,response){

  switch(request.url) {
    case "/": 
    case "/index.html": 
              prikaziPocetnuStranu(response);
              break;
    case "/app.css":
              response.writeHead(200, {"Content-Type": "text/css"});
              response.end(appcss);
              break;
    case "/planer.jpg":
              response.writeHead(200, {'Content-Type': 'image/jpg' });
              response.end(pozadina, 'binary');
              break;
    case "/app.js":
						  response.writeHead(200, {"Content-Type": "text/plain"});
	            response.end(appjs);
	            break;
    case "/novaLista":
              request.setEncoding('utf8');
              request.on('data', function (nova_lista) {   

                sve_liste.push(JSON.parse(nova_lista));
                UpisNaDisk(JSON.stringify(sve_liste));
                console.log(sve_liste);
                response.end(nova_lista);
              });
              break;
      default: 
	            nepoznatURL(response);
	            break;
	}
}
var port = process.env.PORT || 8008;
var server = http.createServer(OdgovorNaZahtev);
server.listen(port);
console.log("Server ceka zahteve na portu "+port);
