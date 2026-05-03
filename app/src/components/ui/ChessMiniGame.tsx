import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const KingIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className={className}>
    <path d="M224 0c-17.7 0-32 14.3-32 32V64H160c-17.7 0-32 14.3-32 32s14.3 32 32 32h32v32H160c-35.3 0-64 28.7-64 64v64H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32V352c0-35.3-28.7-64-64-64H352V224c0-35.3-28.7-64-64-64H256V128h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V32c0-17.7-14.3-32-32-32zM48 448H400c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
  </svg>
);

const QueenIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className={className}>
    <path d="M12.9 144.1C18.2 113.6 46.9 92.7 77.4 98c21.2 3.7 38.3 19.3 43.6 40.1l11.4 44.9L191.1 57.2c5-17 22.6-26.7 39.6-21.7s26.7 22.6 21.7 39.6l-58.7 199.1L252.4 183l11.4-44.9c5.3-20.8 22.4-36.4 43.6-40.1 30.5-5.3 59.2 15.6 64.5 46.1c4.5 26.2-11.4 51.6-37.1 60.3l-24.4 8.3L371.1 320H76.9l60.7-107.4-24.4-8.3c-25.7-8.7-41.6-34.1-37.1-60.3zM48 352H400c17.7 0 32 14.3 32 32v16c0 8.8-7.2 16-16 16H32c-8.8 0-16-7.2-16-16V384c0-17.7 14.3-32 32-32zm0 96H400c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
  </svg>
);

const BishopIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor" className={className}>
    <path d="M160 224c35.3 0 64-28.7 64-64c0-11.4-3-22.1-8.3-31.4l5.4-8.1C246.3 82.5 256 43.3 256 0c0 0-41.8 11.2-67.6 30.5C180.2 28.5 170.3 27.6 160 27.6s-20.2 .9-28.4 2.9C105.8 11.2 64 0 64 0c0 43.3 9.7 82.5 34.8 120.5l5.4 8.1c-5.3 9.3-8.3 20-8.3 31.4c0 35.3 28.7 64 64 64zm-56 32c-15.6 0-30.2 5.1-42 13.8L12.4 340.5C4.2 346.6 0 355.6 0 365.1V416H320V365.1c0-9.5-4.2-18.5-12.4-24.6L258 269.8c-11.8-8.7-26.4-13.8-42-13.8H160 104zM32 448H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
  </svg>
);

const RookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" className={className}>
    <path d="M16 64C16 28.7 44.7 0 80 0H304c35.3 0 64 28.7 64 64V176c0 14.1-3.6 27.4-10.1 39.1L320 280v64H64V280L26.1 215.1C19.6 203.4 16 190.1 16 176V64zM64 416H320v32H64V416zm-32 64H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32zM272 64H224V112c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V64H112v48c0 8.8-7.2 16-16 16H64V64H48v96H336V64H320v48c0 8.8-7.2 16-16 16H272V64z"/>
  </svg>
);

const PawnIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor" className={className}>
    <path d="M215.5 224c29.2-18.4 48.5-50.9 48.5-88c0-57.4-46.6-104-104-104S56 78.6 56 136c0 37.1 19.3 69.6 48.5 88H96c-17.7 0-32 14.3-32 32c0 16.5 12.5 30 28.5 31.8L121 416H199l28.5-128.2c16-1.8 28.5-15.3 28.5-31.8c0-17.7-14.3-32-32-32h-8.5zM32 448H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
  </svg>
);

const KnightHorseIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" className={className}>
    <path d="M19 272.47l40.63 18.06a32 32 0 0 0 24.88.47l12.78-5.12a32 32 0 0 0 18.76-20.5l9.22-30.65a24 24 0 0 1 12.55-15.65L159.94 208v50.33a48 48 0 0 1-26.53 42.94l-57.22 28.65A80 80 0 0 0 32 401.48V416h319.86V224c0-106-85.92-192-191.92-192H12A12 12 0 0 0 0 44a16.9 16.9 0 0 0 1.79 7.58L16 80l-9 9a24 24 0 0 0-7 17v137.21a32 32 0 0 0 19 29.26zM52 128a20 20 0 1 1-20 20 20 20 0 0 1 20-20zm316 320H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h352a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"/>
  </svg>
);

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

type PieceType = 'king' | 'queen' | 'bishop' | 'knight' | 'rook' | 'pawn';
type Color = 'white' | 'black';
type Piece = { id: string; type: PieceType; color: Color; x: number; y: number };

const generateInitialBoard = (): Piece[] => {
  const pieces: Piece[] = [];
  const addRow = (y: number, color: Color) => {
    pieces.push({ id: `rook-0-${color}`, type: 'rook', color, x: 0, y });
    pieces.push({ id: `knight-1-${color}`, type: 'knight', color, x: 1, y });
    pieces.push({ id: `bishop-2-${color}`, type: 'bishop', color, x: 2, y });
    pieces.push({ id: `queen-3-${color}`, type: 'queen', color, x: 3, y });
    pieces.push({ id: `king-4-${color}`, type: 'king', color, x: 4, y });
    pieces.push({ id: `bishop-5-${color}`, type: 'bishop', color, x: 5, y });
    pieces.push({ id: `knight-6-${color}`, type: 'knight', color, x: 6, y });
    pieces.push({ id: `rook-7-${color}`, type: 'rook', color, x: 7, y });
  };
  addRow(0, 'black');
  for (let x = 0; x < 8; x++) pieces.push({ id: `pawn-${x}-black`, type: 'pawn', color: 'black', x, y: 1 });
  for (let x = 0; x < 8; x++) pieces.push({ id: `pawn-${x}-white`, type: 'pawn', color: 'white', x, y: 6 });
  addRow(7, 'white');
  return pieces;
};

const movePiece = (pieces: Piece[], id: string, newX: number, newY: number, captureTargetId?: string): Piece[] => {
  return pieces.filter(p => p.id !== captureTargetId).map(p => p.id === id ? { ...p, x: newX, y: newY } : p);
};

const getValidMoves = (board: Piece[], piece: Piece): {x: number, y: number}[] => {
  const moves: {x: number, y: number}[] = [];
  
  const isOccupiedByAlly = (x: number, y: number) => board.some(p => p.x === x && p.y === y && p.color === piece.color);
  const isOccupiedByEnemy = (x: number, y: number) => board.some(p => p.x === x && p.y === y && p.color !== piece.color);
  const isOccupied = (x: number, y: number) => board.some(p => p.x === x && p.y === y);
  
  const addMove = (x: number, y: number) => {
    if (x >= 0 && x < 8 && y >= 0 && y < 8 && !isOccupiedByAlly(x, y)) {
      moves.push({x, y});
      return !isOccupiedByEnemy(x, y); // return true if we can continue (square was empty)
    }
    return false;
  };

  const addLine = (dx: number, dy: number) => {
    for (let i = 1; i < 8; i++) {
      if (!addMove(piece.x + dx * i, piece.y + dy * i)) break;
    }
  };

  if (piece.type === 'pawn') {
    const dir = piece.color === 'white' ? -1 : 1;
    const startRow = piece.color === 'white' ? 6 : 1;
    
    // Forward 1
    if (!isOccupied(piece.x, piece.y + dir)) {
      moves.push({x: piece.x, y: piece.y + dir});
      // Forward 2
      if (piece.y === startRow && !isOccupied(piece.x, piece.y + 2 * dir)) {
        moves.push({x: piece.x, y: piece.y + 2 * dir});
      }
    }
    // Captures
    if (isOccupiedByEnemy(piece.x - 1, piece.y + dir)) moves.push({x: piece.x - 1, y: piece.y + dir});
    if (isOccupiedByEnemy(piece.x + 1, piece.y + dir)) moves.push({x: piece.x + 1, y: piece.y + dir});
  } else if (piece.type === 'knight') {
    const jumps = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
    jumps.forEach(([dx, dy]) => addMove(piece.x + dx, piece.y + dy));
  } else if (piece.type === 'bishop') {
    addLine(-1, -1); addLine(-1, 1); addLine(1, -1); addLine(1, 1);
  } else if (piece.type === 'rook') {
    addLine(0, -1); addLine(0, 1); addLine(-1, 0); addLine(1, 0);
  } else if (piece.type === 'queen') {
    addLine(-1, -1); addLine(-1, 1); addLine(1, -1); addLine(1, 1);
    addLine(0, -1); addLine(0, 1); addLine(-1, 0); addLine(1, 0);
  } else if (piece.type === 'king') {
    const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    dirs.forEach(([dx, dy]) => addMove(piece.x + dx, piece.y + dy));
  }

  return moves;
};

const makeRandomAIMove = (currentBoard: Piece[]): Piece[] => {
  const blackPieces = currentBoard.filter(p => p.color === 'black');
  const piecesWithMoves = blackPieces.map(p => ({
    piece: p,
    moves: getValidMoves(currentBoard, p)
  })).filter(pm => pm.moves.length > 0);

  if (piecesWithMoves.length > 0) {
    const randomPieceObj = piecesWithMoves[Math.floor(Math.random() * piecesWithMoves.length)];
    const randomMove = randomPieceObj.moves[Math.floor(Math.random() * randomPieceObj.moves.length)];
    const captureTarget = currentBoard.find(p => p.x === randomMove.x && p.y === randomMove.y);
    return movePiece(currentBoard, randomPieceObj.piece.id, randomMove.x, randomMove.y, captureTarget?.id);
  }
  return currentBoard;
};

const PieceIcon = ({ type, className }: { type: PieceType; className?: string }) => {
  switch (type) {
    case 'king': return <KingIcon className={className} />;
    case 'queen': return <QueenIcon className={className} />;
    case 'bishop': return <BishopIcon className={className} />;
    case 'knight': return <KnightHorseIcon className={className} />;
    case 'rook': return <RookIcon className={className} />;
    case 'pawn': return <PawnIcon className={className} />;
  }
};

export function ChessMiniGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [board, setBoard] = useState<Piece[]>(generateInitialBoard());
  const [turn, setTurn] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);

  const handleSquareClick = (col: number, row: number) => {
    if (gameOver || isAiThinking) return;

    const clickedPiece = board.find(p => p.x === col && p.y === row);

    // If user clicks one of their own pieces, select it
    if (clickedPiece && clickedPiece.color === 'white') {
      setSelectedPieceId(clickedPiece.id);
      return;
    }

    // If a piece is selected and user clicks an empty square or enemy piece
    if (selectedPieceId) {
      const selectedPiece = board.find(p => p.id === selectedPieceId);
      const validMoves = selectedPiece ? getValidMoves(board, selectedPiece) : [];
      const isValidMove = validMoves.some(m => m.x === col && m.y === row);
      
      if (!isValidMove) {
        // Deselect if clicking an invalid square
        setSelectedPieceId(null);
        return;
      }

      setIsAiThinking(true);
      // Move the user's selected piece
      setBoard(prev => movePiece(prev, selectedPieceId, col, row, clickedPiece?.id));
      setSelectedPieceId(null);

      // AI Responds
      if (turn === 0) {
        // Turn 1: AI responds with a random move
        setTimeout(() => {
          setBoard(prev => makeRandomAIMove(prev));
          setTurn(1);
          setIsAiThinking(false);
        }, 800);
      } else if (turn === 1) {
        // Turn 2: AI responds with another random move
        setTimeout(() => {
          setBoard(prev => makeRandomAIMove(prev));
          setTurn(2);
          setIsAiThinking(false);
        }, 800);
      } else if (turn === 2) {
        // Turn 3: AI cheats and dynamically swarms the King!
        setTimeout(() => {
          setBoard(prev => {
            const whiteKing = prev.find(p => p.type === 'king' && p.color === 'white');
            const kx = whiteKing ? whiteKing.x : 4;
            const ky = whiteKing ? whiteKing.y : 7;
            
            const blackPieces = prev.filter(p => p.color === 'black');
            const swarmTargets = [
              { dx: 0, dy: -1 },
              { dx: -1, dy: 0 },
              { dx: 1, dy: 0 },
              { dx: -1, dy: -1 },
              { dx: 1, dy: -1 },
              { dx: 0, dy: -2 },
            ];
            
            const cheatMoves = swarmTargets.map((target, index) => {
              const piece = blackPieces[index];
              if (!piece) return null;
              return { id: piece.id, x: kx + target.dx, y: ky + target.dy };
            }).filter(Boolean) as { id: string, x: number, y: number }[];
            
            const newBoard = prev.map(p => {
              const cheatMove = cheatMoves.find(m => m.id === p.id);
              if (cheatMove) return { ...p, x: cheatMove.x, y: cheatMove.y };
              return p;
            });
            
            // Remove any white pieces that were crushed by the dynamic swarming
            return newBoard.filter(p => 
              p.color === 'black' || 
              !cheatMoves.some(m => m.x === p.x && m.y === p.y)
            );
          });
          
          setTurn(3);
          setIsAiThinking(false);
          setTimeout(() => setGameOver(true), 1200);
        }, 800);
      }
    }
  };

  const resetGame = () => {
    setBoard(generateInitialBoard());
    setTurn(0);
    setGameOver(false);
    setIsAiThinking(false);
    setSelectedPieceId(null);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div
        className="fixed bottom-6 left-6 z-[100] flex items-center gap-1"
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      >
        {/* Button */}
        <button
          onClick={() => {
            setIsOpen(true);
            setIsButtonHovered(false);
          }}
          className="relative z-10 w-9 h-9 md:w-14 md:h-14 bg-black dark:bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-300 border border-white/10 dark:border-black/10 group overflow-hidden flex-shrink-0"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-third/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <KnightHorseIcon className="w-4 h-4 md:w-6 md:h-6 text-white dark:text-black relative z-10" />
        </button>

        {/* Tooltip - slides out to the right on hover */}
        <AnimatePresence>
          {isButtonHovered && !isOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="h-9 md:h-14 flex items-center bg-black/80 dark:bg-white/10 backdrop-blur-md text-white px-3 md:px-4 rounded-r-full text-[10px] md:text-xs font-medium shadow-xl border border-white/10 border-l-0 whitespace-nowrap">
                I bet you can't win a chess with me.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Game Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[20000] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-[4px] overflow-hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Play vs AI</h3>
                    <p className="text-sm text-brand-third dark:text-brand-primary font-medium">
                      {isAiThinking ? "AI is plotting..." : (selectedPieceId ? "Now click an empty square to move" : "Your turn: Click a White piece to select")}
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative aspect-square w-full rounded-[4px] overflow-hidden border border-white/10 select-none">
                  {/* Grid */}
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                    {Array.from({ length: 64 }).map((_, i) => {
                      const row = Math.floor(i / 8);
                      const col = i % 8;
                      const isDark = (row + col) % 2 === 1;
                      
                      const selectedPiece = selectedPieceId ? board.find(p => p.id === selectedPieceId) : null;
                      const validMoves = selectedPiece ? getValidMoves(board, selectedPiece) : [];
                      const isValidMove = validMoves.some(m => m.x === col && m.y === row);
                      const pieceAtSquare = board.find(p => p.x === col && p.y === row);

                      return (
                        <div 
                          key={i} 
                          onClick={() => handleSquareClick(col, row)}
                          className={cn(
                            "w-full h-full cursor-pointer transition-colors relative flex items-center justify-center",
                            isDark ? "bg-white/10" : "bg-transparent",
                            !isAiThinking && !gameOver ? "hover:bg-white/20" : ""
                          )}
                        >
                          {isValidMove && (
                            pieceAtSquare ? (
                              <div className="w-[85%] h-[85%] rounded-full border-[4px] border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.4)] absolute" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.4)] absolute" />
                            )
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Pieces */}
                  <div className="absolute inset-0 pointer-events-none">
                    {board.map(piece => (
                      <motion.div
                        key={piece.id}
                        initial={false}
                        animate={{
                          x: `${piece.x * 100}%`,
                          y: `${piece.y * 100}%`,
                          scale: selectedPieceId === piece.id ? 1.15 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className={cn(
                          "absolute w-[12.5%] h-[12.5%] flex items-center justify-center pointer-events-none",
                          piece.color === 'white' ? "text-brand-primary" : "text-brand-third",
                          selectedPieceId === piece.id ? (piece.color === 'white' ? "drop-shadow-[0_0_15px_rgba(15,123,255,1)] z-10" : "drop-shadow-[0_0_15px_rgba(255,147,15,1)] z-10") : "z-0"
                        )}
                      >
                        <PieceIcon type={piece.type} className="w-3/5 h-3/5 drop-shadow-md" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Game Over Modal */}
              <AnimatePresence>
                {gameOver && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
                  >
                    <motion.div 
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      className="bg-[#1A1A1A] border border-brand-third/30 p-8 rounded-[4px] text-center max-w-sm w-full shadow-[0_0_50px_rgba(255,147,15,0.1)]"
                    >
                      <KnightHorseIcon className="w-12 h-12 text-brand-third mx-auto mb-4" />
                      <h4 className="text-2xl font-bold text-white mb-2">Checkmate.</h4>
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        You lost because it's my game. Better luck next time.
                      </p>
                      <button
                        onClick={resetGame}
                        className="w-full py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
                      >
                        Accept Defeat
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
