import * as React from 'react';
import {Table, Switch, Radio, Form, Divider, Tag} from 'antd';
const FormItem = Form.Item;
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map (tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase ()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">Invite </a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const expandedRowRender = record => <p>{record.description}</p>;
const title = () => 'Here is title';
const showHeader = true;
const footer = () => 'Here is footer';
const scroll = {y: 240};
const pagination = {position: 'bottom'};
class TableSelect extends React.Component {
  state = {
    bordered: false,
    loading: false,
    pagination,
    size: 'small',
    expandedRowRender,
    title: undefined,
    showHeader,
    rowSelection: {},
    scroll: undefined,
    hasData: true,
  };

  handleToggle = prop => enable => {
    this.setState ({[prop]: enable});
  };

  handleSizeChange = e => {
    this.setState ({size: e.target.value});
  };

  handleExpandChange = enable => {
    this.setState ({expandedRowRender: enable ? expandedRowRender : undefined});
  };

  handleTitleChange = enable => {
    this.setState ({title: enable ? title : undefined});
  };

  handleHeaderChange = enable => {
    this.setState ({showHeader: enable ? showHeader : false});
  };

  handleFooterChange = enable => {
    this.setState ({footer: enable ? footer : undefined});
  };

  handleRowSelectionChange = enable => {
    this.setState ({rowSelection: enable ? {} : undefined});
  };

  handleScollChange = enable => {
    this.setState ({scroll: enable ? scroll : undefined});
  };

  handleDataChange = hasData => {
    this.setState ({hasData});
  };

  handlePaginationChange = e => {
    const {value} = e.target;
    this.setState ({
      pagination: value === 'none' ? false : {position: value},
    });
  };

  render () {
    const state = this.state;

    return (
      <div>
        <div className="m-b-15">
          <Form layout="inline">
            <FormItem label="Bordered">
              <Switch
                checked={state.bordered}
                onChange={this.handleToggle ('bordered')}
                size="small"
              />
            </FormItem>
            <FormItem label="loading">
              <Switch
                checked={state.loading}
                onChange={this.handleToggle ('loading')}
                size="small"
              />
            </FormItem>
            <FormItem label="Title">
              <Switch
                checked={!!state.title}
                onChange={this.handleTitleChange}
                size="small"
              />
            </FormItem>
            <FormItem label="Column Header">
              <Switch
                checked={!!state.showHeader}
                onChange={this.handleHeaderChange}
                size="small"
              />
            </FormItem>
            <FormItem label="Footer">
              <Switch
                checked={!!state.footer}
                onChange={this.handleFooterChange}
                size="small"
              />
            </FormItem>
            <FormItem label="Expandable">
              <Switch
                checked={!!state.expandedRowRender}
                onChange={this.handleExpandChange}
                size="small"
              />
            </FormItem>
            <FormItem label="Checkbox">
              <Switch
                checked={!!state.rowSelection}
                onChange={this.handleRowSelectionChange}
                size="small"
              />
            </FormItem>
            <FormItem label="Fixed Header">
              <Switch
                checked={!!state.scroll}
                onChange={this.handleScollChange}
                size="small"
              />
            </FormItem>
            <FormItem label="Has Data">
              <Switch
                checked={!!state.hasData}
                onChange={this.handleDataChange}
                size="small"
              />
            </FormItem>
            <FormItem label="Size">
              <Radio.Group
                size="default"
                value={state.size}
                onChange={this.handleSizeChange}
                size="small"
              >
                <Radio.Button value="default" size="small">
                  Default
                </Radio.Button>
                <Radio.Button value="middle" size="small">Middle</Radio.Button>
                <Radio.Button value="small" size="small">Small</Radio.Button>
              </Radio.Group>
            </FormItem>
            <FormItem label="Pagination" className="custom-float">
              <Radio.Group
                value={state.pagination ? state.pagination.position : 'none'}
                onChange={this.handlePaginationChange}
                size="small"
              >
                <Radio.Button value="top" size="small">Top</Radio.Button>
                <Radio.Button value="bottom" size="small">Bottom</Radio.Button>
                <Radio.Button value="both" size="small">Both</Radio.Button>
                <Radio.Button value="none" size="small">None</Radio.Button>
              </Radio.Group>
            </FormItem>
          </Form>
        </div>
        <div className="custom-table">
          <Table
            {...this.state}
            columns={columns}
            dataSource={state.hasData ? data : null}
            scroll={{x: 768}}
          />
        </div>
      </div>
    );
  }
}
export default TableSelect;
