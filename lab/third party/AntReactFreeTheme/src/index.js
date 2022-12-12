import React from 'react';
import ReactDOM from 'react-dom';
import '../src/styles/global.scss';
import {Card, Row, Col} from 'antd';

import './index.scss';
import App from './App';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Grid from './pages/layout/grid';
import GridLayout from './pages/layout/gridLayout';
import FormElements from './pages/form/form-elements';
import FormControls from './pages/form/form-controls';
import FormComponents from './pages/form/form-components';
import Affix from './pages/navigation/affix';
import Dropdown from './pages/navigation/dropdown';
import Menu from './pages/navigation/menu';
import Pagination from './pages/navigation/pagination';
import PageHeader from './pages/navigation/pageheader';
import Steps from './pages/navigation/steps';
import Buttons from './pages/components/buttons';
import Typography from './pages/components/typography';
import BasicCalendar from './pages/calendar/basic-calendar';
import NoticeCalendar from './pages/calendar/notice-calendar';
import SelectableCalendar from './pages/calendar/selectable-calendar';
import List from './pages/data-display/list';
import Tooltip from './pages/data-display/tooltip-popover';
import Carousel from './pages/data-display/carousel';
import Charts from './pages/charts';
import Profile from './pages/profile';
import Table from './pages/table';
import LanguageSwitcher from './pages/language-switcher';
import Docs from './pages/docs';

import {Route, Link, Redirect,Switch, BrowserRouter as Router} from 'react-router-dom';

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.unregister();
const NoMatchPage = () => {
  return (
    <Row style={{marginTop: '20%'}}>
      <Col xs={{span: 12, offset: 6}}>

        <Card>
          <div className="card-body">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h2>Page not found</h2>
              <Link to="/dashboard">back to dashboard</Link>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

const routing = (
  <Router>
    <Switch>

      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/layout/grid" component={Grid} />
      <Route exact path="/layout/gridLayout" component={GridLayout} />
      <Route exact path="/form/form-elements" component={FormElements} />
      <Route exact path="/form/form-controls" component={FormControls} />
      <Route exact path="/form/form-components" component={FormComponents} />
      <Route exact path="/navigation/affix" component={Affix} />
      <Route exact path="/navigation/dropdown" component={Dropdown} />
      <Route exact path="/navigation/menu" component={Menu} />
      <Route exact path="/navigation/pagination" component={Pagination} />
      <Route exact path="/navigation/pageheader" component={PageHeader} />
      <Route exact path="/navigation/steps" component={Steps} />
      <Route exact path="/components/buttons" component={Buttons} />
      <Route exact path="/components/typography" component={Typography} />
      <Route exact path="/calendar/basic-calendar" component={BasicCalendar} />
      <Route
        exact
        path="/calendar/notice-calendar"
        component={NoticeCalendar}
      />
      <Route
        exact
        path="/calendar/selectable-calendar"
        component={SelectableCalendar}
      />
      <Route exact path="/data-display/list" component={List} />
      <Route exact path="/data-display/tooltip-popover" component={Tooltip} />
      <Route exact path="/data-display/carousel" component={Carousel} />
      <Route exact path="/charts" component={Charts} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/table" component={Table} />
      <Route exact path="/language-switcher" component={LanguageSwitcher} />
      <Route exact path="/docs" component={Docs} />
      <Route path="*" component={NoMatchPage} />
  </Switch>
  </Router>
);
ReactDOM.render (routing, document.getElementById ('root'));
