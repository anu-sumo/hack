import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import style from './MainSection.css';
import axios from 'axios';
import Tabs from './Tabs';
import Button from '@material-ui/core/Button';


const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

export default class MainSection extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
  }

  handleClearCompleted = () => {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted();
    }
  };

  handleShow = (filter) => {
    this.setState({ filter });
  };

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props;
    if (todos.length > 0) {
      return (
        <input
          className={style.toggleAll}
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={actions.completeAll}
        />
      );
    }
  }

  renderFooter(completedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted}
          onShow={this.handleShow}
        />
      );
    }
  }

  creationCallback = () => {
    console.log('creationCallback');
  }

  showNotification  = () =>  {
    chrome.notifications.create(id, {
      type: "basic",
      title: "Primary Title",
      message: "Primary message to display",
      iconUrl: "url_to_small_icon"
    }, creationCallback);
  }

  render() {
    
    axios({
      method: 'get',
      url: 'https://long-prod.sumologic.net/json/v2/searchquery/0832B65DEE3B9DC2/status',
      auth: {
        username: 'sumQrgDt6FGyth',
        password: 'PX2lk0cM9JlgvXED6UPvR21X9gwzsfHAgnQNLbEQX4VFWmaXcOS8kdkARy5hyZkj'
      }
    })
      .then((response) => console.log(response));


    const { todos, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce(
      (count, todo) => (todo.completed ? count + 1 : count),
      0
    );

    // {this.renderToggleAll(completedCount)}
    //     <ul className={style.todoList}>
    //       {filteredTodos.map(todo =>
    //         <TodoItem key={todo.id} todo={todo} {...actions} />
    //       )}
    //     </ul>
    //     {this.renderFooter(completedCount)}
    

    return (
      <section className={style.main}>
      <Button variant="outlined"  onClick={this.showNotification} >
        Default
      </Button>
       <Tabs/>
       
        
      </section>
    );
  }
}
