/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
    View, Text, StyleSheet,
} from 'react-native';

import Keyboard from 'react-native-keyboard';


let model = {
    
    _keys: [],

    _listeners: [],

    addKey(key) {
        this._keys.push(key);
        this._notify();
    },

    delKey() {
        console.log(123)
        this._keys.pop();
        this._notify();
    },

    clearAll() {
        this._keys = [];
        this._notify();
    },

    getKeys() {
        return this._keys;
    },

    onChange(listener) {
        if (typeof listener === 'function') {
            this._listeners.push(listener);
        }
    },

    _notify() {
        this._listeners.forEach((listner) => {
            listner(this);
        });
    }
};


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    componentDidMount() {
        model.onChange((model) => {
            this.setState({text: model.getKeys().join('')});
        });
    }

    _handleClear() {
        model.clearAll();
    }

    _handleDelete() {
        model.delKey();
    }

    _handleKeyPress(key) {
        model.addKey(key);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <Text style={styles.text}>{this.state.text}</Text>
                </View>    
                <Keyboard 
                    isRenderDot={true}
                    onClear={this._handleClear.bind(this)}
                    onDelete={this._handleDelete.bind(this)}
                    onKeyPress={this._handleKeyPress.bind(this)}
                />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    text: {marginTop: 100, textAlign: 'center'}
});


React.AppRegistry.registerComponent('Basic', () => App);

