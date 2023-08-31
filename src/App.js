import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SudokuPage from './pages/SudokuPage';
import WordSearchPage from './pages/WordSearchPage';
import DragAndDropPage from './pages/DragAndDropPage';
import MonthsPage from './pages/DragAndDropPuzzles/MonthsPage';
import EverydayObjectsPage from './pages/WordSearchPuzzles/EverydayObjectsPage';
import Foods from './pages/WordSearchPuzzles/Foods';
import ColorSudokuPage from './pages/SudokuPuzzles/ColorSudokuPage';
import DaysWeekPage from './pages/DragAndDropPuzzles/DaysWeekPage';
import WeatherSudoku9x9 from './pages/SudokuPuzzles/WeatherSudoku9X9';
import WeatherSudoku from './pages/SudokuPuzzles/WeatherSudoku';
import AnimalSudoku from './pages/SudokuPuzzles/AnimalSudoku';
import NumbersSudokuPage from './pages/SudokuPuzzles/KanjiSystem/Numbers';
import BeginnerKanjiPage1 from './pages/SudokuPuzzles/KanjiSystem/BeginnerKanji-1';
import PersonVocab1 from './pages/SudokuPuzzles/KanjiSystem/Person';
import PersonVocab2 from './pages/SudokuPuzzles/KanjiSystem/Person2';
import EntranceVocab1 from './pages/SudokuPuzzles/KanjiSystem/Entrance';
import BigVocab1 from './pages/SudokuPuzzles/KanjiSystem/Big';
import TreeVocab from './pages/SudokuPuzzles/KanjiSystem/Tree';
import DogVocab from './pages/SudokuPuzzles/KanjiSystem/Dog';
import BookVocab from './pages/SudokuPuzzles/KanjiSystem/Book';
import Fruits from './pages/WordSearchPuzzles/Fruits';
import Vegetables from './pages/WordSearchPuzzles/Vegetables';

function App() {

  const { user } = useAuthContext()

  const pages = [
    { path: '/', element: <HomePage /> },
    { path: '/login', element: !user ? <Login /> : <Navigate to={'/'} /> },
    { path: '/signup', element: !user ? <Signup /> : <Navigate to={'/'} /> },
    { path: '/sudoku-puzzles', element: <SudokuPage /> },
    { path: '/word-search-puzzles', element: <WordSearchPage /> },
    { path: '/drag-and-drop-puzzles', element: <DragAndDropPage /> },
    { path: '/drag-and-drop-puzzles/months', element: <MonthsPage /> },
    { path: '/word-search-puzzles/everyday-objects', element: <EverydayObjectsPage /> },
    { path: '/word-search-puzzles/foods', element: <Foods /> },
    { path: '/word-search-puzzles/fruits', element: <Fruits /> },
    { path: '/word-search-puzzles/vegetables', element: <Vegetables /> },
    { path: '/sudoku-puzzles/color-sudoku', element: <ColorSudokuPage /> },
    { path: '/drag-and-drop-puzzles/days-week', element: <DaysWeekPage /> },
    { path: '/sudoku-puzzles/weather-sudoku-9x9', element: <WeatherSudoku9x9 /> },
    { path: '/sudoku-puzzles/numbers-sudoku', element: <NumbersSudokuPage /> },
    { path: '/sudoku-puzzles/animal-sudoku', element: <AnimalSudoku /> },
    { path: '/sudoku-puzzles/weather-sudoku', element: <WeatherSudoku /> },
    { path: '/sudoku-puzzles/beginner-kanji-1', element: <BeginnerKanjiPage1 /> },
    { path: '/sudoku-puzzles/person-vocab-1', element: <PersonVocab1 /> },
    { path: '/sudoku-puzzles/person-vocab-2', element: <PersonVocab2 /> },
    { path: '/sudoku-puzzles/entrance-vocab-1', element: <EntranceVocab1 /> },
    { path: '/sudoku-puzzles/big-vocab-1', element: <BigVocab1 /> },
    { path: '/sudoku-puzzles/tree-vocab', element: <TreeVocab /> },
    { path: '/sudoku-puzzles/dog-vocab', element: <DogVocab /> },
    { path: '/sudoku-puzzles/book-vocab', element: <BookVocab /> },
  ];


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {pages.map((page, index) => (
            <Route key={index} path={page.path} element={page.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
