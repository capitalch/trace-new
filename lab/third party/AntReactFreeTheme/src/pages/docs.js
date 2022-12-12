import * as React from 'react';
import Layouts from '../components/Layouts';
import {Row, Col, Card} from 'antd';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';

class Index extends React.Component {
  render () {
    return (
      <Layouts title="assets" classname="document">
        {/* <!--Stats view --> */}
        <Row gutter={16}>
          <Col xs={24} md={24}>
            <Card bordered={false} bodyStyle={{padding: '20px'}}>
              <div id="installation">
                <h3>Installation</h3>
                <div className="subject-content">
                  To use the Ani NextJs Theme, you need to make sure you have
                  {' '}
                  <code>npm</code>
                  {' '}
                  or
                  {' '}
                  <code>yarn</code>
                  {' '}
                  globally installed. Now navigate to your app directory (
                  <code>$ cd ant-theme-nextjs/</code>
                  ) and run the following terminal commands :
                  {' '}
                  <ul className="list-unstyled m-l-15">
                    <li> <code>$ npm install</code> </li>
                    <li> <code>$ npm run dev</code> </li>
                  </ul>
                  You have now succesfully set up Ant NextJs Theme!{' '}
                </div>
              </div>
            </Card>
            <Card bordered={false} bodyStyle={{padding: '20px'}}>
              <div id="basics">
                <h3>Features</h3>
                <div className="subject-content">
                  <div className="subject-content">
                    <p>
                      Ani NextJs Theme is a Server side rendering app and feature rich admin template which is clean and easy to use. Current release comes with the following features:
                      {' '}
                    </p>
                    <ul className="features-list m-l-15 ">
                      <li>
                        4 Different languages using
                        {' '}
                        <Link
                          to="https://www.npmjs.com/package/react-i18next"
                          target="_blank"
                        >
                          react-i18next package
                        </Link>
                      </li>
                      <li>
                        {' '}
                        Responsive design based on
                        {' '}
                        <Link to="https://ant.design/" target="_blank">
                          Ant Design
                        </Link>
                      </li>
                      <li>
                        Custom elements and third party plugins including:
                        <ul className="features-list-extended  m-l-30">
                          <li>
                            {' '}
                            Dynamic Charts using
                            {' '}
                            <Link
                              to="https://www.npmjs.com/package/recharts"
                              target="_blank"
                            >
                              recharts
                            </Link>
                          </li>
                          <li> Table </li>
                          <li> To-do List </li>
                          <li> Language Switcher </li>
                          <li> Profile </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Layouts>
    );
  }
}

export default Index;
