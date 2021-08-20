import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ChatRoom from './components/ChatRoom';
import Login from './components/Login';
import AddRoomModal from './components/Modals/AddRoomModal';
import AppProvider from './Context/AppProvider';
import AuthProvider from './Context/AuthProvider';

function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <AppProvider>
                        <Switch>
                            <Route component={Login} path="/login" />
                            <Route component={ChatRoom} path="/" />
                        </Switch>
                        <AddRoomModal />
                    </AppProvider>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
