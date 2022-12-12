import * as React from 'react';
import TodoItem from './TodoItem';
import {Card, Input, Button, Icon, List} from 'antd';
import {Scrollbars} from 'react-custom-scrollbars';

class TodoList extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      delete: false,
      todoData: [
        {done: false, text: 'Meeting with Nabindar Singh'},
        {done: false, text: 'Exercise at 6pm with Nicholas.'},
        {done: false, text: 'Avengers Age of Ultron.'},
        {done: false, text: 'Henna birthday at Mezbaan.'},
        {done: false, text: 'Meeting with John Brown at 7pm'},
      ],
    };
    this.addItem = this.addItem.bind (this);
    this.deleteItme = this.deleteItme.bind (this);
  }
  deleteItme () {
    this.setState ({delete: !this.state.delete});
    // var elems = document.querySelector(".checkedList");
    var lis = document.querySelectorAll ('.checkedList');
    var li;
    for (var i = 0; (li = lis[i]); i++) {
      li.parentNode.removeChild (li);
    }
  }
  addItem (e) {
    e.preventDefault ();
    if (e.target[0].value !== '') {
      const newTodoList = this.state.todoData;
      newTodoList.push ({
        done: false,
        text: e.target[0].value,
      });
      this.setState ({
        todoData: newTodoList,
      });
      e.target[0].value = '';
    }
    return false;
  }

  render () {
    return (
      <Card
        bordered={false}
        title={<p>Todo </p>}
        extra={
          <Icon
            type="delete"
            onClick={this.deleteItme}
            style={{fontSize: '16px', color: '#f5222d'}}
          />
        }
        style={{minHeight: '375px'}}
        bodyStyle={{padding: '0 20px'}}
      >
        <div>
          <div>
            <Scrollbars style={{height: 230}}>

              <List>
                {this.state.todoData.map ((item, i) => (
                  <TodoItem key={i} done={item.done} text={item.text} />
                ))}
              </List>
            </Scrollbars>

          </div>
          <form onSubmit={this.addItem} style={{paddingTop: '30px'}}>
            <div>
              <div>
                <div className="d-flex">
                  <Input type="text" placeholder="Add New Item" />
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{marginLeft: '15px'}}
                  >
                    Add
                  </Button>

                </div>
              </div>
            </div>
          </form>
        </div>
      </Card>
    );
  }
}
export default TodoList;
