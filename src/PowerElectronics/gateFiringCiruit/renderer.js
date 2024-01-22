var currentWindow = 'topic1Section'

function loadPdf(url){
    const pdfViewer = document.getElementById('pdf-viewer');
    document.getElementById(currentWindow).style.display = "none"
    document.getElementById("pdfContent").style.display = "block"

    pdfjsLib.getDocument(url).promise.then(function (pdfDoc) {
        const totalPages = pdfDoc.numPages;

        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            pdfDoc.getPage(pageNumber).then(page => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                const viewport = page.getViewport({ scale: 1.5 });
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };
                page.render(renderContext);

                pdfViewer.appendChild(canvas);
            });
        }
    }).catch(error => {
        console.error('Error loading PDF:', error);
    });
}
function startSimulation(simulationSrc) {
    // Assuming simulationSrc is the source of your simulation HTML file
    var iframe = document.getElementById("simulation-frame");
  
    // Check if the iframe exists
    if (iframe) {
      // Set the source of the iframe to the simulation HTML file
      iframe.src = simulationSrc;
  
      // Make the iframe visible
      iframe.style.display = "block";
    } else {
      // Handle the case where the iframe element is not found
      console.error("Iframe element not found.");
    }
  }

function componentActive(button){
    var liElements = document.getElementById("left-menu").querySelectorAll('li');

    liElements.forEach(function(li) {
        li.classList.remove("active");
    });
    currentWindow = button.id + "Section"
    button.classList.add("active");
    if(document.getElementById(button.id + "Section")){
        var childDivs = document.getElementById("right-menu").children;
        for (var i = 0; i < childDivs.length; i++) {
            childDivs[i].style.display = 'none';
        }
        document.getElementById(button.id + "Section").style.display = "block";
    }

}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("exit-pdf").addEventListener("click", function(){
        document.getElementById(currentWindow).style.display = "block";
        document.getElementById("pdfContent").style.display = "none";
        document.getElementById('pdf-viewer').innerHTML = '';
    });
});

function showContent(index) {
    const paragraphs = document.querySelectorAll('#' + currentWindow + ' .topics-display p');
    paragraphs.forEach((paragraph, i) => {
      paragraph.style.display = i === index ? 'flex' : 'none';
      paragraph.style.color = i === index ? 'black' : 'white';
    });
    console.log(index);
}
