import { MagmaCanvas, Grid } from "magma-canvas";

function make_rule_2D(rule_number: number){
    let rule = rule_number.toString(2).padStart(32,"0");
    function apply_rule(c1:number,c2:number,c3:number,c4:number, c5:number){
        return parseInt(rule[31-(c1*16+c2*8+c3*4+c4*2+c5)],10);
    }
    return apply_rule;
}

export function cellular_automata_2D(){
    const canvasDim  = 1000;
    const mCanvas    = new MagmaCanvas("canvasContainer", canvasDim, canvasDim, true, false);
    const grid       = new Grid(canvasDim,canvasDim);
    mCanvas.add(grid);
    grid.zoomOut();
    grid.zoomOut();
    grid.zoomOut();
    grid.zoomOut();
    grid.zoomOut();
    grid.zoomOut();

  
    let handler : number = null;

    setInterval(()=>{
        let rule_no = Math.floor(Math.random()*2**32);
        let rule = make_rule_2D(rule_no);
        document.getElementById("ruleNo").innerHTML =rule_no.toString();
        //let simulation_matrix = random_boolean_mat(grid.n_rows, grid.n_cols);
        let simulation_matrix = new Array(grid.n_rows).fill([]).map(()=>new Array(grid.n_cols).fill(0));
        simulation_matrix[50][50] = 1;

        function idx(row:number, col:number){
            if(row < 0 || row >= grid.n_rows || col < 0 || col >= grid.n_cols){
                return 0;
            }else{
                return simulation_matrix[row][col];
            }
        }
        if(handler != null){
            clearInterval(handler);
        }
        handler = window.setInterval(()=>{
            grid.clear_cells();
            // 1.) Render simulation matrix. 
            for(let row = 0; row < grid.n_rows; row++){
                for(let col = 0; col < grid.n_cols; col++){
                    let color = "white"
                    if(simulation_matrix[row][col] == 1){
                        color = "black";
                    }
                    grid.cell_color({row,col},color); 
                }
            }
            // 2.) Generate next simulation state. 
            let next_state = [];
            for(let row = 0; row < grid.n_rows; row++){
                let state_row = [];
                for(let col = 0; col < grid.n_cols; col++){
                    state_row.push(rule(idx(row,col), idx(row,col+1), idx(row+1,col), idx(row,col-1), idx(row-1,col)));
                }
                next_state.push(state_row);
            }
            // 3.) Update simulation state. 
            simulation_matrix = next_state;
        },0);
    },2000);

}


function make_rule(rule_number: number){
    let rule = rule_number.toString(2).padStart(8,"0");
    function apply_rule(c1:number,c2:number,c3:number){
        return parseInt(rule[7-(c1*4+c2*2+c3)],10);
    }
    return apply_rule;
}
function random_boolean_mat(n_rows:number, n_cols:number){
    let mat = [];
    for(let row = 0; row < n_rows; row++){
        let new_row = [];
        for(let col = 0; col < n_cols; col++){
            new_row.push(Math.round(Math.random()))
        }
        mat.push(new_row);
    }
    return mat; 
}
function random_boolean_array(n:number){
    let ls = [];
    for(let i=0; i < n; i++){
        ls.push(Math.round(Math.random()))
    }
    return ls;
}
export function cellular_automata(){
    const canvasDim  = 800;
    const mCanvas    = new MagmaCanvas("canvasContainer", canvasDim, canvasDim, true);
    const grid       = new Grid(canvasDim,canvasDim);
    mCanvas.add(grid);
    grid.zoomOut();
    grid.zoomOut();
    grid.zoomOut();
    grid.zoomOut();
    grid.zoomOut();
    grid.zoomOut();

   
    let rule = make_rule(57);
    //let current_row = new Array(grid.n_cols).fill(0);
    let current_row = random_boolean_array(grid.n_cols);
    current_row[Math.floor(grid.n_cols/2)] = 1;

    function idx(i:number){
        if(i < 0 || i >= current_row.length){
            return 0;
        }else{
            return current_row[i];
        }
    }

    for(let row = 0; row < grid.n_rows; row++){
        current_row.forEach((cell_val:number,i)=>{
            let color = "white"
            if(cell_val == 1){
                color = "black";
            }
            grid.cell_color({row,col:i},color); 
        });
        let next_row = [];
        for(let col = 0; col < grid.n_cols; col++){
            next_row.push(rule(idx(col-1),idx(col),idx(col+1)));
        }

        current_row = next_row;
    }
}