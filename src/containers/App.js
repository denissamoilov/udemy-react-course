import React, { PureComponent } from 'react';

import classes from './App.css';
import Cockpit from '../components/Cockpit/Cockpit';
import Persons from '../components/Persons/Persons';
import withClass from '../hoc/withClass';

class App extends PureComponent {
    constructor(props) {
        super(props);
        console.log('[App.js] Inside Constructor: ', props);
        this.state = {
            persons: [
                { id: 'aakka', name: 'Max', age: 28},
                { id: 'asda', name: 'Manu', age: 29},
                { id: 'asdgqw', name: 'Stephanie', age: 26}
            ],
            showPersons: false,
            toggleClicked: 0
        }
    }

    componentWillMount() {
        console.log('[App.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[App.js] Inside componentDidMount()');
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[UPDATE App.js] Inside shouldComponentUpdate()', nextProps, nextState);
    //     return nextState.persons !== this.state.persons ||
    //         nextState.showPersons !== this.state.showPersons;
    // }

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE App.js] Inside componentWillUpdate()', nextProps, nextState);
    }

    componentDidUpdate() {
        console.log('[UPDATE App.js] Inside componentDidUpdate()');
    }

    // state = {
    //     persons: [
    //         { id: 'aakka', name: 'Max', age: 28},
    //         { id: 'asda', name: 'Manu', age: 29},
    //         { id: 'asdgqw', name: 'Stephanie', age: 26}
    //     ],
    //     showPersons: false
    // }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id  === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        };

        person.name = event.target.value;


        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({ persons: persons });
    }

    switchNameHandler = (newName) => {
        // console.log('Was clicked!');
        // DON'T DO THIS: this.state.persons[0].name = 'Maximilian'
        this.setState({
            persons: [
                { name: newName, age: 28},
                { name: 'Manu', age: 29},
                { name: 'Stephanie', age: 27}
            ]
        })
    }

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState((prevState, props) => {
            return {
                showPersons: !doesShow,
                toggleClicked: prevState.toggleClicked + 1
            }
        });
    }

    deletePersonHandler = (personIndex) => {
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    }

    render() {

        console.log('[App.js] Inside render()');

        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <Persons 
                    persons={this.state.persons} 
                    clicked={this.deletePersonHandler} 
                    changed={this.nameChangedHandler}
                />
            );
        }

        return (
            <>
                <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
                <Cockpit 
                    appTitle={this.props.title}
                    showPersons={this.state.showPersons} 
                    persons={this.state.persons}
                    clicked={this.togglePersonsHandler} />
                {persons}
            </>
        );
    }
}

export default withClass(App, classes.App);
