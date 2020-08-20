import MinHeap from "./DataStructures/MinHeap"

export function aStar(grid, start, finish){

    var openHeap = new MinHeap()
    openHeap.push(start)
    let res={
        shortest_path: [null],
        expandedNodes: 0,
        timeTaken: 0,
    }
    
    var t0 = performance.now()
    let expandedNodes = 0
    while(openHeap.size() > 0){
        let currentNode = openHeap.pop()
        if(currentNode === finish){
            var curr = currentNode
            var result = []
            while(curr.parent){
                result.push(curr)
                curr = curr.parent
            }
            res.shortest_path = result.reverse()
        }
        
        
        
        currentNode.closed = true
        expandedNodes++

        let neighbors = getNeighbors(grid, currentNode)
        
        

        for(let i = 0; i < neighbors.length; i++){
            var neighbor = neighbors[i]
            if(neighbor.closed || neighbor.className === "Wall"){
                continue;
            }
            
            
            var gValue = currentNode.g + neighbor.cost
            var visited = neighbor.visited
            if(!visited || gValue < neighbor.g){
                
                neighbor.visited = true
                neighbor.parent = currentNode
                neighbor.h = manhattanDistance(neighbor, finish)
                neighbor.g = gValue
                neighbor.f = neighbor.g + neighbor.h
                
                if(!visited){
                    openHeap.push(neighbor)
                    
                } else{
                    openHeap.rescore(neighbor)
                    

                }
            }
        }
    }
    var t1 = performance.now()
    res.timeTaken = t1 - t0
    res.expandedNodes = expandedNodes
    console.log(expandedNodes)
    return res
   
}
export function adaptive(grid, start, finish){

    var openHeap = new MinHeap()
    openHeap.push(start)
    let res={
        shortest_path: [null],
        expandedNodes: 0,
        timeTaken: 0,
    }
    
    var t0 = performance.now()
    let expandedNodes = 0
    while(openHeap.size() > 0){
        let currentNode = openHeap.pop()
        if(currentNode === finish){
            var curr = currentNode
            var result = []
            while(curr.parent){
                result.push(curr)
                curr = curr.parent
            }
            res.shortest_path = result.reverse()
        }
        
        
        
        currentNode.closed = true
        expandedNodes++

        let neighbors = getNeighbors(grid, currentNode)
        
        

        for(let i = 0; i < neighbors.length; i++){
            var neighbor = neighbors[i]
            if(neighbor.closed || neighbor.className === "Wall"){
                continue;
            }
            
            
            var gValue = currentNode.g + neighbor.cost
            var visited = neighbor.visited
            if(!visited || gValue < neighbor.g){
                
                neighbor.visited = true
                neighbor.parent = currentNode
                neighbor.h = manhattanDistance(neighbor, finish)
                neighbor.g = gValue
                neighbor.f = neighbor.g + neighbor.h
                
                if(!visited){
                    openHeap.push(neighbor)
                    
                } else{
                    openHeap.rescore(neighbor)
                    

                }
            }
        }
    }
    var t1 = performance.now()
    res.timeTaken = t1 - t0
    res.expandedNodes = expandedNodes
    console.log(expandedNodes)
    return res
   
}



function manhattanDistance(node, finish){
    return(Math.abs(node.col - finish.col) + Math.abs(node.row - finish.row))
} 

function getNeighbors(grid, node){
    var result = []
    var x = node.row
    var y = node.col
    
    if(grid[x-1] && grid[x-1][y]){
        result.push(grid[x-1][y])
    }
    if(grid[x+1] && grid[x+1][y]){
        result.push(grid[x+1][y])
    }
    if(grid[x] && grid[x][y-1]){
        result.push(grid[x][y-1])
    }
    if(grid[x] && grid[x][y+1]){
        result.push(grid[x][y+1])
    }
    return result
}



