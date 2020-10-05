import React, {useState,useEffect} from 'react';
import Modal from '@material-ui/core/Modal';

function Board() {
    const [board, setBoard] = useState([[]]); 
    const [winner, setWinner] = useState();
    const [player , setPlayer] = useState(1);
    const [counter , setCounter] = useState(0);
    
    function emptyBoard(){
        const gameBoard = [];
        for(let i = 0; i < 7; i++){
            gameBoard[i] = [] ;
            for(let j = 0 ; j < 6 ; j++){
                gameBoard[i][j] = null ;
            }
        };
        setBoard(gameBoard);
        setWinner(false);
    }
    
    useEffect(() => {
        emptyBoard();
    }, [])
    
    function updateBoard(columnIndex) {
        let changed = false ;
        let tempBoard = board.map((col,i) => {
            if(i === columnIndex) {
                return col.map((sq,j) => {
                    if(sq === null && !changed){
                        changed = true ;
                        return `player${player}`;
                    }
                    else return sq ;
                })
            }
            return col ;
        });
        if(changed) {
            setBoard(tempBoard);
            if(isWinner(tempBoard))
                setWinner(player) ;
            else {
                if(counter === 41) 
                    setWinner('tie');
                setPlayer(3-Number(player));
                setCounter(counter+1);
            }
        }
    }

    function isWinner(tempBoard) {
        const checkColWin = (i,j) => {
            return (
                tempBoard[i][j] !== null && 
                tempBoard[i][j] === tempBoard[i][j+1] && 
                tempBoard[i][j] === tempBoard[i][j+2] && 
                tempBoard[i][j] === tempBoard[i][j+3]
            )}
        const checkLineWin = (i,j) => {
            return (
                tempBoard[i][j] !== null && 
                tempBoard[i][j] === tempBoard[i+1][j] && 
                tempBoard[i][j] === tempBoard[i+2][j] && 
                tempBoard[i][j] === tempBoard[i+3][j]
            )}
        const checkRightCrossWin = (i,j) => {
            return (
                tempBoard[i][j] !== null && 
                tempBoard[i][j] === tempBoard[i+1][j+1] && 
                tempBoard[i][j] === tempBoard[i+2][j+2] && 
                tempBoard[i][j] === tempBoard[i+3][j+3]
            )}
        const checkLeftCrossWin = (i,j) => {
            return (
                tempBoard[i][j] !== null && 
                tempBoard[i][j] === tempBoard[i-1][j+1] && 
                tempBoard[i][j] === tempBoard[i-2][j+2] && 
                tempBoard[i][j] === tempBoard[i-3][j+3]
            )}
        for(let i=0 ; i < 7 ; i++) {
            for(let j=0 ; j < 6 ; j++) {
                if(i<=3) if(checkLineWin(i,j)) return true ; 
                if(j<=2) if(checkColWin(i,j)) return true ;
                if(i<=3 && j<=2) if(checkRightCrossWin(i,j)) return true ;
                if(i>=3 && j<=2) if(checkLeftCrossWin(i,j)) return true ;
            }
        }
        return false ;
    }
  return (
      <>
    <div className="Board">
        {
            board.map((column, i) => {
                return <>
                    {i===0 && <div className="divider" />} {/* the red column separating each column */}
                    <div className="Column" id={`column${i}`} onClick={()=>{updateBoard(i)}}>
                        <span>{i}</span> {/* should remove once you understand the concept */}
                        {
                        /* 
                            here you should have your squares implemented, each with a className 'Square' and an id of - square0 -> square1 -> square2
                        */
                        }
                        {
                            column.map((square, j) => {
                                return (
                                    <div className="Square" id={`square${j}`}>
                                        <div className={square}></div>
                                    </div>);
                            })
                        }
                    </div>
                    <div className="divider" /> {/* the red column separating each column */}
                </>
            })
        }
    </div>

            <Modal open={winner? true : false} onClose={()=> {emptyBoard();}}>
                <div className ='winModal'>
                    <h2>Game Finished !</h2>
                    <h2>{winner ==='tie'? 'A Tie !':`Winner is: player ${winner}`}</h2>
                </div>
            </Modal>
        </>

  );
}


export default Board;
