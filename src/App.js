import React, { Component } from 'react';
import 'bootswatch/dist/minty/bootstrap.min.css';
import './App.css';
import Cell from './components/Cell'
import Grids from './components/Grids.json'
import {aStar} from "./Algorithms/aStar"
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      grid: [],
      gridNumber: 1,
    }
  }


  componentDidMount(){
    const grid = this.getGrid(1);
    this.setState({grid: grid});
  }

  getGrid = (i) => {
    const grid = [];
    const Grid = Grids[i]
    for (let row = 0; row < Grid.length; row++) {
      const currentRow = [];
      for (let col = 0; col < Grid[row].length; col++) {
        var className = ""
        if(Grid[row][col] === 1){
          className = "Wall"
        }else if(col === 0 && row === 0){
          className = "Start"
        }else if(col === 100 && row === 100){
          className = "End"
        }
        currentRow.push(this.createNode(col, row, className));
      }
      grid.push(currentRow);
    }
    return grid;

  };

  visualizeAStar(mode) {
    const grid = this.state.grid
    let start = grid[0][0]
    let end = grid[100][100]

    if(mode === "b"){
      start = grid[100][100]
      end = grid[0][0]
    }
    const results = aStar(grid, start, end)
    if(results.shortest_path[0] === null){
      alert("No solution "+results.expandedNodes)
      return;
    }
    
    this.animateAStar(results.shortest_path)
    alert("Time taken: " + results.timeTaken + "ms\n Expanded Nodes: " + results.expandedNodes)
    
  }

  run50(mode) {
    let times = []
    let expandedNodes = []

    for(let i = 0; i < 50; i++){
      console.log(i)
      const grid = this.getGrid(i)
      let start = grid[0][0]
      let end = grid[100][100]

      if(mode === "b"){
        start = grid[100][100]
        end = grid[0][0]
      }
      const results = aStar(grid, start, end)
      times.push(results.timeTaken)
      expandedNodes.push(results.expandedNodes)
      this.clearBoard()
    }

    const avgTime = this.avgArr(times)
    const avgNodes = this.avgArr(expandedNodes)

    alert("Average time taken: " + avgTime + " Avg Nodes expanded: " + avgNodes)

  }

  avgArr(arr){
    return arr.reduce((a,b) => a + b, 0) / arr.length
  }

  animateAStar(visitedNodes){
    for(let i = 0; i < visitedNodes.length; i++){
      setTimeout(() => {
        const node = visitedNodes[i]
        document.getElementById(`cell-${node.row}-${node.col}`).className = "cell node-visited"
      }, 10)
    }
  }

  clearBoard(){
    for(let i = 0; i < 101; i++){
      for(let j = 0; j < 101; j++){
        let cell = document.getElementById(`cell-${i}-${j}`)
        if(cell.className.includes("node-visited")){
          cell.className = "cell"
        }
      }
    }
    let start = document.getElementById(`cell-0-0`)
    let end = document.getElementById(`cell-100-100`)
    if(!start.className.includes("Start")){
      start.className = "cell Start"
    }
    if(!end.className.includes("End")){
      end.className = "cell End"
    }

    this.setState({grid: []})
    const grid = this.getGrid(this.state.gridNumber)
    this.setState({grid: grid})
  }

  nextGrid(){
    this.clearBoard()
    let gridNumber = this.state.gridNumber
    const grid = this.getGrid(gridNumber+1)
    this.setState({
      grid: grid,
      gridNumber: gridNumber+1,
    })
  }



  createNode = (x, y, className) => {

    return {
      col: x,
      row: y,
      f: 0,
      g: 0,
      h: 0,
      hnew: 0,
      cost: 1,
      isVisited: false,
      previous: null,
      closed: false,
      className: className,
    }
  }
  
  render(){
    return (
      <div className='OuterWrapper'>
       <Nav className="navbar-dark bg-primary MainNav">
          <h2 className="navbar-brand">A* Visualizer</h2>
          <Button className='btn-secondary' onClick={() => this.visualizeAStar("f")}>Visualize A*</Button>
          <Button className='btn-secondary' onClick={() => this.visualizeAStar("b")}>Visualize Backwards A*</Button>
          <Button className='btn-secondary' onClick={() => this.run50("f")}>Run A* 50 times</Button>
          <Button className='btn-secondary' onClick={() => this.run50("b")}>Run Backwards A* 50 times</Button>
          <Button className='btn-secondary' onClick={() => this.nextGrid()}>Next GridWorld</Button>
        </Nav>
          <div className="grid">
            {this.state.grid.map((row, rowIdx) => {
              return(
                <div className="row" key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {row, col, className} = node;
                    return(
                      <Cell key={nodeIdx} col={col} row={row} className={className}></Cell>
                    )
                  })}
                </div>
              )
            })}
          </div>
      </div>
    ) 
  }
}

export default App;
