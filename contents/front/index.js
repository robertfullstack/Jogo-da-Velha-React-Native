import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const initialBoard = Array(9).fill('');

export default function App() {
    const [board, setBoard] = useState(initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);

    const handleCellPress = (index) => {
        if (winner || board[index] !== '') return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        const newWinner = checkWinner(newBoard, currentPlayer);
        if (newWinner) {
            setWinner(newWinner);
        } else if (checkDraw(newBoard)) {
            setIsDraw(true);
        } else {
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
    };

    const handleResetGame = () => {
        setBoard(initialBoard);
        setCurrentPlayer('X');
        setWinner(null);
        setIsDraw(false);
    };

    const checkWinner = (board, player) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] === player && board[b] === player && board[c] === player) {
                return player;
            }
        }

        return null;
    };

    const checkDraw = (board) => {
        return board.every((cell) => cell !== '');
    };

    const getCellTextStyle = (cell) => {
        if (cell === 'X') {
            return { color: 'red', textShadow: '2px 2px 5px red' };
        } else if (cell === 'O') {
            return { color: 'green', textShadow: '2px 2px 5px green' };
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textH1}>Jogo da Velha</Text>

            <View style={styles.board}>
                {board.map((cell, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.cell}
                        onPress={() => handleCellPress(index)}
                    >
                        <Text style={[styles.cellText, getCellTextStyle(cell)]}>{cell}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {winner && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>{`${winner} venceu!`}</Text>
                    <TouchableOpacity style={styles.resetButton} onPress={handleResetGame}>
                        <Text style={styles.resetButtonText}>Jogar Novamente</Text>
                    </TouchableOpacity>
                </View>
            )}

            {isDraw && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>Empate!</Text>
                    <TouchableOpacity style={styles.resetButton} onPress={handleResetGame}>
                        <Text style={styles.resetButtonText}>Jogar Novamente</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textH1: {
        fontWeight: '800',
        textTransform: 'uppercase',
        fontSize: 30,
        color: 'white',
    },

    board: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: 300,
        width: '100%',
        margin: 10,
    },


    cell: {
        width: '33.33%',
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },

    cellText: {
        fontSize: 48,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },

    resultContainer: {
        alignItems: 'center',
        marginTop: 20,
    },

    resultText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },

    resetButton: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },

    resetButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
});
