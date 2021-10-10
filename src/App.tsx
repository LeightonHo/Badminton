import './App.css';
import Main from './components/Main';
import { HashRouter } from 'react-router-dom';
import { useState } from 'react';
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import axios from "axios";
import { Card, CardContent, Divider, Typography } from '@material-ui/core';

export interface IUser {
  userId?: string,
  name?: string,
  email?: string,
  avatar?: string,
  facebookUserId?: number
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({});

  const responseFacebook = (response: ReactFacebookLoginInfo) => {
    console.log(response);

    if (response.accessToken) {
        
      // Check or create login.
      const payload = {
        facebookUserId: response.userID,
        name: response.name,
        email: response.email,
        avatar: response.picture?.data.url,
      };

      axios.post<any>("https://n4x7vjzngg.execute-api.ap-southeast-2.amazonaws.com/production", payload).then(
        ({ data }) => {
          const userData = JSON.parse(data.body);

          if (data.statusCode === 200) {
            setIsLoggedIn(true);
            setUser({
              userId: userData.UserId,
              email: userData.Email,
              name: userData.Name,
              avatar: userData.Avatar,
              facebookUserId: userData.FacebookUserId
            });
          } else {
            setIsLoggedIn(false);
          }
        }
      );
    }
  }

  return (
    <>
      {
        isLoggedIn
        ? <>
          <HashRouter>
            <Main user={user} />
          </HashRouter>
        </>
        : <>
          <Card className="card login">
            <CardContent>
              <Typography
                variant="h3"
              >
                Sunday Badminton
              </Typography>

              <Typography
                variant="overline"
              >
                Log in to create a round robin for your badminton next session.
              </Typography>

              <Divider />
                
              <FacebookLogin 
                appId="190285126563993"
                autoLoad={true}
                fields="name,email,picture"
                scope="public_profile"
                callback={responseFacebook}
                icon="fa-facebook"
              />
            </CardContent>
          </Card>
        </>
      }
    </>
  );
}

export default App;