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

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path='/'
            element={<HomePage />}
          />
          <Route 
            path='/login'
            element={!user ? <Login /> : <Navigate to={'/'} />}
          />
          <Route 
            path='/signup'
            element={!user ? <Signup /> : <Navigate to={'/'} />}
          />
          <Route 
            path='/sudoku-puzzles'
            element={<SudokuPage />}
          />
          <Route 
            path='/word-search-puzzles'
            element={<WordSearchPage />}
          />
          <Route 
            path='/drag-and-drop-puzzles'
            element={<DragAndDropPage />}
          />
          <Route 
            path='/drag-and-drop-puzzles/months'
            element={<MonthsPage />}
          />
          <Route 
            path='/word-search-puzzles/everyday-objects'
            element={<EverydayObjectsPage />}
          />
          <Route 
            path='/word-search-puzzles/foods'
            element={<Foods />}
          />
          <Route 
            path='/word-search-puzzles/fruits'
            element={<Fruits />}
          />
          <Route 
            path='/word-search-puzzles/vegetables'
            element={<Vegetables />}
          />
          <Route 
            path='/sudoku-puzzles/color-sudoku'
            element={<ColorSudokuPage />}
          />
          <Route 
            path='/drag-and-drop-puzzles/days-week'
            element={<DaysWeekPage />}
          />
          <Route 
            path='/sudoku-puzzles/weather-sudoku-9x9'
            element={<WeatherSudoku9x9 />}
          />
          <Route 
            path='/sudoku-puzzles/numbers-sudoku'
            element={<NumbersSudokuPage />}
          />
          <Route 
            path='/sudoku-puzzles/animal-sudoku'
            element={<AnimalSudoku />}
          />
          <Route 
            path='/sudoku-puzzles/weather-sudoku'
            element={<WeatherSudoku />}
          />
          <Route 
            path='/sudoku-puzzles/beginner-kanji-1'
            element={<BeginnerKanjiPage1 />}
          />
          <Route 
            path='/sudoku-puzzles/person-vocab-1'
            element={<PersonVocab1 />}
          />
          <Route 
            path='/sudoku-puzzles/person-vocab-2'
            element={<PersonVocab2 />}
          />
          <Route 
            path='/sudoku-puzzles/entrance-vocab-1'
            element={<EntranceVocab1 />}
          />
          <Route 
            path='/sudoku-puzzles/big-vocab-1'
            element={<BigVocab1 />}
          />
          <Route 
            path='/sudoku-puzzles/tree-vocab'
            element={<TreeVocab />}
          />
          <Route 
            path='/sudoku-puzzles/dog-vocab'
            element={<DogVocab />}
          />
          <Route 
            path='/sudoku-puzzles/book-vocab'
            element={<BookVocab />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
