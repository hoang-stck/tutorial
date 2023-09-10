function readFileA () {
    //GET SELECTED FILE
    let selected = document.getElementById("inputFile").files[0];
   
    //READ SELECTED FILE
    let reader = new FileReader();
    reader.addEventListener("loadend", () => {
        //split the content by lines
        let lines = reader.result.split(/\r?\n/);

        //Initialize a variable to store the result HTML
        let sumValuesHTML ="";
        let decideValuesHTML = "";

        //Iterate through each line
        for (let line of lines) {

        //Split each line by commas to get individual integers
            let integers = line.split(',');

        //ensure there are exactly 2 integers on each line
            if (integers.length === 2) {
                //Parse the integers
                let num = parseInt(integers[0]);
                let num1 = parseInt(integers[1]);

        //Calculate the sum and answer
                let sum = num + num1;
                let decide = sum < 5 ? 0 : 1;
        //apppend sum and decide values
        sumValuesHTML += `${num},${num1} = ${sum}<br>`;
        decideValuesHTML += `${decide}<br>`;
            }
        }

        //Display the result in the "outputSpace" div
    document.getElementById("sumValues").innerHTML = sumValuesHTML;
    document.getElementById("decideValues").innerHTML = decideValuesHTML;
    });

    reader.readAsText(selected);
}

document.getElementById("downloadButton").addEventListener("click", function() {
    //get the content of the div
    const content = document.getElementById("decideValues").innerHTML;

    //extract the decide values and join them with line breaks
    const decideValues = content.match(/\b[01]\b/g);

    if (decideValues) {
        //join the decide values with line breaks
        const decideText = decideValues.join('\n');

        //create a blob with the content and speccify MIME type as plain text
        var blob = new Blob([decideText], {type: "text/plain"});
    
    //create a downloead link
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "result.txt";
    a.style.display = "none";

    //add the link to the document and click it programmatically
    document.body.appendChild(a);
    a.click();

    //clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
    } else {
        alert("No decide values found.")
    }
});
