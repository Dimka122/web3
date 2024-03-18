

function App() {
  return (
    <div className="App">
      <CustomHeader/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path='/user/:userAdr' element={<User/>} />
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
    </div>
  );
}