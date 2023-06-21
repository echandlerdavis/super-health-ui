import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReservationPage from '../reservation-page/ReservationPage';
import AddReservation from '../add-reservation-page/AddReservation';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import RoomTypePage from '../room-type-page/RoomTypePage';
import AddRoomType from '../add-room-type-page/AddRoomType';
/**
 * @name App
 * @returns component
 */
const App = () => (
  <div className="App">
    <div className="Container">
      <BrowserRouter>
        <Header />
        <main>
          <Switch>
            {/* <Route exact path="/" render={() => <ProductPage />} /> */}
            <Route exact path="/reservations" render={() => <ReservationPage />} />
            <Route exact path="/reservations/create" render={() => <AddReservation />} />
            <Route exact path="/room-types" render={() => <RoomTypePage />} />
            <Route exact path="/room-types/create" render={() => <AddRoomType />} />
            {/* <Route path="/maintenance" render={() => <MaintenancePage />} />
              <Route exact path="/profilepage" '
              render={() => <ProfilePage user={user} setUser={setUser} />} />
              <Route exact path="/filter" render={() => <FilterComponentExample />} /> */}
          </Switch>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  </div>
);
export default App;
