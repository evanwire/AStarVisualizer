export default class MinHeap {
    constructor () {
        this.heap = []
    }

    getMin(){
        return this.heap[0]
    }

    push(node){
        this.heap.push(node)
        this.bubbleUp(this.heap.length - 1)
    }

    size(){
        return this.heap.length
    }

    pop(){
        var smallest = this.heap[0]
        var last = this.heap.pop()
        if(this.heap.length > 0){
            this.heap[0] = last
            this.sinkDown(0)
        }
        return smallest
    }

    bubbleUp(position){
        var node = this.heap[position]
        var fscore = node.f
        var gscore = node.g

        while(position > 0){
            var parentIdx = Math.floor((position+1)/2)-1
            var parent = this.heap[parentIdx]

            if(fscore > parent.f){
                break
            } else if(fscore === parent.f){
                if(gscore < parent.g){
                    break
                }
            }

            this.heap[parentIdx] = node
            this.heap[position] = parent
            position = parentIdx
        }
    }

    sinkDown(position){
        var length = this.heap.length
        var node = this.heap[position]
        var nodefscore = node.f
        var nodegscore = node.g

        while(true){
            var child2N = (position+1) * 2
            var child1N = child2N - 1

            var swap = null

            if(child1N < length){
                var child1 = this.heap[child1N]
                var childfScore = child1.f
                var childgscore = child1.g
                if(childfScore < nodefscore){
                    swap = child1N
                }else if(childfScore === nodefscore){
                    if(childgscore < nodegscore){
                        swap = child1N
                    }
                }
            }
            if(child2N < length){
                var child2 = this.heap[child2N]
                var child2fscore = child2.f
                var child2gscore = child2.g

                if(child2fscore < (swap == null ? nodefscore : childfScore)){
                    swap = child2N
                }else if(child2fscore === (swap == null ? nodefscore : childfScore)){
                    if(child2gscore < (swap == null ? nodegscore : childgscore)){
                        swap = child2N
                    }
                }
            }

            if(swap == null){
                break
            }

            this.heap[position] = this.heap[swap]
            this.heap[swap] = node
            position = swap
        }
    }

    rescore(node){
        for(var i = 0; i < this.heap.length; i++){
            if(this.heap[i] !== node){
                continue;
            }

            this.bubbleUp(i)
        }
    }

}
