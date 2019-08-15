import React, { Component } from 'react'
import HeaderComponent from './headerComponent';
import { Route , Switch } from 'react-router-dom';
import Planes from './Planes';
import Principal from './Principal';
import Services from './Services';
import HomeUser from './HomeUser';
import { BrowserRouter } from 'react-router-dom';
class Main extends Component {
  render() {
    return (
      <div>
          <BrowserRouter>
          <HeaderComponent/>
            <Switch location={this.props.location}>
                <Route exact path='/' component={Principal} />
                <Route  path='/plans' component={Planes} />
                <Route  path='/principal' component={Principal}/>
                <Route  path='/services' component={Services}/> 
                <Route  path='/homeUser' component={HomeUser}/> 
            </Switch>   
            </BrowserRouter>
      </div>
    )
  }
}

export default Main;
