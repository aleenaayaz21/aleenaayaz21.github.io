# aleenaayaz21.github.io

Colleges That Pay Back: A Narrative Visualization Project

The narrative visualization aims to convey that the institution where one pursues higher education significantly influences salary outcomes throughout their career. This visualization elaborates on how factors such as undergraduate major, the school's location, and the type of school impact expected salaries over a ten-year period.

The visualization adopts an interactive slide-show format, guiding the reader through a series of scenes or slides that they can navigate using provided buttons. Each slide offers explanations of the annotated visualizations, and users can delve deeper into the data by hovering over plotted data points.

The visualization employs annotated scatter plots to present the data consistently across all scenes, with Starting Career Median Salary on the x-axis and Mid-Career Median Salary on the y-axis. Annotations within each scene highlight key points of interest. User-directed transitions between charts allow for easy navigation through the slides.

The narrative is divided into three scenes, each showcasing plots of related datasets about median starting and mid-career salaries for higher education in the United States. The scenes are ordered from a broad overview to more detailed insights. 

In the first scene, the reader is presented with median salary data solely based on undergraduate majors, without tying the data to specific schools. The second scene introduces median salary data categorized by the regional location of schools—Midwestern, California, Western, Southern, and Northeastern. The third scene focuses on the type of school, including Engineering, Party, Liberal Arts, Ivy League, and State institutions. Circles in each scatter plot are colored according to the school type or region.

Two types of annotations are employed in the visualization, both using the d3-annotation.js library. In the first and third scenes, specific data points are highlighted to reveal less obvious findings. In the second scene, the annotationCalloutCircle type is used to draw attention to a specific area, demonstrating that Midwestern universities perform poorly in terms of salary increase compared to other regions.

The primary parameter of the narrative visualization is the user-directed navigation buttons that determine the current slide or HTML file displayed, reflecting the narrative's progress. Additionally, there is a parameter to adjust the focus of data points in the scatter plot. By moving their mouse over a specific point, users can highlight related data points. For example, hovering over a circle representing the "Midwestern" region causes all non-Midwestern circles to reduce in opacity, allowing for focused analysis of a particular data subset.

The primary triggers in the narrative visualization are the navigation controls. Three buttons—next, previous, and home—allow users to move between scenes or return to the starting point, providing a seamless and interactive exploration of the data.
