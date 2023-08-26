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
import MonthsPage from './pages/MonthsPage';
import EverydayObjectsPage from './pages/EverydayObjectsPage';
import ColorSudokuPage from './pages/SudokuPuzzles/ColorSudokuPage';
import DaysWeekPage from './pages/DaysWeekPage';
import WeatherSudoku9x9 from './pages/SudokuPuzzles/WeatherSudoku9X9';
import WeatherSudoku from './pages/SudokuPuzzles/WeatherSudoku';
import AnimalSudoku from './pages/SudokuPuzzles/AnimalSudoku';

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
            path='/sudoku-puzzles/animal-sudoku'
            element={<AnimalSudoku />}
          />
          <Route 
            path='/sudoku-puzzles/weather-sudoku'
            element={<WeatherSudoku />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
