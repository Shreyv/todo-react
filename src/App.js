import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, Form, Card, Button, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const options = [
  { key: 'red', text: 'Red', value: 'red' },
  { key: 'green', text: 'Green', value: 'green' },
  { key: 'yellow', text: 'Yellow', value: 'yellow' },
  { key: 'orange', text: 'Orange', value: 'orange' },
  { key: 'violet', text: 'Violet', value: 'violet' }

]
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
      todos: [],
      text: '',
      color: null,
      editFlag: false,
      utext: null,
      ucolor: null,
      uid: null

    }

    this.onSubmitHandle = this.onSubmitHandle.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onSubmitHandleUpdate = this.onSubmitHandleUpdate.bind(this);
    this.onChangeTextUpdate = this.onChangeTextUpdate.bind(this);
    this.onChangeColorUpdate = this.onChangeColorUpdate.bind(this);
  }

  onSubmitHandle(event) {
    if (!this.state.text || !this.state.color) {
      return;
    }
    event.preventDefault();
    var todo = {
      text: this.state.text,
      color: this.state.color,
      id: this.state.counter
    }

    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        todo
      ],
      counter: prevState.counter + 1,
      text: '',
      color: null
    }));
  }

  onChangeText(event) {
    this.setState({ text: event.target.value })
  }

  onChangeColor(event, data) {
    this.setState({ color: data.value })
  }

  onChangeTextUpdate(event) {
    this.setState({ utext: event.target.value })
  }

  onChangeColorUpdate(event, data) {
    this.setState({ ucolor: data.value })
  }

  edit(todo) {
    this.setState(prevState => ({
      editFlag: !prevState.editFlag,
      uid: todo.id,
      ucolor: todo.color,
      utext: todo.text
    }));

  }

  delete(todo) {
    this.setState({
      todos: this.state.todos.filter(function (t) {
        return t.id !== todo.id
      })
    });
  }


  onSubmitHandleUpdate(event) {
    event.preventDefault();
    var index = this.state.todos.findIndex(x => x.id === this.state.uid);
    var itemAttributes = {
      id: this.state.uid,
      text: this.state.utext,
      color: this.state.ucolor
    }
    this.setState({
      todos: [
        ...this.state.todos.slice(0, index),
        Object.assign({}, this.state.todos[index], itemAttributes),
        ...this.state.todos.slice(index + 1)
      ],
      editFlag: false,
    });


  }



  render() {
    return (
      <div>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column></Grid.Column>
            <Grid.Column width={8}>
              <Form onSubmit={this.onSubmitHandle}>
                <Form.Field>
                  <label>Note text</label>
                  <input onChange={this.onChangeText} placeholder="Enter your note text" value={this.state.text} />
                </Form.Field>
                <Form.Field>
                  <Form.Select fluid value={this.state.color} label='Note Color' options={options} onChange={this.onChangeColor} />
                </Form.Field>
                <Form.Button primary >Add Note</Form.Button>
              </Form>
            </Grid.Column>

          </Grid.Row>
        </Grid>


        <Card.Group centered itemsPerRow={3}>
          {this.state.todos.map((todo, index) => {
            return (
              <Card className="card-custom" style={{
                borderLeft: '10px solid ' + todo.color,
              }}>
                <Card.Content>
                  <Button onClick={() => this.delete(todo)} className="float-right" icon='delete' />
                  <Button onClick={() => this.edit(todo)} className="float-right" icon='edit' />
                  <Card.Header style={{ color: todo.color }}>Note {index + 1}</Card.Header>
                  <Card.Description>
                    {todo.text}
                  </Card.Description>
                </Card.Content>
              </Card>

            );

          })}

        </Card.Group>
        <Modal open={this.state.editFlag} onClose={e => this.setState({ editFlag: false })}
        >
          <Modal.Header>Update Todo</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Form onSubmit={this.onSubmitHandleUpdate}>
                <Form.Field>
                  <label>Note text</label>
                  <input onChange={this.onChangeTextUpdate} placeholder="Enter your note text" value={this.state.utext} />
                </Form.Field>
                <Form.Field>
                  <Form.Select fluid value={this.state.ucolor} label='Note Color' options={options} onChange={this.onChangeColorUpdate} />
                </Form.Field>
                <Form.Button primary >Update Todo</Form.Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>

      </div>
    );
  }
}

export default App;
