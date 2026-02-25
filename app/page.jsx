"use client";
import { useState, useEffect } from "react";
import { GlobalStyles } from "./components/GlobalStyles";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TasksGrid } from "./components/TasksGrid";
import { Footer } from "./components/Footer";
import { Task1Page } from "./components/Task1Page";

export default function App() {
  const [page, setPage] = useState('home');
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ege26_v5')||'null') || {total:0,correct:0,streak:0,best:0}; }
    catch { return {total:0,correct:0,streak:0,best:0}; }
  });
  useEffect(() => {
    try { localStorage.setItem('ege26_v5', JSON.stringify(progress)); } catch {}
  }, [progress]);

  const go1 = () => { setPage('task1'); window.scrollTo(0,0); };

  return (
    <>
      <GlobalStyles/>
      <Navbar page={page} setPage={setPage} sub={null} onBack={() => {}}/>
      {page==='home' && (
        <>
          <Hero onScroll={() => document.getElementById('tasks')?.scrollIntoView({behavior:'smooth'})}/>
          <TasksGrid onSelect={n => n===1 && go1()}/>
          <Footer/>
        </>
      )}
      {page==='task1' && (
        <>
          <Task1Page progress={progress} setProgress={setProgress}/>
          <Footer/>
        </>
      )}
    </>
  );
}
