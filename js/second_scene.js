// set the dimensions and margins for chart
const margin = {
    top: 25, 
    right: 20, 
    bottom: 35, 
    left: 40
},
width = 928,
height = 600;

function renderScene(params) {
    d3.select("#viz").remove();
    d3.select("#scene")
        .append("div")
        .attr("id", "viz");

    createViz(params);
}

function createViz(params) {

        const vizDiv = d3.select("#viz");
        vizDiv.append("div")
            // Container class to make it responsive
            .classed("svg-container", true) 
            .append("svg")
            // Responsive SVG needs these 2 attributes and no width and height attr
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", [-50, 0, width + 100, height + 50])
            .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif; padding-right: 50px;")
            // Class to make it responsive
            .classed("svg-content-responsive", true);

        const svg = d3.select(".svg-container > svg")
            .append("g");

    d3.csv("data/salaries-by-region.csv", function(data) {
        var salaryData = data.map(d => {
            return {
                "School Name": d["School Name"],
                "Region": d["Region"],
                "starting_median_salary": d["Starting Median Salary"],
                "mid_median_salary": d["Mid-Career Median Salary"],
                "Starting Median Salary": Number(d["Starting Median Salary"].replace(/[^0-9.-]+/g, "")),
                "Mid-Career Median Salary": Number(d["Mid-Career Median Salary"].replace(/[^0-9.-]+/g, ""))
            };
        });

        // Add X axis
        var x = d3.scaleLinear()
            .domain(d3.extent(salaryData, d => d["Starting Median Salary"])).nice()
            .range([margin.left, width - margin.right]);
        svg.append("g")
            .attr("transform", `translate(50,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80))
            
        // Add Y axis
        var y = d3.scaleLinear()
            .domain(d3.extent(salaryData, d => d["Mid-Career Median Salary"])).nice()
            .range([height - margin.bottom, margin.top]);
        svg.append("g")
            .attr("transform", `translate(${margin.left + 50},0)`)
            .call(d3.axisLeft(y))

        svg.append("text")
            .attr("x", (width / 2) - 40)
            .attr("y", height + margin.top)
            .text(params.xAxisLabel)
            .style("font-size", "14px");
        
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 20)
            .attr("x", (-height / 2) - 40)
            .text(params.yAxisLabel)
            .style("font-size", "14px");
        

        svg.append("g")
            .attr("stroke", "currentColor")
            .attr("stroke-opacity", 0.1)
            .attr("transform", `translate(50,0)`)
            .call(g => g.append("g")
                .selectAll("line")
                .data(x.ticks())
                .enter()
                .append("line")
                    .attr("x1", d => 0.5 + x(d))
                    .attr("x2", d => 0.5 + x(d))
                    .attr("y1", margin.top)
                    .attr("y2", height - margin.bottom))
            .call(g => g.append("g")
                .selectAll("line")
                .data(y.ticks())
                .enter()
                .append("line")
                    .attr("y1", d => 0.5 + y(d))
                    .attr("y2", d => 0.5 + y(d))
                    .attr("x1", margin.left)
                    .attr("x2", width - margin.right));

        // Add annotations for scene 1
        // Features of the annotation
        const annotations = [
            {
                note: {
                label: "Attending college in the Midwest leads to the lowest salaries both at graduation and mid-career.",
                },
                type: d3.annotationCalloutCircle,
                subject: {
                radius: 60,         // circle radius
                radiusPadding: 0   // white space around circle befor connector
                },
                color: ["black"],
                x: x(41800),
                y: y(71400),
                dy: 100,
                dx: 200
            }
        ];


        // Add annotation to the chart
        const makeAnnotations = d3.annotation()
            .annotations(annotations);

        svg.append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotations);
        // Add cirlces
        svg.append('g')
            .selectAll("circle")
            .data(salaryData)
            .enter()
            .append("circle")
                .attr("cx", function(d) { return x(d["Starting Median Salary"]); })
                .attr("cy", function(d) { return y(d["Mid-Career Median Salary"]); })
                .attr("r", 5)
                .attr("class", function(d) { return d["Region"]; })
                .classed("dot", true)
                .style("fill", function(d) { 
                    const region = d["Region"];
                    if (region === "Midwestern") {
                        return "#fdc1b4";
                    } else if (region == "California") {
                        return "#ffe797";
                    } else if (region == "Western") {
                        return "#027a7f";
                    } else if (region == "Southern") {
                        return "#e86c4f";
                    } else if ("Northeastern") {
                        return "#bfddce";
                    }
                })    
            .on("mouseover", function(d, event) {
                //Select hovering `circle` and fill it with black color
                d3.select(this).style("opacity", 0.4);
                //Select HTML-tag with class "school" and add text for "school"
                d3.select("#schoolname").text("School Name: " + d["School Name"]);
                //Select HTML-tag with class "region" and add text for "region"
                d3.select("#region").text("Region: " + d["Region"]);                
                //Select HTML-tag with class "year" and add text for "year"
                d3.select("#starting-salary").text("Starting: " + d["starting_median_salary"]);
                //Select HTML-tag with class "weight" and add text for "weight"
                d3.select("#mid-salary").text("Mid-Career: " + d["mid_median_salary"]);
                //Select HTML-tag with class "tooltip"
                d3.select("#tooltip")
                    //Apply left position according selected `circle` for tooltip
                    .style("left", (d3.event.pageX) + "px")
                    //Apply top position according selected `circle` for tooltip
                    .style("top", (d3.event.pageY - 28) + "px")
                    //Displays an element as a block element, which starts on a new line, and takes up the whole width
                    .style("display", "block")
                    //Apply opacity for 90 %
                    .style("opacity", 0.9);
                
                d3.selectAll(".dot")
                    .transition()
                    .duration(500)
                    .style("opacity", 0.1);

                d3.selectAll("." + d["Region"])
                    .transition()
                    .duration(500)
                    .style("opacity", 1.0);
            })
            //Add Event Listener | mouseout
            .on("mouseout", function(e, d) {
                //Give back color for unhovering `circle`
                d3.select(this).style("opacity", 0.1);
                //Hide tooltip
                d3.select("#tooltip").style("display", "none");

                d3.selectAll(".dot")
                    .transition()
                    .duration(500)
                    .style("opacity", 1);
            });


        
    
        //legend
        svg.append("circle").attr("cx", 140).attr("cy", height + 40).attr("r", 6).style("fill", "#fdc1b4").classed("legend", true);
        svg.append("circle").attr("cx", 290).attr("cy", height + 40).attr("r", 6).style("fill", "#ffe797").classed("legend", true);
        svg.append("circle").attr("cx", 440).attr("cy", height + 40).attr("r", 6).style("fill", "#027a7f").classed("legend", true);
        svg.append("circle").attr("cx", 590).attr("cy", height + 40).attr("r", 6).style("fill", "#e86c4f").classed("legend", true);
        svg.append("circle").attr("cx", 740).attr("cy", height + 40).attr("r", 6).style("fill", "#bfddce").classed("legend", true);
        svg.append("text").attr("x", 150).attr("y", height + 45).text("Midwestern").style("font-size", "15px").attr("alignment-baseline",500)
        svg.append("text").attr("x", 300).attr("y", height + 45).text("California").style("font-size", "15px").attr("alignment-baseline","end")
        svg.append("text").attr("x", 450).attr("y", height + 45).text("Western").style("font-size", "15px").attr("alignment-baseline","end")
        svg.append("text").attr("x", 600).attr("y", height + 45).text("Southern").style("font-size", "15px").attr("alignment-baseline","end")
        svg.append("text").attr("x", 750).attr("y", height + 45).text("Northeastern").style("font-size", "15px").attr("alignment-baseline","end");
    });
}


// init is entry point to application and initially renders the page
function init() {
    renderScene({ 
        circleColor: "lightblue", 
        xAxisLabel: "Median Starting Career Salary", 
        yAxisLabel: "Median Mid Career Salary" 
    });

}

init();
