//


//Parse Data and Plot Charts
function plots(id) {
     d3.json("samples.json").then((data) => {
        console.log(data);

//Get Metadata Table
  var metadata = data.metadata[0];
    
//Append Data to Table 
      Object.entries(metadata).forEach(([key, value]) => {
        d3.select("#sample-metadata")
          .append("h5")
            .text(`${key}:${value}`)
               })
  
//Get Samples by ID 
  var samples = data.samples.filter(d => d.id.toString() === id)[0];
  
//Sort and Slice Sample Values to Display Top 10 
        
  var samples_vs = samples.sample_values.slice(0, 10).reverse();
  var o_ids = (samples.otu_ids.slice(0, 10)).reverse();
  var o_labels = (samples.otu_labels.slice(0, 10)).reverse();
  
//Format the OTU IDs
  var new_labels = o_labels.map(d => "OTU" + d);
  
//Create Trace for Bar Chart
  var trace1 = {
    x: samples_vs.sort((a, b) => a - b),
      y: new_labels,
        type: "bar",
          orientation : "h",
             text: o_labels,
        };
  
        var data = [trace1];
  
        var layout = {
           title: "Top 10 OTUs",
        };
        
//Plot Bar Chart
  Plotly.newPlot("bar", data, layout);
  
//Create Trace for Bubble Chart
  var trace2 = {
    x: samples.otu_ids,
      y: samples.sample_values,
        mode: "markers",
          marker: {
            size: samples.sample_values,
              color: samples.otu_ids
           },
           text: samples.otu_labels
       };
  
       var data2 = [trace2];
  
       var layout2 = {
           title: "OTU ID"
       };
  
//Plot Bubble Chart 
  Plotly.newPlot("bubble", data2, layout2);
    });
  };
  
  
//Create Option Changing Event Function 
  function  optionChanged(id) {
     plots(id);
  }
  
//Initialize Page
  function init() {

//Use D3 to Select Dropdown Menu
  var dropdownMenu = d3.select("#selDataset");
  
//Fetch JSON Data and Console Log
  d3.json("samples.json").then((data) => {
    console.log(data);
     
//Extract IDs
  var names = data.names;
    names.forEach((value) => {
      dropdownMenu.append("option").text(value).property("value");
         });
  
//Display Plots
  plots(names[0]);
     });
  
  }
  init();