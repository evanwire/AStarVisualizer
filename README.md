This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, run 'npm start' to run the app in development mode. You can then go to your browsser and open http://localhost:3000 to view the application.

### Project Description

I used two separate maze generation algorithms to generate a JSON that holds 50 mazes. Then, in React JS, I build a web application that visualizes these mazes and gives the user the option of visualizing **Forward A Star** or **Backwards A Star**. Lastly, I implemented functionality to run either algorithm on all 50 mazes and report performance metrics.

### Algorithm Description

I implemented the repeated forward A* algorithm and the repeated backwards A* algorithm. These algorithms tend to outperform djikstra's because the A* algorithms consider a heuristic in addition to the cost_to_come. A* takes actions that result in the smallest f(n), where: 

   **f(n) = g(n) + h(n)**. 
   
- h(n) is the heuristic, which means the estimated cost from node n to the goal. In my algorithm, I used manhattan distance to calculate my heuristics. The manhattan distance is admissible because I did not allow the algorithms to move diagonally.

- g(n) is the cost_to_come, which is the distance traveled from the start to node n.

### Analysis of my memory consumption

I could have done a better job making my algorithm more memory efficient. Some ways to save on memory efficiency would be compressing unused data. For instance, the stack of openNodes that have yet to be expanded could be compressed to save on memory cost, and only the one that is currently being expanded be uncompressed. Additionally, for each node being uncompressed, I create an array of its neighboring nodes, which includes even walls. This could be more efficient if I were to either create an array that checks for walls and doesn’t bother including them in the array, or if I were to calculate the neighbors directly without storing them in an array. If I were to do this, then I would only need to calculate one node at a time and just store the information of the neighbor with the smallest combined heuristic. Additionally, each cell in my implementation requires many fields that are relatively unnecessary, such as className that holds a css class value, and an f value, that could just be calculated by adding the node’s h and g values together. Slimming down on the amount of data types required to represent a node in my implementation would reduce the memory required dramatically.

Each cell in my implementation requires 6 integers, two booleans, a string, and a pointer to another node. I am unsure of how much memory these data structures require in javascript, and I honestly could not find any resources online that made much sense to me. However, I will use C standards for these values. In C, each integer requires 4 bytes, each boolean requires one byte, each pointer requires 8 bytes, and each string requires a series of byte size characters. The start node requires a string of length 5, the goal node requires a string of length 3, and all walls require a string of length 4. Open nodes require no string.

Assuming my grids are generated using a randomness approach, where 30% of the cells are walls, we can assume that 30% of the cells will require a string of length 4, one will require a string of length 5, and one will require a string of length 3. For a gridworld of size 1001 by 1001, that means a total of 1,002,001 cells. 30% of this is about 300,600. So, in order to accompany a grid of size 1001x1001, we would need:

>Bytes required by each cell: 
>
>1,002,001 * [(6 * 4) + (2 * 1) + (1 * 8)] = 34,068,034
>
>Bytes required by cells with a string:
>
>(300,600 * 4) + 5 + 3 = 1,202,408
>
>34,068,034 + 1,202,408 = 35,270,442 bytes, or 35.270442 MB

This could be dramatically reduced if I did not store some of the design-related stuff in each cell, such as the strings, but it was the only way I could think of to get it working in javascript and have a web application working that shows these A* algorithms in action.

Knowing that 70% of the cells in the grid require (6 * 4) + (2 * 1) + (1 * 8) = 34 bytes and 30% of the cells in the grid require 34 + 4 = 38 bytes, and that the start and end nodes will require 39 and 37 bytes respectively, we can use these values to calculate the maximum size of a grid that my implementation can run on if 4MB are available. The equation is shown below

>39 + 37 + (0.3x * 38) + (0.7x * 34)= 400,000
>x = number of nodes in the grid, 400,000 is 4MB converted to bytes

When solved, we find that x is about equal to 11361. The square root of 11361 is 106.6, so the maximum grid size that my implementation can handle with 4MB available is 106x106.

### Changes I plan on making in the future

I plan on implementing Djikstra's algorithm, as well as adaptive forward A*. Additionally, I would like to add simpler search algorithms like BFS and DFS simply to compare their efficiency with more intelligent search algorithms. The biggest thing I need to take care of is revamping the UX, because right now the 4 buttons lining the top of the window are not ideal. I also plan to allow for users to add their own walls to the maze and erase walls, so they can see how the algorithms run in a gridworld of their design. Ideally, I would like to expand this web app to be an educational site, explaining the most common search and sorting algorithms in depth with visualizations of each one available for the user.
